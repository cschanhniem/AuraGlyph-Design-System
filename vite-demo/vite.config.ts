import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/AuraGlyph-Design-System/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@auraglyph': path.resolve(__dirname, '../react-components'),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
    ],
    esbuildOptions: {
      // Enable JSX in TS files
      jsx: 'automatic',
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // Ensure we can resolve and transpile the AuraGlyph components
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
})
