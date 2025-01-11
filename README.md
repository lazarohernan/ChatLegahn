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
- Supabase
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

## ✨ Características

- 🔐 Autenticación y autorización con Supabase
- 🌓 Tema claro/oscuro
- 📱 Diseño responsive
- 🔍 Búsqueda avanzada
- 📊 Dashboard analítico
- 🔔 Sistema de notificaciones
- 📝 Editor de documentos
- 🔄 Sincronización en tiempo real
- 📈 Monitoreo y métricas
- 🎯 Tour guiado para nuevos usuarios

## 🚧 Mejoras Pendientes

### Optimizaciones
- Implementar React.memo en componentes de renderizado frecuente
- Optimizar re-renders en NotificationsDrawer
- Mejorar la carga diferida de componentes admin
- Reducir el tamaño del bundle principal
- Implementar cache de consultas frecuentes

### Seguridad
- Implementar rate limiting en endpoints sensibles
- Agregar validación de tipos con TypeScript
- Mejorar el manejo de tokens expirados
- Implementar refresh token silencioso
- Fortalecer validaciones en formularios

### UX/UI
- Corregir parpadeo en tema oscuro al cargar
- Mejorar accesibilidad en modales
- Ajustar contraste en tema oscuro
- Optimizar responsive design en tablets
- Agregar indicadores de carga más granulares

### Testing
- Aumentar cobertura de pruebas unitarias
- Implementar pruebas e2e con Cypress
- Agregar pruebas de integración para AuthContext
- Mejorar mocks en pruebas de servicios
- Implementar pruebas de rendimiento

## ⚠️ Problemas Conocidos

### Gestión de Estado
- Pérdida ocasional de estado en navegación profunda
- Inconsistencias en cache de notificaciones
- Problemas con estado global en logout

### Rendimiento
- Carga lenta de dashboard en datos grandes
- Memory leaks en componentes de monitoreo
- Re-renders innecesarios en sidebar

### UI/UX
- Flash of unstyled content en carga inicial
- Problemas de scroll en modales móviles
- Inconsistencias en animaciones de transición

### Seguridad
- Manejo subóptimo de sesiones concurrentes
- Validaciones incompletas en inputs
- Exposición de información en logs

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles
