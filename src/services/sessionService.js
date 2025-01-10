import { logService } from './logService';
import { cookieService } from './cookieService';
import supabaseService from './supabaseService';

class SessionService {
  constructor() {
    if (!cookieService) {
      throw new Error('CookieService is required');
    }
    this.cookieService = cookieService;
  }

  async setSession(session) {
    try {
      logService.debug('Guardando sesión');
      
      if (!session) {
        throw new Error('Session is required');
      }

      // Guardar token de acceso
      this.cookieService.set('access_token', session.access_token, {
        secure: true,
        sameSite: 'strict'
      });

      // Guardar refresh token si existe
      if (session.refresh_token) {
        this.cookieService.set('refresh_token', session.refresh_token, {
          secure: true,
          sameSite: 'strict'
        });
      }

      // Guardar datos de usuario
      if (session.user) {
        this.cookieService.set('user', JSON.stringify(session.user), {
          secure: true,
          sameSite: 'strict'
        });
      }

      logService.debug('Sesión guardada correctamente');
    } catch (error) {
      logService.error('Error guardando sesión:', error);
      throw error;
    }
  }

  async clearSession() {
    try {
      logService.debug('Limpiando sesión');
      
      // Limpiar cookies
      this.cookieService.remove('access_token');
      this.cookieService.remove('refresh_token');
      this.cookieService.remove('user');

      // Cerrar sesión en Supabase
      await supabaseService.signOut();

      logService.debug('Sesión limpiada correctamente');
    } catch (error) {
      logService.error('Error limpiando sesión:', error);
      throw error;
    }
  }

  isSessionValid() {
    try {
      const accessToken = this.cookieService.get('access_token');
      return !!accessToken;
    } catch (error) {
      logService.error('Error verificando sesión:', error);
      return false;
    }
  }

  getSession() {
    try {
      const accessToken = this.cookieService.get('access_token');
      const refreshToken = this.cookieService.get('refresh_token');
      const userStr = this.cookieService.get('user');

      if (!accessToken) {
        return null;
      }

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
        user: userStr ? JSON.parse(userStr) : null
      };
    } catch (error) {
      logService.error('Error obteniendo sesión:', error);
      return null;
    }
  }

  async refreshSession() {
    try {
      logService.debug('Refrescando sesión');
      const session = await supabaseService.refreshSession();
      
      if (session) {
        await this.setSession(session);
        logService.debug('Sesión refrescada correctamente');
        return session;
      }
      
      return null;
    } catch (error) {
      logService.error('Error refrescando sesión:', error);
      throw error;
    }
  }
}

export const sessionService = new SessionService();
export default sessionService;
