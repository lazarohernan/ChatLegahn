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
      if (session.access_token) {
        this.cookieService.setAccessToken(session.access_token);
      }

      // Guardar refresh token si existe
      if (session.refresh_token) {
        this.cookieService.setRefreshToken(session.refresh_token);
      }

      // Guardar datos de usuario
      if (session.user) {
        this.cookieService.setUser(session.user);
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
      
      // Limpiar todas las cookies
      this.cookieService.clearAll();

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
      const accessToken = this.cookieService.getAccessToken();
      return !!accessToken;
    } catch (error) {
      logService.error('Error verificando sesión:', error);
      return false;
    }
  }

  getSession() {
    try {
      const accessToken = this.cookieService.getAccessToken();
      const refreshToken = this.cookieService.getRefreshToken();
      const user = this.cookieService.getUser();

      if (!accessToken) {
        return null;
      }

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
        user: user
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
