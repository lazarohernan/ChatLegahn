import PropTypes from 'prop-types';
import { useTheme } from '../context/ThemeContext';
import { XMarkIcon, CheckIcon, TrashIcon } from '@heroicons/react/24/outline';
import { getThemeClass, lightTheme, darkTheme } from '../config/theme';

const NotificationsDrawer = ({ onClose, onMarkAllRead }) => {
  const { isDarkMode } = useTheme();

  const notifications = [
    {
      id: 1,
      title: 'Nueva sesión de Zoom',
      message: 'Se ha programado una nueva sesión sobre Derecho Laboral para mañana.',
      time: '2 min',
      unread: true,
    },
    {
      id: 2,
      title: 'Actualización de documento',
      message: 'El documento "Guía de Derecho Civil" ha sido actualizado.',
      time: '1 hora',
      unread: true,
    },
    {
      id: 3,
      title: 'Recordatorio',
      message: 'Tienes una consulta pendiente sobre derecho mercantil.',
      time: '3 horas',
      unread: false,
    },
  ];

  return (
    <div className="absolute right-0 mt-2 w-96 overflow-hidden z-50">
      {/* Panel con efecto glass */}
      <div className={`${getThemeClass(isDarkMode, lightTheme.backdrop, darkTheme.backdrop)} rounded-lg ${
        getThemeClass(isDarkMode, lightTheme.shadowMd, darkTheme.shadowMd)
      } border ${getThemeClass(isDarkMode, lightTheme.drawer, darkTheme.drawer)}`}>
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between ${
          getThemeClass(isDarkMode, lightTheme.drawerHeader, darkTheme.drawerHeader)
        }`}>
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${getThemeClass(
              isDarkMode,
              lightTheme.textPrimary,
              darkTheme.textPrimary
            )}`}>Notificaciones</span>
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              2
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className={`text-sm ${getThemeClass(
                isDarkMode,
                `${lightTheme.textSecondary} ${lightTheme.textHover}`,
                `${darkTheme.textSecondary} ${darkTheme.textHover}`
              )}`}
            >
              Marcar como leídas
            </button>
            <button
              onClick={onClose}
              className={getThemeClass(
                isDarkMode,
                lightTheme.iconButton,
                darkTheme.iconButton
              )}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b ${getThemeClass(
                isDarkMode,
                `${lightTheme.notification} ${notification.unread ? lightTheme.notificationUnread : ''}`,
                `${darkTheme.notification} ${notification.unread ? darkTheme.notificationUnread : ''}`
              )}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h4 className={`font-medium ${getThemeClass(
                    isDarkMode,
                    lightTheme.textPrimary,
                    darkTheme.textPrimary
                  )}`}>
                    {notification.title}
                  </h4>
                  <p className={`text-sm mt-1 ${getThemeClass(
                    isDarkMode,
                    lightTheme.textSecondary,
                    darkTheme.textSecondary
                  )}`}>
                    {notification.message}
                  </p>
                  <span className={`text-xs mt-2 block ${getThemeClass(
                    isDarkMode,
                    lightTheme.textTertiary,
                    darkTheme.textTertiary
                  )}`}>
                    {notification.time}
                  </span>
                </div>
                {notification.unread && (
                  <button className="text-blue-500 hover:text-blue-600">
                    <CheckIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t ${getThemeClass(
          isDarkMode,
          lightTheme.drawerHeader,
          darkTheme.drawerHeader
        )}`}>
          <button
            className={`w-full flex items-center justify-center gap-2 text-sm ${getThemeClass(
              isDarkMode,
              lightTheme.iconButton,
              darkTheme.iconButton
            )}`}
          >
            <TrashIcon className="w-4 h-4" />
            Borrar todas las notificaciones
          </button>
        </div>
      </div>
    </div>
  );
};

NotificationsDrawer.propTypes = {
  onClose: PropTypes.func.isRequired,
  onMarkAllRead: PropTypes.func.isRequired
};

export default NotificationsDrawer;
