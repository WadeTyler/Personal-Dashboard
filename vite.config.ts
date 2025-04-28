import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api/forecast': {
        target: 'https://api.open-meteo.com/v1/forecast',
        changeOrigin: true,
        rewrite: (path) => path.replace("/api/forecast", '')
      }
    }
  }
})