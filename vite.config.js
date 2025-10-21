// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // allow localtunnel subdomains and the usual localhost hosts
    allowedHosts: ['.loca.lt', 'localhost', '127.0.0.1'],
    cors: false,
    proxy: {
      // proxy any /api requests to backend running on port 3000
      // ensure cookies and CORS work by rewriting origin when needed
      '/api': {
        target: 'http://localhost:3000', // Backend URL
        changeOrigin: true,
        secure: false,
        ws: true,
        // some backends expect host header to be unchanged; leave as is by default
        configure: (proxy, options) => {
          // no-op but kept for future customization
        }
      },
    },
  },
})
