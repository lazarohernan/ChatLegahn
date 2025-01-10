import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import securityService from '../services/securityService';
import cookieService from '../services/cookieService';
import sessionService from '../services/sessionService';
import { logService } from '../services/logService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const refreshTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Limpiar el refresh timer antes de cualquier otra operación
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }

      // Intentar finalizar la sesión
      try {
        await sessionService.endSession();
      } catch (error) {
        logService.debug('Error durante endSession, continuando con limpieza:', error);
        // Continuar con la limpieza aunque falle endSession
      }
      
      // Limpiar estado local
      setUser(null);
      setIsAuthenticated(false);
      
      // Asegurar que la navegación ocurra después de la limpieza
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 100);

      logService.debug('Logout completado');
    } catch (error) {
      logService.debug('Error durante logout:', error);
      // Asegurar que el estado se limpie incluso si hay errores
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login', { replace: true });
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Configurar el refresh token timer
  const setupRefreshTimer = useCallback((expiresIn) => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    // Programar el refresh 1 minuto antes de que expire
    const timeoutMs = (expiresIn - 60) * 1000;
    refreshTimeoutRef.current = setTimeout(async () => {
      try {
        await sessionService.refreshSessionTokens();
      } catch (error) {
        logService.debug('Error refreshing token:', error);
        await logout();
      }
    }, timeoutMs);
  }, [logout]);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    try {
      const csrfToken = await securityService.generateCsrfToken();
      if (!csrfToken && import.meta.env.MODE === 'development') {
        throw new Error('Error generando token CSRF');
      }
      
      const { user: userData, accessToken, refreshToken } = 
        await authService.login(email, password, csrfToken);
      
      setUser(userData);
      setIsAuthenticated(true);
      cookieService.setAccessToken(accessToken);
      cookieService.setRefreshToken(refreshToken);
      cookieService.setUser(userData);

      // Inicializar sesión
      sessionService.setSession({
        user: userData,
        lastLogin: Date.now()
      });

      // Decodificar el token para obtener el tiempo de expiración
      const [, payload] = accessToken.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      const expiresIn = decodedPayload.exp - Math.floor(Date.now() / 1000);
      
      // Configurar el refresh timer
      setupRefreshTimer(expiresIn);

      logService.debug('Login exitoso:', { userId: userData.id });
      
      return userData;
    } catch (error) {
      if (error.message.includes('CSRF')) {
        throw new Error('Error de seguridad: Token CSRF no válido');
      }
      logService.error('Error durante login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setupRefreshTimer]);

  const register = useCallback(async (userData) => {
    setIsLoading(true);
    try {
      const csrfToken = await securityService.generateCsrfToken();
      const { user: newUser, accessToken, refreshToken } = 
        await authService.register(userData, csrfToken);
      
      setUser(newUser);
      setIsAuthenticated(true);
      cookieService.setAccessToken(accessToken);
      cookieService.setRefreshToken(refreshToken);
      cookieService.setUser(newUser);

      // Inicializar sesión
      sessionService.setSession({
        user: newUser,
        lastLogin: Date.now()
      });

      // Decodificar el token para obtener el tiempo de expiración
      const [, payload] = accessToken.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      const expiresIn = decodedPayload.exp - Math.floor(Date.now() / 1000);
      
      // Configurar el refresh timer
      setupRefreshTimer(expiresIn);

      logService.debug('Registro exitoso:', { userId: newUser.id });
      
      return newUser;
    } catch (error) {
      logService.error('Error durante registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setupRefreshTimer]);

  const validateSession = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Verificar si hay una sesión almacenada
      if (!sessionService.hasStoredSession()) {
        logService.debug('No hay sesión almacenada');
        return;
      }

      // Verificar si la sesión es válida
      if (!sessionService.isSessionValid()) {
        const refreshToken = cookieService.getRefreshToken();
        if (refreshToken) {
          try {
            await sessionService.refreshSessionTokens();
          } catch (refreshError) {
            logService.debug('Error al refrescar tokens:', refreshError);
            throw new Error('No se pudo refrescar la sesión');
          }
        } else {
          logService.debug('No hay refresh token disponible');
          throw new Error('Sesión inválida');
        }
      }

      const session = sessionService.getSession();
      if (session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);

        // Configurar el próximo refresh
        const accessToken = cookieService.getAccessToken();
        if (!accessToken) {
          throw new Error('Token de acceso no encontrado');
        }

        const [, payload] = accessToken.split('.');
        if (!payload) {
          throw new Error('Token de acceso malformado');
        }

        const decodedPayload = JSON.parse(atob(payload));
        const expiresIn = decodedPayload.exp - Math.floor(Date.now() / 1000);
        
        setupRefreshTimer(expiresIn);
        logService.debug('Sesión validada:', { userId: session.user.id });
      } else {
        throw new Error('Datos de sesión incompletos');
      }
    } catch (error) {
      logService.debug('Error validando sesión:', error.message);
      setUser(null);
      setIsAuthenticated(false);
      sessionService.clearSession();
    } finally {
      setIsLoading(false);
    }
  }, [setupRefreshTimer]);

  // Limpiar el refresh timer al desmontar
  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  // Validar sesión al montar
  useEffect(() => {
    validateSession();
  }, [validateSession]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    validateSession
  };
};
