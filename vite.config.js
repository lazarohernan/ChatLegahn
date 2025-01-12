import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const findAvailablePort = (startPort) => {
  return startPort;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@context': resolve(__dirname, './src/context'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@pages': resolve(__dirname, './src/pages'),
      '@services': resolve(__dirname, './src/services'),
      '@utils': resolve(__dirname, './src/utils'),
      '@assets': resolve(__dirname, './src/assets'),
      '@config': resolve(__dirname, './src/config')
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js'],
    force: true
  },
  server: {
    port: findAvailablePort(3008),
    strictPort: false,
    host: true,
    open: true
  },
  preview: {
    port: findAvailablePort(3008),
    strictPort: false,
    host: true
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  }
});
