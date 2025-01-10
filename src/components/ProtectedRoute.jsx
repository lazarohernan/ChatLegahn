import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '../hooks/useNavigation';
import { sessionService } from '../services/sessionService';
import { logService } from '../services/logService';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, validateSession } = useAuth();
  const { navigateWithTransition } = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Guardar la ruta actual antes de cualquier redirección
        const currentPath = window.location.hash.slice(1) || '/';
        sessionService.setLastAttemptedRoute(currentPath);

        // Si no está autenticado, intentar validar la sesión
        if (!isAuthenticated) {
          await validateSession();
        }
      } catch (error) {
        logService.debug('Error validando sesión en ruta protegida:', error);
        
        // Redirigir al login preservando la ruta actual
        navigateWithTransition('/login', {
          replace: true,
          preserveQuery: true
        });
      }
    };

    if (!isLoading) {
      checkAuth();
    }
  }, [isAuthenticated, isLoading, validateSession, navigateWithTransition]);

  // Mostrar nada mientras se valida la sesión
  if (isLoading) {
    return null;
  }

  // Si está autenticado, mostrar la ruta protegida
  if (isAuthenticated) {
    return children;
  }

  // Si no está autenticado y no está cargando, no mostrar nada
  // (la redirección se maneja en el useEffect)
  return null;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedRoute;
