import PropTypes from 'prop-types';
import { useTheme } from '../context/ThemeContext';
import { getThemeClass, lightTheme, darkTheme } from '../config/theme';
import LoadingButton from './LoadingButton';
import { XMarkIcon } from '@heroicons/react/24/outline';

const LogoutModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  const { isDarkMode } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

      {/* Modal */}
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className={`relative transform overflow-hidden rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 ${
          getThemeClass(isDarkMode,
            lightTheme.primary,
            darkTheme.primary
          )
        }`}>
          {/* Close button */}
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className={`rounded-md hover:opacity-75 focus:outline-none ${
                getThemeClass(isDarkMode,
                  lightTheme.textSecondary,
                  darkTheme.textSecondary
                )
              }`}
              onClick={onClose}
            >
              <span className="sr-only">Cerrar</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className={`text-xl font-semibold leading-6 ${
                getThemeClass(isDarkMode,
                  lightTheme.textPrimary,
                  darkTheme.textPrimary
                )
              }`}>
                Confirmar cierre de sesión
              </h3>
              <div className="mt-2">
                <p className={`text-sm ${
                  getThemeClass(isDarkMode,
                    lightTheme.textSecondary,
                    darkTheme.textSecondary
                  )
                }`}>
                  ¿Estás seguro de que deseas cerrar sesión? Tendrás que volver a iniciar sesión para acceder a tu cuenta.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
            <LoadingButton
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (!isLoading) {
                  onConfirm();
                }
              }}
              loading={isLoading}
              loadingText="Cerrando sesión..."
              className="w-full sm:w-auto px-4"
              disabled={isLoading}
            >
              Cerrar sesión
            </LoadingButton>
            <button
              type="button"
              className={`mt-3 sm:mt-0 w-full sm:w-auto rounded-lg px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ${
                getThemeClass(isDarkMode,
                  'ring-gray-300 hover:bg-gray-50',
                  'ring-gray-600 hover:bg-gray-800'
                )
              }`}
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

LogoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default LogoutModal;
