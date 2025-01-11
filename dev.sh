#!/bin/bash

echo "🚀 Iniciando entorno de desarrollo..."

# Verificar node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Verificar variables de entorno
if [ ! -f ".env.development" ]; then
    echo "⚙️ Configurando variables de entorno..."
    cp .env.example .env.development
fi

# Iniciar servidor de desarrollo
echo "🌐 Iniciando servidor con configuración de desarrollo..."
NODE_ENV=development npx vite --config vite.config.dev.js

# Manejar errores
if [ $? -ne 0 ]; then
    echo "❌ Error al iniciar el servidor de desarrollo"
    echo "🔍 Verificando problemas comunes..."
    
    # Verificar puerto en uso
    if lsof -i :3000; then
        echo "⚠️ El puerto 3000 está en uso. Intenta:"
        echo "kill \$(lsof -t -i:3000)"
    fi
    
    # Verificar versión de Node
    echo "📊 Versión de Node: $(node -v)"
    echo "📊 Versión de NPM: $(npm -v)"
    
    exit 1
fi
