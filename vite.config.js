import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
          'ui': ['lucide-react', 'tailwindcss'],
          'datepicker': ['react-datepicker']
        }
      },
      external: []
    },
    sourcemap: true,
    // Asegurar que los módulos de node no causen problemas
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [
        /node_modules\/react-datepicker/,
        /node_modules\/@popperjs/
      ]
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react-datepicker']
  },
  server: {
    port: 3000,
    host: true
  },
  // Configuración específica para producción
  define: {
    'import.meta.env.MODE': JSON.stringify(mode),
    'import.meta.env.VITE_NODE_ENV': JSON.stringify(mode)
  }
}));
