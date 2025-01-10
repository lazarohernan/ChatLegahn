import { logService } from './logService';
import cookieService from './cookieService';
import authService from './authService';

class SessionService {
  constructor() {
    this.SESSION_KEY = 'app_session';
    this.LAST_ROUTE_KEY = 'last_attempted_route';
    this.ACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutos
    this.activityTimer = null;

    // Verificar que cookieService tenga las funciones necesarias
    this._validateCookieService();
  }

  _validateCookieService() {
    const requiredMethods = ['clearTokens', 'clearUser', 'getAccessToken', 'getRefreshToken'];
    requiredMethods.forEach(method => {
      if (typeof cookieService[method] !== 'function') {
        logService.error(`CookieService no tiene el método requerido: ${method}`);
      }
    });
    logService.debug('CookieService validado:', cookieService);
  }

  setSession(sessionData) {
    try {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify({
        ...sessionData,
        timestamp: Date.now()
      }));
      logService.debug('Sesión guardada');
      this.startActivityTimer();
    } catch (error) {
      logService.error('Error guardando sesión:', error);
      throw error;
    }
  }

  getSession() {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      return sessionData ? JSON.parse(sessionData) : null;
    } catch (error) {
      logService.error('Error recuperando sesión:', error);
      return null;
    }
  }

  hasStoredSession() {
    return Boolean(localStorage.getItem(this.SESSION_KEY));
  }

  isSessionValid() {
    try {
      const session = this.getSession();
      if (!session) return false;

      const accessToken = cookieService.getAccessToken();
      if (!accessToken) return false;

      // Verificar si el token está expirado
      const [, payload] = accessToken.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      const currentTime = Math.floor(Date.now() / 1000);

      return decodedPayload.exp > currentTime;
    } catch (error) {
      logService.error('Error validando sesión:', error);
      return false;
    }
  }

  startActivityTimer() {
    logService.debug('Iniciando timer de actividad');
    if (this.activityTimer) {
      clearTimeout(this.activityTimer);
    }
    this.activityTimer = setTimeout(() => {
      logService.debug('Timer de inactividad expirado');
      this.endSession();
    }, this.ACTIVITY_TIMEOUT);
  }

  async refreshSessionTokens() {
    try {
      const refreshToken = cookieService.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const { accessToken, refreshToken: newRefreshToken } = 
        await authService.refreshTokens(refreshToken);

      cookieService.setAccessToken(accessToken);
      cookieService.setRefreshToken(newRefreshToken);

      logService.debug('Tokens actualizados');
      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      logService.error('Error refreshing tokens:', error);
      await this.clearSession();
      throw error;
    }
  }

  setLastAttemptedRoute(route) {
    try {
      sessionStorage.setItem(this.LAST_ROUTE_KEY, route);
    } catch (error) {
      logService.error('Error guardando última ruta:', error);
    }
  }

  getLastAttemptedRoute() {
    try {
      return sessionStorage.getItem(this.LAST_ROUTE_KEY);
    } catch (error) {
      logService.error('Error recuperando última ruta:', error);
      return null;
    }
  }

  clearLastAttemptedRoute() {
    try {
      sessionStorage.removeItem(this.LAST_ROUTE_KEY);
    } catch (error) {
      logService.error('Error limpiando última ruta:', error);
    }
  }

  async endSession() {
    try {
      if (this.activityTimer) {
        clearTimeout(this.activityTimer);
        this.activityTimer = null;
      }

      const refreshToken = cookieService.getRefreshToken();
      if (refreshToken) {
        try {
          await authService.revokeToken(refreshToken);
        } catch (revokeError) {
          logService.debug('Error al revocar token, continuando con limpieza:', revokeError);
        }
      }
      
      await this.clearSession();
      logService.debug('Sesión finalizada');
    } catch (error) {
      logService.error('Error durante el cierre de sesión:', error);
      // Intentar limpiar la sesión incluso si hay errores
      await this.clearSession();
      throw error;
    }
  }

  async clearSession() {
    const clearOperations = [
      {
        operation: () => localStorage.removeItem(this.SESSION_KEY),
        name: 'localStorage'
      },
      {
        operation: () => cookieService.clearTokens(),
        name: 'tokens'
      },
      {
        operation: () => cookieService.clearUser(),
        name: 'user data'
      },
      {
        operation: () => this.clearLastAttemptedRoute(),
        name: 'last route'
      }
    ];

    const errors = [];

    for (const { operation, name } of clearOperations) {
      try {
        await operation();
        logService.debug(`Limpieza exitosa: ${name}`);
      } catch (error) {
        logService.error(`Error limpiando ${name}:`, error);
        errors.push({ name, error });
      }
    }

    if (errors.length > 0) {
      logService.error('Errores durante la limpieza de sesión:', errors);
      throw new Error('Error durante la limpieza de sesión');
    }

    logService.debug('Sesión limpiada completamente');
  }
}

export const sessionService = new SessionService();
export default sessionService;
