import { config } from '../config/env';
import { logService } from './logService';
import { generateUUID } from '../utils/uuid';

class SecurityService {
  constructor() {
    this.csrfToken = null;
  }

  generateCsrfToken() {
    if (!config.csrfEnabled) {
      return Promise.resolve(null);
    }

    // En desarrollo, generamos un token simple
    if (import.meta.env.MODE === 'development') {
      this.csrfToken = generateUUID();
      logService.logSecurity('CSRF Token Generated', { token: this.csrfToken });
      return Promise.resolve(this.csrfToken);
    }

    // En producción, se obtendría del backend
    return Promise.resolve(null);
  }

  validateToken() {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      logService.logAuth('Token Validation Failed', null, { reason: 'No token found' });
      return Promise.resolve({ valid: false, user: null });
    }

    try {
      // En desarrollo, validamos el token simulado
      if (import.meta.env.MODE === 'development') {
        const [, payload] = token.split('.');
        const decodedPayload = JSON.parse(atob(payload));
        
        // Verificar expiración
        if (decodedPayload.exp < Date.now() / 1000) {
          logService.logAuth('Token Validation Failed', null, { reason: 'Token expired' });
          return Promise.resolve({ valid: false, user: null });
        }

        logService.logAuth('Token Validated', decodedPayload.sub, { 
          role: decodedPayload.role 
        });

        return Promise.resolve({
          valid: true,
          user: {
            id: decodedPayload.sub,
            name: decodedPayload.name,
            email: decodedPayload.email,
            role: decodedPayload.role
          }
        });
      }

      // En producción, validaría contra el backend
      return Promise.resolve({ valid: false, user: null });
    } catch (error) {
      logService.error('Token Validation Error', { error: error.message });
      return Promise.resolve({ valid: false, user: null });
    }
  }

  getCsrfToken() {
    return this.csrfToken;
  }
}

export const securityService = new SecurityService();
export default securityService;
