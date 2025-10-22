import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const STORAGE_KEY = 'site_theme_v1';
  // Default to light theme for new installs as requested
  const [theme, setTheme] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw === 'light' ? 'light' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
    const el = document.documentElement || document.body;
    if (!el) return;
    if (theme === 'light') {
      el.classList.add('theme-light');
      el.classList.remove('theme-dark');
    } else {
      el.classList.remove('theme-light');
      el.classList.add('theme-dark');
    }
  }, [theme]);

  const toggleTheme = (next) => {
    setTheme((prev) => {
      if (next === 'light' || next === 'dark') return next;
      return prev === 'dark' ? 'light' : 'dark';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
