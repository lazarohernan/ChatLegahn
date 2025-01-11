import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [previousPath, setPreviousPath] = useState(null);
  const [navigationStack, setNavigationStack] = useState([window.location.pathname]);

  const navigate = (path) => {
    setPreviousPath(currentPath);
    setCurrentPath(path);
    setNavigationStack(prev => [...prev, path]);
  };

  const goBack = () => {
    if (navigationStack.length > 1) {
      const newStack = [...navigationStack];
      newStack.pop();
      const previousPath = newStack[newStack.length - 1];
      setCurrentPath(previousPath);
      setNavigationStack(newStack);
      return previousPath;
    }
    return null;
  };

  const value = {
    currentPath,
    previousPath,
    navigationStack,
    navigate,
    goBack
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

NavigationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
