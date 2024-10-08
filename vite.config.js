// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'index.html'  // Make sure the file path is correct
    }
  }
})
