import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { XMarkIcon, ExclamationTriangleIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const ErrorNotification = ({
  message,
  type = 'error',
  onClose,
  autoClose = false,
  action = null
}) => {
  useEffect(() => {
    if (autoClose && typeof autoClose === 'number') {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const getTypeConfig = () => {
    const configs = {
      error: {
        bgColor: 'bg-red-50',
        textColor: 'text-red-800',
        icon: XCircleIcon,
        iconColor: 'text-red-400',
        testId: 'error-icon'
      },
      warning: {
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-800',
        icon: ExclamationTriangleIcon,
        iconColor: 'text-yellow-400',
        testId: 'warning-icon'
      },
      success: {
        bgColor: 'bg-green-50',
        textColor: 'text-green-800',
        icon: CheckCircleIcon,
        iconColor: 'text-green-400',
        testId: 'success-icon'
      }
    };
    return configs[type] || configs.error;
  };

  const config = getTypeConfig();
  const Icon = config.icon;

  return (
    <div
      className={`rounded-md p-4 ${config.bgColor}`}
      role="alert"
      data-testid="notification"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon
            className={`h-5 w-5 ${config.iconColor}`}
            aria-hidden="true"
            data-testid={config.testId}
          />
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm font-medium ${config.textColor}`}>{message}</p>
          {action && (
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <button
                  type="button"
                  className={`rounded-md px-2 py-1.5 text-sm font-medium ${config.textColor} hover:bg-${type}-100 focus:outline-none focus:ring-2 focus:ring-${type}-600 focus:ring-offset-2`}
                  onClick={action.onClick}
                  data-testid="action-button"
                >
                  {action.label}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className={`inline-flex rounded-md p-1.5 ${config.textColor} hover:bg-${type}-100 focus:outline-none focus:ring-2 focus:ring-${type}-600 focus:ring-offset-2`}
              onClick={onClose}
              aria-label="Cerrar"
              data-testid="close-button"
            >
              <span className="sr-only">Cerrar</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ErrorNotification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'warning', 'success']),
  onClose: PropTypes.func.isRequired,
  autoClose: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  })
};

export default ErrorNotification;
