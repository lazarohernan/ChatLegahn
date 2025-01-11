import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración específica para desarrollo
export default defineConfig({
  plugins: [react()],
  mode: 'development',
  server: {
    port: 3000,
    host: true,
    headers: {
      'Access-Control-Allow-Credentials': 'true',
    }
  },
  build: {
    sourcemap: true,
    minify: false,
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js'
    ]
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
    target: 'es2020',
    logLevel: 'info',
    logLimit: 0
  }
});
