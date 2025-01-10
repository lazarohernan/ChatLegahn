import { generateUUID } from '../utils/uuid';
import { logService } from './logService';

// Datos de prueba
const TEST_USERS = [
  {
    id: 1,
    name: 'Usuario Demo',
    email: 'demo@example.com',
    password: 'Demo1234!',
    role: 'user'
  },
  {
    id: 2,
    name: 'Admin Demo',
    email: 'admin@example.com',
    password: 'Admin1234!',
    role: 'admin'
  }
];

// Generar tokens
const generateTokens = (user) => {
  const now = Math.floor(Date.now() / 1000);
  
  // Access Token (corta duración - 15 minutos)
  const accessPayload = {
    sub: user.id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    type: 'access',
    jti: generateUUID(),
    iat: now,
    exp: now + 900 // 15 minutos
  };

  // Refresh Token (larga duración - 7 días)
  const refreshPayload = {
    sub: user.id.toString(),
    type: 'refresh',
    jti: generateUUID(),
    iat: now,
    exp: now + 604800 // 7 días
  };

  // Simular tokens JWT
  const base64AccessPayload = btoa(JSON.stringify(accessPayload))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const base64RefreshPayload = btoa(JSON.stringify(refreshPayload))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return {
    accessToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${base64AccessPayload}.mock_signature`,
    refreshToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${base64RefreshPayload}.mock_signature`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};

class AuthService {
  constructor() {
    // Almacenar tokens revocados (en producción esto estaría en una base de datos)
    this.revokedTokens = new Set();
  }

  async login(email, password, csrfToken) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validar CSRF token en desarrollo
    if (import.meta.env.MODE === 'development' && !csrfToken) {
      throw new Error('CSRF token es requerido');
    }

    const user = TEST_USERS.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const tokens = generateTokens(user);
    logService.logAuth('Login exitoso', user.id, { role: user.role });
    
    return tokens;
  }

  async register(userData) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Verificar si el email ya existe
    if (TEST_USERS.some(u => u.email === userData.email)) {
      throw new Error('El email ya está registrado');
    }

    // Crear nuevo usuario
    const newUser = {
      id: TEST_USERS.length + 1,
      ...userData,
      role: 'user'
    };

    // En un entorno real, aquí guardaríamos el usuario en la base de datos
    TEST_USERS.push(newUser);

    const tokens = generateTokens(newUser);
    logService.logAuth('Registro exitoso', newUser.id, { role: newUser.role });
    
    return tokens;
  }

  async refreshToken(oldRefreshToken) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // Verificar si el token está revocado
      if (this.revokedTokens.has(oldRefreshToken)) {
        throw new Error('Token revocado');
      }

      // Decodificar el refresh token
      const [, payload] = oldRefreshToken.split('.');
      const decodedPayload = JSON.parse(atob(payload));

      // Verificar tipo y expiración
      if (decodedPayload.type !== 'refresh') {
        throw new Error('Tipo de token inválido');
      }

      if (decodedPayload.exp < Date.now() / 1000) {
        throw new Error('Token expirado');
      }

      // Buscar usuario
      const user = TEST_USERS.find(u => u.id.toString() === decodedPayload.sub);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Revocar el token anterior
      this.revokedTokens.add(oldRefreshToken);

      // Generar nuevos tokens
      const tokens = generateTokens(user);
      logService.logAuth('Token refrescado', user.id, { role: user.role });

      return tokens;
    } catch (error) {
      logService.error('Error al refrescar token', { error: error.message });
      throw error;
    }
  }

  async logout(refreshToken) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (refreshToken) {
      // Revocar el refresh token
      this.revokedTokens.add(refreshToken);
      logService.logAuth('Token revocado', null, { token: refreshToken });
    }
    
    return true;
  }

  // Método para validar un token (útil para testing y desarrollo)
  validateToken(token) {
    if (!token || this.revokedTokens.has(token)) {
      return false;
    }

    try {
      const [, payload] = token.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }
}

export default new AuthService();
