import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   port: 80,   // change to any port number
    open: true,   // open the browser automatically
    host: '0.0.0.0',  // allow external access for development
  
})
