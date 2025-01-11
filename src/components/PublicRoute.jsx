import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';
import Spinner from './Spinner';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();

  // Mostrar spinner mientras se inicializa la autenticación
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" center />
      </div>
    );
  }

  // Redirigir a dashboard si está autenticado
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Renderizar contenido para usuarios no autenticados
  return children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default PublicRoute;
