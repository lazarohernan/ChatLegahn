import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { setErrorHandler } from '../utils/errorHandler';

const ErrorContext = createContext(null);

export const ErrorTypes = {
  AUTH: 'auth',
  NETWORK: 'network',
  VALIDATION: 'validation',
  SERVER: 'server',
  CLIENT: 'client'
};

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const showError = useCallback((message, type = ErrorTypes.CLIENT, duration = 5000) => {
    setError({ message, type, timestamp: Date.now() });
    if (duration) {
      setTimeout(() => {
        setError(null);
      }, duration);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback((error) => {
    if (error.response) {
      // Error de respuesta del servidor
      const status = error.response.status;
      const message = error.response.data?.message || 'Error del servidor';

      switch (status) {
        case 400:
          showError(message, ErrorTypes.VALIDATION);
          break;
        case 401:
          showError('Sesión expirada. Por favor, inicie sesión nuevamente.', ErrorTypes.AUTH);
          break;
        case 403:
          showError('No tiene permisos para realizar esta acción.', ErrorTypes.AUTH);
          break;
        case 404:
          showError('Recurso no encontrado.', ErrorTypes.CLIENT);
          break;
        case 422:
          showError(message, ErrorTypes.VALIDATION);
          break;
        case 429:
          showError('Demasiadas solicitudes. Por favor, espere un momento.', ErrorTypes.CLIENT);
          break;
        default:
          if (status >= 500) {
            showError('Error del servidor. Por favor, intente más tarde.', ErrorTypes.SERVER);
          } else {
            showError(message, ErrorTypes.CLIENT);
          }
      }
    } else if (error.request) {
      // Error de red
      showError(
        'Error de conexión. Por favor, verifique su conexión a internet.',
        ErrorTypes.NETWORK
      );
    } else {
      // Error de cliente
      showError(error.message || 'Ha ocurrido un error.', ErrorTypes.CLIENT);
    }

    // Log del error para debugging
    if (import.meta.env.DEV) {
      console.error('Error Details:', {
        error,
        timestamp: new Date().toISOString(),
      });
    }
  }, [showError]);

  // Registrar el manejador de errores cuando se monte el componente
  useEffect(() => {
    setErrorHandler(handleError);
    return () => setErrorHandler(null);
  }, [handleError]);

  const value = {
    error,
    showError,
    clearError,
    handleError
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
};

ErrorProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};
