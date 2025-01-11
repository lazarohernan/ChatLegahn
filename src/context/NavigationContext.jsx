import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { logService } from '../services/logService';

const NavigationContext = createContext();

// Helper para obtener la ruta actual del hash
const getCurrentHashPath = () => {
  const hash = window.location.hash;
  return hash ? hash.slice(1) : '/';
};

const initialState = {
  history: {},
  currentPath: getCurrentHashPath()
};

const navigationReducer = (state, action) => {
  switch (action.type) {
    case 'SAVE_STATE':
      return {
        ...state,
        history: {
          ...state.history,
          [action.path]: action.state
        }
      };
    case 'UPDATE_PATH':
      return {
        ...state,
        currentPath: action.path
      };
    case 'CLEAR_HISTORY':
      return {
        ...state,
        history: {}
      };
    default:
      return state;
  }
};

export const NavigationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(navigationReducer, initialState);

  // Escuchar cambios en el hash
  useEffect(() => {
    const handleHashChange = () => {
      const newPath = getCurrentHashPath();
      dispatch({ type: 'UPDATE_PATH', path: newPath });
      logService.debug('Hash changed:', newPath);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const saveState = useCallback((path, pageState) => {
    try {
      dispatch({ type: 'SAVE_STATE', path, state: pageState });
      logService.debug('State saved for path:', path);
    } catch (error) {
      logService.error('Error saving state:', error);
    }
  }, []);

  const updatePath = useCallback((path) => {
    try {
      dispatch({ type: 'UPDATE_PATH', path });
      logService.debug('Path updated:', path);
    } catch (error) {
      logService.error('Error updating path:', error);
    }
  }, []);

  const clearHistory = useCallback(() => {
    try {
      dispatch({ type: 'CLEAR_HISTORY' });
      logService.debug('Navigation history cleared');
    } catch (error) {
      logService.error('Error clearing history:', error);
    }
  }, []);

  const getState = useCallback((path) => {
    try {
      return state.history[path] || null;
    } catch (error) {
      logService.error('Error getting state for path:', path, error);
      return null;
    }
  }, [state.history]);

  return (
    <NavigationContext.Provider value={{
      history: state.history,
      currentPath: state.currentPath,
      saveState,
      updatePath,
      clearHistory,
      getState
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

NavigationProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useNavigationState = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationState debe usarse dentro de NavigationProvider');
  }
  return context;
};
