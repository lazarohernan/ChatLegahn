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
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react-datepicker')) {
              return 'datepicker';
            }
            if (id.includes('react')) {
              return 'vendor';
            }
            if (id.includes('@supabase')) {
              return 'auth';
            }
            if (id.includes('lucide-react') || id.includes('tailwindcss')) {
              return 'ui';
            }
          }
        }
      }
    },
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [
        /node_modules\/react-datepicker/,
        /node_modules\/@popperjs/,
        /node_modules\/classnames/
      ]
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "react-datepicker/dist/react-datepicker.css";`
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@services': resolve(__dirname, './src/services'),
      '@utils': resolve(__dirname, './src/utils'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@context': resolve(__dirname, './src/context'),
      '@assets': resolve(__dirname, './src/assets'),
      '@config': resolve(__dirname, './src/config')
    }
  },
  optimizeDeps: {
    include: [
      'react-datepicker',
      '@popperjs/core',
      'classnames'
    ],
    exclude: []
  },
  server: {
    port: 3000,
    host: true
  },
  define: {
    'import.meta.env.MODE': JSON.stringify(mode),
    'import.meta.env.VITE_NODE_ENV': JSON.stringify(mode)
  }
}));
