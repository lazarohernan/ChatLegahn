# Despliegue de LegalAI Chat

## ✅ Pasos Completados

### GitHub
1. Inicialización del repositorio
```bash
git init
git add .
git commit -m "feat: initial commit with Supabase auth integration"
git branch -M main
git remote add origin https://github.com/[usuario]/lawyer-ai-chat.git
git push -u origin main
```

### Configuración Local
1. Variables de entorno configuradas
2. Modo desarrollo con mock data implementado
3. Integración con Supabase configurada

## 🚀 Próximos Pasos

### Supabase
1. Configurar Site URL:
```
https://[tu-dominio-vercel].vercel.app
```

2. Agregar dominios permitidos:
```
https://[tu-dominio-vercel].vercel.app
https://[tu-dominio-vercel].vercel.app/**
```

3. Configurar proveedores de autenticación:
   - Email/Password
   - OAuth providers (opcional)
   - Plantillas de correo

### Vercel
1. Conectar con el repositorio de GitHub
2. Configurar variables de entorno:
```env
VITE_SUPABASE_URL=tu-project-url
VITE_SUPABASE_ANON_KEY=tu-anon-key
VITE_APP_URL=https://[tu-dominio-vercel].vercel.app
VITE_SUPABASE_REDIRECT_URL=https://[tu-dominio-vercel].vercel.app/confirm-email
VITE_SUPABASE_CALLBACK_URL=https://[tu-dominio-vercel].vercel.app/auth/callback
```

3. Configurar dominio personalizado (opcional)

### Post-Despliegue
1. Verificar:
   - Registro de usuarios
   - Confirmación de correo
   - Login/Logout
   - Recuperación de contraseña
   - Rutas protegidas

2. Monitoreo:
   - Configurar logs
   - Revisar métricas de rendimiento
   - Configurar alertas

3. Seguridad:
   - Revisar headers de seguridad
   - Verificar CORS
   - Validar manejo de sesiones

## 📝 Notas Importantes

### Desarrollo vs Producción
- Desarrollo usa datos mock cuando no hay credenciales de Supabase
- Producción requiere todas las variables de entorno
- Los logs detallados solo están activos en desarrollo

### Seguridad
- No exponer las claves de Supabase
- Usar HTTPS en producción
- Configurar CSP headers
- Implementar rate limiting

### Mantenimiento
- Monitorear uso de Supabase
- Revisar logs periódicamente
- Mantener dependencias actualizadas
- Hacer backups regulares
