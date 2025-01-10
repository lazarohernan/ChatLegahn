import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { logService } from '../services/logService';
import { sessionService } from '../services/sessionService';
import supabaseService from '../services/supabaseService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Función para inicializar la autenticación
  const initAuth = useCallback(async () => {
    try {
      logService.debug('Iniciando autenticación...');
      const session = await supabaseService.getSession();
      
      if (session) {
        setUser(session.user);
        setIsAuthenticated(true);
        logService.debug('Sesión restaurada para usuario:', session.user.id);
        await sessionService.setSession(session);
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

  // Efecto para manejar cambios en el estado de autenticación
  useEffect(() => {
    const { data: { subscription } } = supabaseService.onAuthStateChange(async (event, session) => {
      logService.debug('Cambio en estado de autenticación:', event);
      
      if (event === 'SIGNED_IN') {
        setUser(session.user);
        setIsAuthenticated(true);
        await sessionService.setSession(session);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
        await sessionService.clearSession();
      } else if (event === 'TOKEN_REFRESHED') {
        setUser(session.user);
        await sessionService.setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Funciones de autenticación
  const signIn = async (credentials) => {
    try {
      setIsLoading(true);
      const data = await supabaseService.signIn(credentials);
      setUser(data.user);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      logService.error('Error en signIn:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (credentials) => {
    try {
      setIsLoading(true);
      const data = await supabaseService.signUp(credentials);
      return data;
    } catch (error) {
      logService.error('Error en signUp:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabaseService.signOut();
      setUser(null);
      setIsAuthenticated(false);
      await sessionService.clearSession();
    } catch (error) {
      logService.error('Error en signOut:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email) => {
    try {
      setIsLoading(true);
      await supabaseService.resetPassword(email);
    } catch (error) {
      logService.error('Error en resetPassword:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      setIsLoading(true);
      await supabaseService.updatePassword(newPassword);
    } catch (error) {
      logService.error('Error en updatePassword:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithProvider = async (provider) => {
    try {
      setIsLoading(true);
      const data = await supabaseService.signInWithProvider(provider);
      return data;
    } catch (error) {
      logService.error('Error en signInWithProvider:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = {
    isAuthenticated,
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    signInWithProvider,
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
