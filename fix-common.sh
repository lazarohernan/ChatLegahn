#!/bin/bash

echo "🔧 Iniciando reparación de problemas comunes..."

# Verificar Node y NPM
echo "📊 Verificando versiones..."
node_version=$(node -v)
npm_version=$(npm -v)
echo "Node: $node_version"
echo "NPM: $npm_version"

# Limpiar caché
echo "🧹 Limpiando caché..."
npm cache clean --force
rm -rf .vite

# Reinstalar Vite
echo "📦 Reinstalando Vite..."
npm uninstall vite
npm install -D vite@latest

# Verificar package.json
echo "📝 Verificando package.json..."
if ! jq . package.json >/dev/null 2>&1; then
    echo "⚠️ package.json podría estar malformado"
else
    echo "✅ package.json está bien formado"
fi

# Verificar tipos MIME
echo "🔍 Verificando configuración MIME..."
if ! grep -q "application/javascript" vite.config.js; then
    echo "⚙️ Actualizando configuración MIME en vite.config.js..."
    cat > vite.config.js << EOL
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Content-Type': 'application/javascript'
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
});
EOL
fi

# Verificar dependencias
echo "📦 Verificando dependencias..."
npm install

echo "✨ Reparación completada"
echo "💡 Sugerencias:"
echo "1. Ejecuta 'npm run dev' para verificar el entorno de desarrollo"
echo "2. Ejecuta 'npm run build' para verificar la construcción"
echo "3. Si persisten los problemas, ejecuta './clean.sh' y vuelve a intentar"
