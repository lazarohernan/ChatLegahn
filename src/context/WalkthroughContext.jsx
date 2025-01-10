import { createContext } from 'react';
import PropTypes from 'prop-types';

export const WalkthroughContext = createContext();

export const WalkthroughProvider = ({ children }) => {
  // Función vacía para mantener la interfaz del contexto
  const startWalkthrough = () => {
    console.log('Tutorial temporalmente desactivado');
  };

  return (
    <WalkthroughContext.Provider value={{ startWalkthrough }}>
      {children}
    </WalkthroughContext.Provider>
  );
};

WalkthroughProvider.propTypes = {
  children: PropTypes.node.isRequired
};
