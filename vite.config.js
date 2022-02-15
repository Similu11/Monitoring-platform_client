import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
try {
  const file = dotenv.parse(fs.readFileSync(`.env.${process.env.NODE_ENV}`))
  // // 根据获取的key给对应的环境变量赋值
  for (const key in file) {
    process.env[key] = file[key]
  }
  //console.log(process.env['VITE_API_DOMAIN']);
} catch (error) {
  console.error(e)
}

export default defineConfig({
  outDir:'./dist',
  assetsDir:'./assets/',
  assetsInlineLimit:4096,
  chunkSizeWarningLimit:200,
  plugins: [vue()],
  server: {
    host: "127.0.0.1",
    port: 8080,
    strictPort: true,
    proxy: {
      '/api': {
        target: process.env['VITE_API_DOMAIN'],
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
  },
  preview: {
    port: 8732,
    '/api': {
      target: process.env['VITE_API_DOMAIN'],
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    // sourcemap: true
  }
})
