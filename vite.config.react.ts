import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: path.resolve(__dirname, 'dist/types/views/react'),
      insertTypesEntry: true
    })
  ],
  build: {
    outDir: 'dist/react',
    lib: {
      entry: path.resolve(__dirname, 'src/views/react/index.tsx'),
      name: 'FastUIBuilderReact',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        entryFileNames: 'index.js'
      }
    }
  }
})
