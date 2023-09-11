import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9050,
  },
  build: {
    chunkSizeWarningLimit: 1000, // Set your desired limit in kBs
  },
  plugins: [react()],
})