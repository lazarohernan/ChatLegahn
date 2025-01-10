import { logService } from './logService';

class CookieService {
  constructor() {
    this.ACCESS_TOKEN_KEY = 'access_token';
    this.REFRESH_TOKEN_KEY = 'refresh_token';
    this.USER_KEY = 'user_data';
    this.COOKIE_OPTIONS = {
      path: '/',
      secure: import.meta.env.PROD,
      sameSite: 'strict'
    };
  }

  // Token Management
  setAccessToken(token) {
    try {
      document.cookie = `${this.ACCESS_TOKEN_KEY}=${token}; ${this._getCookieOptions()}`;
      logService.debug('Access token establecido');
    } catch (error) {
      logService.error('Error estableciendo access token:', error);
    }
  }

  setRefreshToken(token) {
    try {
      document.cookie = `${this.REFRESH_TOKEN_KEY}=${token}; ${this._getCookieOptions()}`;
      logService.debug('Refresh token establecido');
    } catch (error) {
      logService.error('Error estableciendo refresh token:', error);
    }
  }

  getAccessToken() {
    try {
      return this._getCookie(this.ACCESS_TOKEN_KEY);
    } catch (error) {
      logService.error('Error obteniendo access token:', error);
      return null;
    }
  }

  getRefreshToken() {
    try {
      return this._getCookie(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      logService.error('Error obteniendo refresh token:', error);
      return null;
    }
  }

  // User Data Management
  setUser(userData) {
    try {
      const userString = JSON.stringify(userData);
      document.cookie = `${this.USER_KEY}=${encodeURIComponent(userString)}; ${this._getCookieOptions()}`;
      logService.debug('Datos de usuario establecidos');
    } catch (error) {
      logService.error('Error estableciendo datos de usuario:', error);
    }
  }

  getUser() {
    try {
      const userString = this._getCookie(this.USER_KEY);
      return userString ? JSON.parse(decodeURIComponent(userString)) : null;
    } catch (error) {
      logService.error('Error obteniendo datos de usuario:', error);
      return null;
    }
  }

  // Clear Functions
  clearTokens() {
    try {
      this._removeCookie(this.ACCESS_TOKEN_KEY);
      this._removeCookie(this.REFRESH_TOKEN_KEY);
      logService.debug('Tokens eliminados');
      return true;
    } catch (error) {
      logService.error('Error eliminando tokens:', error);
      return false;
    }
  }

  clearUser() {
    try {
      this._removeCookie(this.USER_KEY);
      logService.debug('Datos de usuario eliminados');
      return true;
    } catch (error) {
      logService.error('Error eliminando datos de usuario:', error);
      return false;
    }
  }

  clearAll() {
    try {
      this.clearTokens();
      this.clearUser();
      logService.debug('Todas las cookies eliminadas');
      return true;
    } catch (error) {
      logService.error('Error eliminando todas las cookies:', error);
      return false;
    }
  }

  // Helper Functions
  _getCookie(name) {
    try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
      return null;
    } catch (error) {
      logService.error(`Error obteniendo cookie ${name}:`, error);
      return null;
    }
  }

  _removeCookie(name) {
    try {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; ${this._getCookieOptions()}`;
      return true;
    } catch (error) {
      logService.error(`Error eliminando cookie ${name}:`, error);
      return false;
    }
  }

  _getCookieOptions() {
    const options = [];
    for (const [key, value] of Object.entries(this.COOKIE_OPTIONS)) {
      if (value === true) {
        options.push(key);
      } else if (value !== false) {
        options.push(`${key}=${value}`);
      }
    }
    return options.join('; ');
  }

  // Debug Functions
  debug() {
    logService.debug('CookieService:', {
      accessToken: this.getAccessToken() ? '[PRESENT]' : '[ABSENT]',
      refreshToken: this.getRefreshToken() ? '[PRESENT]' : '[ABSENT]',
      user: this.getUser() ? '[PRESENT]' : '[ABSENT]',
      allCookies: document.cookie
    });
  }
}

export const cookieService = new CookieService();
export default cookieService;
