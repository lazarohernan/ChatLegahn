import PropTypes from 'prop-types';

const Spinner = ({
  size = 'md',
  color = 'text-primary-600',
  center = false,
  margin = '',
  visible = true,
  loadingText = 'Cargando'
}) => {
  if (!visible) return null;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const spinnerContent = (
    <div
      className={`inline-flex items-center gap-2 ${margin}`}
      role="status"
      aria-label={loadingText}
      data-testid="spinner"
    >
      <svg
        className={`animate-spin ${sizeClasses[size]} ${color}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {loadingText && (
        <span className="text-sm font-medium" data-testid="loading-text">
          {loadingText}
        </span>
      )}
    </div>
  );

  if (center) {
    return (
      <div
        className="flex justify-center items-center"
        data-testid="spinner-container"
      >
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  color: PropTypes.string,
  center: PropTypes.bool,
  margin: PropTypes.string,
  visible: PropTypes.bool,
  loadingText: PropTypes.string
};

export default Spinner;
