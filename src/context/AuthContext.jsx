import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { logService } from '../services/logService';
import { sessionService } from '../services/sessionService';
import supabaseService from '../services/supabaseService';

export const AuthContext = createContext(null);

const INITIAL_STATE = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
  isInitialized: false
};

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(INITIAL_STATE);

  // Función para actualizar el estado de forma segura
  const updateState = useCallback((updates) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Función para inicializar la autenticación
  const initAuth = useCallback(async () => {
    if (state.isInitialized) return;

    try {
      logService.debug('Iniciando autenticación...');
      const session = await supabaseService.getSession();
      
      if (session) {
        updateState({
          user: session.user,
          isAuthenticated: true,
          isLoading: false,
          isInitialized: true
        });
        await sessionService.setSession(session);
      } else {
        updateState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true
        });
      }
    } catch (error) {
      logService.error('Error en initAuth:', error);
      updateState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true
      });
    }
  }, [state.isInitialized, updateState]);

  // Efecto para inicializar la autenticación
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // Efecto para manejar cambios en el estado de autenticación
  useEffect(() => {
    if (!state.isInitialized) return;

    const { data: { subscription } } = supabaseService.onAuthStateChange(async (event, session) => {
      logService.debug('Cambio en estado de autenticación:', event);
      
      switch (event) {
        case 'SIGNED_IN':
          updateState({
            user: session?.user || null,
            isAuthenticated: true,
            isLoading: false
          });
          if (session) await sessionService.setSession(session);
          break;

        case 'SIGNED_OUT':
          updateState({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
          await sessionService.clearSession();
          break;

        case 'TOKEN_REFRESHED':
          if (session) {
            updateState({ user: session.user });
            await sessionService.setSession(session);
          }
          break;

        default:
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [state.isInitialized, updateState]);

  const signIn = async (credentials) => {
    try {
      updateState({ isLoading: true });
      const data = await supabaseService.signIn(credentials);
      return data;
    } catch (error) {
      logService.error('Error en signIn:', error);
      throw error;
    } finally {
      updateState({ isLoading: false });
    }
  };

  const signOut = async () => {
    try {
      updateState({ isLoading: true });
      await supabaseService.signOut();
    } catch (error) {
      logService.error('Error en signOut:', error);
      throw error;
    } finally {
      updateState({ isLoading: false });
    }
  };

  // Solo renderizar cuando la autenticación esté inicializada
  if (!state.isInitialized) {
    return null;
  }

  const contextValue = {
    ...state,
    signIn,
    signOut,
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
