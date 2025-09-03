import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      // generate types into dist/types (plugin picks tsconfig)
      outDir: path.resolve(__dirname, 'dist/types/views/vue'),
      insertTypesEntry: true
    })
  ],
  build: {
    outDir: 'dist/vue',              // final dir
    lib: {
      entry: path.resolve(__dirname, 'src/views/vue/index.ts'),
      name: 'FastUIBuilderVue',
      fileName: 'index',              // results in dist/vue/index.js
      formats: ['es']  // use ESM
    },
    rollupOptions: {
      external: ['vue']
    }
  }
})
