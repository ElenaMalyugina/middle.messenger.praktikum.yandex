// vite.config.js or vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/middle.messenger.praktikum.yandex/' : '/',
  publicDir: 'static',
  server: {
    port: 3000,
  },
  preview: {
    port: 3000
  },
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    outDir: 'dist',
    assetsDir: '',
    rollupOptions: {
      output: {
        assetFileNames: '[name][extname]'
      }
    }
  }

});
