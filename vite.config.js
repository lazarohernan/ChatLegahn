import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3000,
    host: true,
    headers: {
      'Access-Control-Allow-Credentials': 'true',
    }
  },
  preview: {
    port: 3000
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: './index.html',
      },
      external: [
        '@heroicons/react/24/outline',
        '@heroicons/react/24/solid'
      ],
      output: {
        manualChunks: (id) => {
          // Crear chunks para las dependencias principales
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('@heroicons') || id.includes('@headlessui')) {
              return 'ui-vendor';
            }
            if (id.includes('recharts') || id.includes('d3')) {
              return 'chart-vendor';
            }
            return 'vendor';
          }
        },
        // Asegurar que los chunks tengan nombres consistentes
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.jsx']
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@heroicons/react/24/outline': '@heroicons/react/24/outline/index.js',
      '@heroicons/react/24/solid': '@heroicons/react/24/solid/index.js'
    },
    dedupe: ['react', 'react-dom', 'react-router-dom']
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@heroicons/react/24/outline',
      '@heroicons/react/24/solid',
      '@headlessui/react',
      'recharts',
      '@supabase/supabase-js'
    ],
    exclude: []
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
    target: 'es2020'
  }
});
