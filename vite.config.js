import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy API calls to the deployed backend so cookies/session auth works in dev.
      '/api': {
        target: 'https://houserent-eqqo.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      // Proxy uploads (images) from backend
      '/uploads': {
        target: 'https://houserent-eqqo.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
