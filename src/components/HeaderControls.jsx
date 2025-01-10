import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useWalkthrough } from '../context/hooks/useWalkthrough';
import { MoonIcon, SunIcon, BellIcon } from '@heroicons/react/24/outline';
import NotificationsDrawer from './NotificationsDrawer';
import { getThemeClass, lightTheme, darkTheme } from '../config/theme';

const HeaderControls = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { startWalkthrough } = useWalkthrough();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  const handleMarkAllRead = () => {
    console.log('Marcar todas como leídas');
  };

  const handleTutorialClick = (e) => {
    e.preventDefault();
    if (startWalkthrough) {
      localStorage.removeItem('walkthroughCompleted');
      startWalkthrough();
    }
  };

  return (
    <header className={`h-full flex items-center justify-end px-6 ${getThemeClass(isDarkMode, lightTheme.header, darkTheme.header)} ${getThemeClass(isDarkMode, lightTheme.shadow, darkTheme.shadow)}`}>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleTutorialClick}
          className={`text-sm ${getThemeClass(
            isDarkMode,
            `${lightTheme.textSecondary} ${lightTheme.textHover}`,
            `${darkTheme.textSecondary} ${darkTheme.textHover}`
          )}`}
        >
          Ver tutorial
        </button>

        <button
          className={`p-2 rounded-lg transition-colors theme-toggle ${getThemeClass(
            isDarkMode,
            lightTheme.iconButton,
            darkTheme.iconButton
          )}`}
          onClick={toggleTheme}
        >
          {isDarkMode ? (
            <SunIcon className="w-5 h-5" />
          ) : (
            <MoonIcon className="w-5 h-5" />
          )}
        </button>

        <div className="relative" ref={notificationsRef}>
          <button
            onClick={handleNotificationsClick}
            className={`p-2 rounded-lg transition-colors notifications-toggle ${getThemeClass(
              isDarkMode,
              lightTheme.iconButton,
              darkTheme.iconButton
            )}`}
          >
            <BellIcon className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {showNotifications && (
            <NotificationsDrawer 
              onClose={handleCloseNotifications}
              onMarkAllRead={handleMarkAllRead}
            />
          )}
        </div>

        <img
          src="https://ui-avatars.com/api/?name=John+Doe&background=random"
          alt="Profile"
          className={`w-8 h-8 rounded-full ring-2 ${getThemeClass(isDarkMode, lightTheme.border, darkTheme.border)}`}
        />
      </div>
    </header>
  );
};

export default HeaderControls;
