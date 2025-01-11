import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { supabaseService } from '@services/supabaseService';
import { useError } from './ErrorContext';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showError } = useError();

  useEffect(() => {
    const initAuth = async () => {
      try {
        console.debug('[DEBUG]', new Date().toISOString(), 'Iniciando autenticación...');
        
        // Obtener sesión actual
        const session = await supabaseService.user.getSession();
        setUser(session?.user || null);
        
        // Suscribirse a cambios de autenticación
        const { data: { subscription } } = supabaseService.auth.onAuthStateChange(
          (_event, session) => {
            setUser(session?.user || null);
          }
        );

        return () => {
          subscription?.unsubscribe();
        };
      } catch (error) {
        console.error('[ERROR]', new Date().toISOString(), 'Error en initAuth:', error);
        showError(error.message);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [showError]);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    signIn: supabaseService.auth.signIn,
    signUp: supabaseService.auth.signUp,
    signOut: supabaseService.auth.signOut,
    resetPassword: supabaseService.auth.resetPassword,
    updatePassword: supabaseService.auth.updatePassword,
    verifyEmail: supabaseService.auth.verifyEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
