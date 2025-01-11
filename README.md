# LegalAI Chat 🤖⚖️

Sistema de chat inteligente especializado en consultas legales, construido con React y potenciado por IA.

## 🚀 Características Principales

- 💬 Chat legal inteligente con respuestas instantáneas
- 📄 Generación asistida de documentos legales
- 🌓 Tema claro/oscuro
- 🔒 Sistema de autenticación seguro
- 📱 Diseño responsive
- ⚡ Optimización de rendimiento
- 🔍 Sistema de búsqueda avanzado
- 📊 Panel de administración
- 🎯 Tour guiado para nuevos usuarios

## 🛠️ Tecnologías

### Frontend
- React 18
- Vite
- TailwindCSS
- React Router v6
- Recharts
- Intro.js
- Lucide Icons
- HeadlessUI

### Backend & Auth
- Supabase
- JWT
- Axios

### Testing
- Vitest
- Testing Library
- Jest DOM
- User Event Testing

### Utilidades
- Class Variance Authority
- Tailwind Merge
- CLSX
- PropTypes

## 📋 Requisitos Previos

- Node.js >= 18
- npm >= 9

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/[tu-usuario]/lawyer-ai-chat.git
cd lawyer-ai-chat
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env.development
```

4. Iniciar en modo desarrollo:
```bash
npm run dev
```

## 📦 Scripts Disponibles

### Desarrollo
- `npm run dev`: Inicia el entorno de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Vista previa de la versión de producción
- `npm run lint`: Ejecuta ESLint

### Testing
- `npm run test`: Ejecuta las pruebas una vez
- `npm run test:watch`: Ejecuta las pruebas en modo watch
- `npm run test:ui`: Abre la interfaz de usuario de Vitest
- `npm run test:coverage`: Genera reporte de cobertura
- `npm run test:ci`: Ejecuta pruebas para CI

### Utilidades
- `./diagnose.sh`: Diagnostica problemas comunes
- `./clean.sh`: Limpia el proyecto
- `./fix-common.sh`: Resuelve problemas comunes

## 👥 Usuarios de Prueba

### Usuario Normal
- Email: demo@example.com
- Password: Demo1234!
- Role: user

### Usuario Admin
- Email: admin@example.com
- Password: Admin1234!
- Role: admin

## 🏗️ Estructura del Proyecto

```
src/
├── assets/          # Recursos estáticos
├── components/      # Componentes reutilizables
│   ├── __tests__/  # Tests de componentes
│   └── monitoring/ # Componentes de monitoreo
├── config/         # Configuraciones
├── context/        # Contextos de React
│   └── hooks/     # Hooks de contexto
├── hooks/          # Hooks personalizados
│   └── __tests__/ # Tests de hooks
├── layouts/        # Layouts de la aplicación
├── pages/          # Páginas/Rutas
│   ├── admin/     # Panel de administración
│   └── dashboard/ # Dashboard principal
├── services/       # Servicios y APIs
├── tests/          # Tests de integración
└── utils/          # Utilidades
```

## 🔐 Seguridad

- Autenticación JWT
- Protección CSRF
- Validación de sesiones
- Auditoría de eventos
- Headers de seguridad
- Rate limiting
- Cookies seguras
- Validación de tokens

## ⚡ Optimizaciones

- Lazy loading de componentes
- Code splitting
- Memoización de componentes
- Optimización de re-renders
- Caching de assets
- Compresión de respuestas
- PostCSS optimizations
- Tailwind optimizations

## 🧪 Testing

- Tests unitarios con Vitest
- Tests de integración
- Tests de componentes
- Testing Library
- Cobertura > 80%
- UI Testing
- Event Testing
- CI Testing

## 🔄 Modo Desarrollo

El sistema puede funcionar en dos modos:

### Con Supabase
1. Configura las credenciales en `.env.development`:
```env
VITE_SUPABASE_URL=tu-url
VITE_SUPABASE_ANON_KEY=tu-key
```

### Sin Supabase (Mock)
- Autenticación simulada
- Datos de prueba
- Perfecto para desarrollo sin backend

## 🐛 Solución de Problemas

1. Ejecuta el diagnóstico:
```bash
./diagnose.sh
```

2. Problemas comunes:
```bash
./fix-common.sh
```

3. Limpieza del proyecto:
```bash
./clean.sh
```

## 📝 Notas de Desarrollo

- Los logs solo están activos en desarrollo
- El almacenamiento es local en desarrollo
- Las variables de entorno son configurables
- Sistema de feedback visual consistente
- ESLint configurado con reglas personalizadas
- PostCSS con soporte para nesting
- Autoprefixer habilitado

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/amazing`)
3. Commit tus cambios (`git commit -m 'Add: amazing feature'`)
4. Push a la rama (`git push origin feature/amazing`)
5. Abre un Pull Request

### Guías de Contribución
- Seguir el estilo de código existente
- Añadir tests para nueva funcionalidad
- Actualizar la documentación
- Verificar el linting (`npm run lint`)
- Asegurar que los tests pasen (`npm run test`)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 📞 Soporte

- Documentación: [docs/](docs/)
- Issues: [GitHub Issues](https://github.com/[tu-usuario]/lawyer-ai-chat/issues)
- Email: soporte@example.com

## 🔄 Versión

- Versión actual: 0.0.0
- Requiere: Node.js >= 18
