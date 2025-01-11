#!/bin/bash

echo "🧹 Iniciando limpieza del proyecto..."

# Detener procesos
echo "🛑 Deteniendo procesos en puerto 3000..."
if command -v lsof >/dev/null; then
    kill $(lsof -t -i:3000) 2>/dev/null || true
fi

# Limpiar directorios de build
echo "🗑️ Eliminando directorios de build..."
rm -rf dist .vite

# Limpiar dependencias
echo "📦 Eliminando dependencias..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock
rm -f pnpm-lock.yaml

# Limpiar caché
echo "🧼 Limpiando caché..."
npm cache clean --force
rm -rf .eslintcache

# Limpiar archivos temporales
echo "🗑️ Eliminando archivos temporales..."
find . -type f -name '*.log' -delete
find . -type f -name '.DS_Store' -delete
find . -type d -name '.Trash' -exec rm -rf {} +

# Restaurar configuración limpia
echo "⚙️ Restaurando configuración..."
if [ -f ".env.example" ] && [ ! -f ".env.development" ]; then
    cp .env.example .env.development
    echo "✅ .env.development restaurado desde ejemplo"
fi

echo "✨ Limpieza completada"
echo "💡 Para reinstalar el proyecto:"
echo "1. npm install"
echo "2. npm run dev"
