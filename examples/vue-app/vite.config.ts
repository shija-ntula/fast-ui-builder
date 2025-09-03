import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'fast-ui-builder/vue': path.resolve(__dirname, '../../src/views/vue/index.ts'),
      'fast-ui-builder': path.resolve(__dirname, '../../src/index.ts')
    }
  },
  esbuild: {
    target: 'esnext',  // make sure output supports decorators
  },
  server: {
    port: 5000 // change this to your desired port
  }
})
