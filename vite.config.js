import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Raise warning threshold since Three.js is legitimately large
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Three.js and R3F into their own chunk so other pages
          // don't pay the cost up-front
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'framer':       ['framer-motion'],
          'router':       ['react-router-dom'],
        },
      },
    },
  },
})
