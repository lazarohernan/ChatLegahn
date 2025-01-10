let errorHandler = null;

export const setErrorHandler = (handler) => {
  errorHandler = handler;
};

export const handleError = (error) => {
  if (errorHandler) {
    errorHandler(error);
  } else {
    console.error('Error handler not set:', error);
  }
};
