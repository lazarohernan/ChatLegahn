#!/bin/bash

echo "🔍 Iniciando diagnóstico del proyecto..."

# Verificar Node y NPM
echo "📊 Versiones:"
echo "Node: $(node -v)"
echo "NPM: $(npm -v)"

# Verificar dependencias
echo -e "\n📦 Verificando dependencias..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules existe"
    npm ls --depth=0
else
    echo "❌ node_modules no encontrado"
fi

# Verificar archivos críticos
echo -e "\n📄 Verificando archivos críticos..."
critical_files=("package.json" "vite.config.js" "index.html" "src/main.jsx" "src/App.jsx")
for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file existe"
    else
        echo "❌ $file no encontrado"
    fi
done

# Verificar configuración
echo -e "\n⚙️ Verificando configuración..."
if [ -f ".env.development" ]; then
    echo "✅ .env.development existe"
else
    echo "❌ .env.development no encontrado"
fi

# Verificar puertos
echo -e "\n🌐 Verificando puertos..."
if lsof -i :3000 >/dev/null; then
    echo "⚠️ Puerto 3000 en uso"
    lsof -i :3000
else
    echo "✅ Puerto 3000 disponible"
fi

# Verificar permisos
echo -e "\n🔒 Verificando permisos..."
if [ -x "node_modules/.bin/vite" ]; then
    echo "✅ Vite es ejecutable"
else
    echo "⚠️ Vite no es ejecutable o no está instalado"
fi

# Sugerencias
echo -e "\n💡 Sugerencias:"
echo "1. Si hay problemas con las dependencias: rm -rf node_modules package-lock.json && npm install"
echo "2. Si hay problemas con Vite: npm install -g vite"
echo "3. Si hay problemas con los puertos: kill \$(lsof -t -i:3000)"
echo "4. Si hay problemas con los permisos: chmod +x node_modules/.bin/vite"
