import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logService } from '../services/logService';
import { sessionService } from '../services/sessionService';
import { useNavigationState } from '../context/NavigationContext';

export const useNavigation = () => {
  const navigate = useNavigate();
  const { updatePath } = useNavigationState();

  const getCurrentHashPath = () => {
    const hash = window.location.hash;
    return hash ? hash.slice(1) : '/';
  };

  const navigateWithTransition = useCallback((to, options = {}) => {
    try {
      // Guardar la ruta actual antes de navegar
      const currentPath = getCurrentHashPath();
      sessionService.setLastAttemptedRoute(currentPath);

      // Asegurar que las rutas empiecen con /
      let path = to.startsWith('/') ? to : `/${to}`;
      
      // Opciones por defecto
      const defaultOptions = {
        replace: false,
        preserveQuery: false
      };

      const finalOptions = { ...defaultOptions, ...options };

      // Preservar query params si es necesario
      if (finalOptions.preserveQuery) {
        const currentQuery = window.location.search;
        if (currentQuery) {
          path += currentQuery;
        }
      }

      // Actualizar el path en el contexto
      updatePath(path);

      // Navegar con las opciones especificadas
      navigate(path, {
        replace: finalOptions.replace
      });

      logService.debug('Navegación exitosa a:', path);
    } catch (error) {
      logService.error('Error durante la navegación:', error);
      
      // En caso de error, intentar navegar al dashboard
      navigate('/dashboard/chat', { replace: true });
    }
  }, [navigate, updatePath]);

  const goBack = useCallback(() => {
    try {
      const lastRoute = sessionService.getLastAttemptedRoute();
      if (lastRoute) {
        navigateWithTransition(lastRoute, { replace: true });
        sessionService.clearLastAttemptedRoute();
      } else {
        navigate(-1);
      }
    } catch (error) {
      logService.error('Error al navegar hacia atrás:', error);
      navigate('/dashboard/chat', { replace: true });
    }
  }, [navigate, navigateWithTransition]);

  return {
    navigateWithTransition,
    goBack,
    getCurrentPath: getCurrentHashPath
  };
};

export default useNavigation;
