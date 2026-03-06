// vite.config.js or vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
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
