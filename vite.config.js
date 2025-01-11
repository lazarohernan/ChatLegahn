import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'auth': ['@supabase/supabase-js'],
          'ui': ['lucide-react', 'tailwindcss']
        }
      }
    },
    sourcemap: true,
    // Asegurar que los módulos de node no causen problemas
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true
  },
  // Configuración específica para producción
  define: {
    'process.env.NODE_ENV': JSON.stringify(import.meta.env.NODE_ENV || 'production'),
    'process.env.VITE_NODE_ENV': JSON.stringify(import.meta.env.VITE_NODE_ENV || 'production')
  }
});
