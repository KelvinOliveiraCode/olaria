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
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'codemirror': ['codemirror', '@codemirror/commands', '@codemirror/lang-css', '@codemirror/lang-html', '@codemirror/lang-javascript', '@codemirror/language', '@codemirror/search', '@codemirror/state', '@codemirror/view', '@lezer/highlight'],
          'tauri': ['@tauri-apps/api', '@tauri-apps/plugin-dialog', '@tauri-apps/plugin-opener'],
        },
      },
    },
  },
})
