import PropTypes from 'prop-types';

const LoadingButton = ({
  onClick,
  children,
  type = 'button',
  disabled = false,
  loading = false,
  className = ''
}) => {
  const baseClasses = 'flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold shadow-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
  const primaryClasses = 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600';
  const disabledClasses = 'disabled:opacity-50 disabled:cursor-not-allowed';

  const handleClick = (e) => {
    if (loading || disabled) return;
    onClick?.(e);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${primaryClasses} ${disabledClasses} ${className}`}
      data-testid="loading-button"
    >
      {loading && (
        <div className="w-4 h-4 text-current" data-testid="spinner">
          <svg
            className="animate-spin text-current"
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
        </div>
      )}
      {loading ? <span>Cargando...</span> : children}
    </button>
  );
};

LoadingButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string
};

export default LoadingButton;
