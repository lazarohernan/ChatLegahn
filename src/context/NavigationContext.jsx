import { createContext, useContext, useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';

const NavigationContext = createContext();

const initialState = {
  history: {},
  currentPath: window.location.pathname
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

  const saveState = useCallback((path, pageState) => {
    dispatch({ type: 'SAVE_STATE', path, state: pageState });
  }, []);

  const updatePath = useCallback((path) => {
    dispatch({ type: 'UPDATE_PATH', path });
  }, []);

  const clearHistory = useCallback(() => {
    dispatch({ type: 'CLEAR_HISTORY' });
  }, []);

  const getState = useCallback((path) => {
    return state.history[path] || null;
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
