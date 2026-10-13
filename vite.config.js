import { defineConfig } from 'vite'

export default defineConfig({
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
    emptyOutDir: true,
  },
})
