import { useError } from '../context/ErrorContext';
import ErrorNotification from './ErrorNotification';

const ErrorNotificationContainer = () => {
  const { error, clearError } = useError();

  if (!error?.message) return null;

  return (
    <ErrorNotification 
      message={error.message}
      onClose={clearError}
      type="error"
    />
  );
};

export default ErrorNotificationContainer;
