import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const cssFileName = 'index.min.css'


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true
  },
  preview: {
    port: 80,
  },
  plugins: [react()],
  publicDir: './public',
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (file) => {
          return `assets/${cssFileName}`
        },
        entryFileNames: (file) => {
          return `assets/[name].min.js`
        }
      }
    }
  }

})