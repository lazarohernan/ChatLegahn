import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { logService } from '../services/logService';

export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }

  const {
    isAuthenticated,
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    signInWithProvider
  } = context;

  // Wrapper para el login que mantiene la interfaz anterior
  const login = async (email, password) => {
    try {
      logService.debug('Iniciando login con Supabase');
      const { user: userData } = await signIn({ email, password });
      logService.debug('Login exitoso:', { userId: userData.id });
      return userData;
    } catch (error) {
      logService.error('Error durante login:', error);
      throw error;
    }
  };

  // Wrapper para el registro que mantiene la interfaz anterior
  const register = async (userData) => {
    try {
      logService.debug('Iniciando registro con Supabase');
      const { user: newUser } = await signUp({
        email: userData.email,
        password: userData.password,
        metadata: {
          name: userData.name,
          role: userData.role || 'user'
        }
      });
      logService.debug('Registro exitoso:', { userId: newUser.id });
      return newUser;
    } catch (error) {
      logService.error('Error durante registro:', error);
      throw error;
    }
  };

  // Wrapper para el logout que mantiene la interfaz anterior
  const logout = async () => {
    try {
      logService.debug('Iniciando logout con Supabase');
      await signOut();
      navigate('/login', { replace: true });
      logService.debug('Logout completado');
    } catch (error) {
      logService.error('Error durante logout:', error);
      throw error;
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    resetPassword,
    updatePassword,
    signInWithProvider
  };
};

export default useAuth;
