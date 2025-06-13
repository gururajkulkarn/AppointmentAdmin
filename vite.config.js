
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    port: 5174,
    strictPort: true  // <-- This tells Vite NOT to try other ports and fail if 5173 is busy
  }
  
})
