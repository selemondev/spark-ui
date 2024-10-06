import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    exclude: [
      'vitepress',
    ],
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    UnoCSS(),
  ],
  resolve: {
    alias: {
      find: '@',
      replacement: fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
