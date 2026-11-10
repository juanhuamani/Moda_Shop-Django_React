import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// Prefijos del backend Django. `changeOrigin: false` mantiene el `Host` del
// navegador (localhost:5173) para que el guard de Origin del backend acepte las
// peticiones inseguras en desarrollo.
const backendProxy = {
  target: 'http://127.0.0.1:8000',
  changeOrigin: false,
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': backendProxy,
      '/auth': backendProxy,
      '/media': backendProxy,
      '/static': backendProxy,
      '/admin': backendProxy,
    },
  },
})
