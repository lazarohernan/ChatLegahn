import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logService } from '../services/logService';
import { sessionService } from '../services/sessionService';

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateWithTransition = useCallback((to, options = {}) => {
    try {
      // Guardar la ruta actual antes de navegar
      const currentPath = window.location.hash.slice(1) || '/';
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
  }, [navigate]);

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
    goBack
  };
};

export default useNavigation;
