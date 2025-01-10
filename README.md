# LegalAI Chat

Aplicación de chat legal con IA, construida con React, Vite y Tailwind CSS.

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js (v18 o superior)
- npm (v9 o superior)

### Instalación

1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd lawyer-ai-chat
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
```bash
cp .env.example .env.local
```
Editar `.env.local` con tus valores

4. Iniciar servidor de desarrollo
```bash
npm run dev
```

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Vista previa de build
- `npm run lint` - Ejecuta ESLint
- `npm test` - Ejecuta tests
- `npm run test:watch` - Tests en modo watch
- `npm run test:coverage` - Reporte de cobertura
- `npm run test:ci` - Tests para CI

## 📚 Stack Tecnológico

- React 18
- Vite 6
- Tailwind CSS
- React Router 6
- Axios
- Vitest
- Testing Library
- Heroicons
- Recharts

## 🏗️ Estructura del Proyecto

```
src/
├── assets/         # Recursos estáticos
├── components/     # Componentes React
├── config/         # Configuraciones
├── context/        # Contextos React
├── hooks/          # Custom hooks
├── layouts/        # Layouts de página
├── pages/          # Componentes de página
├── services/       # Servicios y API
├── tests/          # Tests
└── utils/          # Utilidades
```

## 🔒 Variables de Entorno

Requeridas para desarrollo:

```env
VITE_APP_NAME=LegalAI Chat
VITE_APP_URL=http://localhost:3000
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 🧪 Testing

Tests unitarios y de integración con Vitest y Testing Library:

```bash
# Ejecutar todos los tests
npm test

# Modo watch
npm run test:watch

# Cobertura
npm run test:coverage
```

## 📦 Despliegue

El proyecto está configurado para despliegue automático en Vercel:

1. Conecta tu repositorio en Vercel
2. Configura las variables de entorno
3. El despliegue se realizará automáticamente con cada push a main

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles

## ✨ Características

- 🔐 Autenticación y autorización
- 🌓 Tema claro/oscuro
- 📱 Diseño responsive
- 🔍 Búsqueda avanzada
- 📊 Dashboard analítico
- 🔔 Sistema de notificaciones
- 📝 Editor de documentos
- 🔄 Sincronización en tiempo real
- 📈 Monitoreo y métricas
- 🎯 Tour guiado para nuevos usuarios
