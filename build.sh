#!/bin/bash

echo "🚀 Iniciando proceso de construcción..."

# Limpiar directorios
echo "🧹 Limpiando directorios..."
rm -rf dist .vite node_modules package-lock.json

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Verificar instalación de Vite
echo "✨ Verificando Vite..."
if ! command -v vite &> /dev/null; then
    echo "🔧 Instalando Vite globalmente..."
    npm install -g vite
fi

# Construir el proyecto
echo "🏗️ Construyendo el proyecto..."
npm run build

# Verificar resultado
if [ $? -eq 0 ]; then
    echo "✅ Construcción completada exitosamente!"
    echo "📁 Los archivos se encuentran en el directorio 'dist'"
else
    echo "❌ Error durante la construcción"
    exit 1
fi
