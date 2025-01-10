class LogService {
  constructor() {
    this.isDevelopment = import.meta.env.MODE === 'development';
    this.isDebugEnabled = this.isDevelopment || localStorage.getItem('debug_enabled') === 'true';
  }

  debug(...args) {
    if (this.isDebugEnabled) {
      console.debug(
        '%c[DEBUG]',
        'color: #2563eb; font-weight: bold;',
        new Date().toISOString(),
        ...args
      );
    }
  }

  info(...args) {
    if (this.isDevelopment) {
      console.info(
        '%c[INFO]',
        'color: #059669; font-weight: bold;',
        new Date().toISOString(),
        ...args
      );
    }
  }

  warn(...args) {
    console.warn(
      '%c[WARN]',
      'color: #d97706; font-weight: bold;',
      new Date().toISOString(),
      ...args
    );
  }

  error(...args) {
    console.error(
      '%c[ERROR]',
      'color: #dc2626; font-weight: bold;',
      new Date().toISOString(),
      ...args
    );

    // En desarrollo, también mostrar la stack trace
    if (this.isDevelopment && args[0] instanceof Error) {
      console.error(args[0].stack);
    }
  }

  // Habilitar/deshabilitar logs de debug en runtime
  enableDebug() {
    this.isDebugEnabled = true;
    localStorage.setItem('debug_enabled', 'true');
    this.debug('Debug logs habilitados');
  }

  disableDebug() {
    this.debug('Debug logs deshabilitados');
    this.isDebugEnabled = false;
    localStorage.setItem('debug_enabled', 'false');
  }

  // Método para logs de sesión específicamente
  session(...args) {
    if (this.isDebugEnabled) {
      console.debug(
        '%c[SESSION]',
        'color: #7c3aed; font-weight: bold;',
        new Date().toISOString(),
        ...args
      );
    }
  }

  // Método para logs de autenticación
  auth(...args) {
    if (this.isDebugEnabled) {
      console.debug(
        '%c[AUTH]',
        'color: #0891b2; font-weight: bold;',
        new Date().toISOString(),
        ...args
      );
    }
  }

  // Método para logs de navegación
  navigation(...args) {
    if (this.isDebugEnabled) {
      console.debug(
        '%c[NAV]',
        'color: #4f46e5; font-weight: bold;',
        new Date().toISOString(),
        ...args
      );
    }
  }
}

export const logService = new LogService();
export default logService;
