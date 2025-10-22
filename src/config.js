// Use Vite's import.meta.env for client-side environment variables.
// Vite exposes variables prefixed with VITE_ to the browser. This file provides
// a single export for the app to consume and falls back to localhost.
// Prefer Vite variable VITE_BACKEND_URL, then VITE_API_URL for compatibility, then fallback.
// When running Vite in development the dev server usually proxies `/api` to the backend.
// Use '/api' as the default base in development so client code can call the proxied path
// (avoids CORS during local dev). In production prefer an explicit VITE_BACKEND_URL or fallback to the localhost URL.
export const API_BASE = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : 'http://localhost:3000');