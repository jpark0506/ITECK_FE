import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    proxy: {
      "^/api/.*": { // 정규식을 사용하여 정확히 "/api" 경로에 대해서만 프록시 적용
        target: "http://34.64.87.212:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
