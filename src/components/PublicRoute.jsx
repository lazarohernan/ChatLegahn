import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '../hooks/useNavigation';
import { sessionService } from '../services/sessionService';
import { logService } from '../services/logService';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { navigateWithTransition } = useNavigation();

  useEffect(() => {
    const handleAuthenticatedUser = () => {
      try {
        // Solo redirigir si no estamos en la página principal
        if (window.location.hash !== '#/') {
          const lastAttemptedRoute = sessionService.getLastAttemptedRoute();
          
          if (lastAttemptedRoute) {
            sessionService.clearLastAttemptedRoute();
            navigateWithTransition(lastAttemptedRoute, { replace: true });
            logService.debug('Redirigiendo a última ruta:', lastAttemptedRoute);
          } else {
            navigateWithTransition('/dashboard/chat', { replace: true });
            logService.debug('Redirigiendo a dashboard por defecto');
          }
        }
      } catch (error) {
        logService.error('Error en redirección de ruta pública:', error);
        navigateWithTransition('/dashboard/chat', { replace: true });
      }
    };

    // Solo proceder si no está cargando y está autenticado
    if (!isLoading && isAuthenticated) {
      handleAuthenticatedUser();
    }
  }, [isAuthenticated, isLoading, navigateWithTransition]);

  // Mostrar nada mientras se verifica la autenticación
  if (isLoading) {
    return null;
  }

  // Si no está autenticado, mostrar la ruta pública
  if (!isAuthenticated) {
    return children;
  }

  // Si está autenticado, no mostrar nada
  // (la redirección se maneja en el useEffect)
  return null;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default PublicRoute;
