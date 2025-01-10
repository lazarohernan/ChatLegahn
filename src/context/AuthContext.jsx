import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { logService } from '../services/logService';
import { sessionService } from '../services/sessionService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Función para inicializar la autenticación
  const initAuth = useCallback(async () => {
    try {
      logService.debug('Iniciando autenticación...');
      const isValid = sessionService.isSessionValid();
      
      if (isValid) {
        const session = sessionService.getSession();
        if (session?.user) {
          setUser(session.user);
          setIsAuthenticated(true);
          logService.debug('Sesión restaurada para usuario:', session.user.id);
        }
      } else {
        logService.debug('No hay sesión válida');
        await sessionService.clearSession();
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      logService.error('Error en initAuth:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Efecto para inicializar la autenticación
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // Efecto para manejar la extensión de sesión
  useEffect(() => {
    if (!isAuthenticated) return;

    logService.debug('Configurando extensión de sesión');
    
    const handleActivity = async () => {
      try {
        if (typeof sessionService.extendSession === 'function') {
          await sessionService.extendSession();
          logService.debug('Sesión extendida por actividad');
        } else {
          logService.error('extendSession no está definido en sessionService');
        }
      } catch (error) {
        logService.error('Error extendiendo sesión:', error);
      }
    };

    // Eventos para detectar actividad del usuario
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Limpiar event listeners
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [isAuthenticated]);

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    isLoading,
    initAuth
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;
