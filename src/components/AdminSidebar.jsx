import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';
import { useError } from '../context/ErrorContext';
import PropTypes from 'prop-types';
import { 
  BarChart2, 
  Users, 
  Bell, 
  AlertTriangle,
  FileText,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  LogOut,
  Star,
  Share2,
  Activity
} from 'lucide-react';
import LogoutModal from './LogoutModal';

const AdminSidebar = ({ isCollapsed, onToggle }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const { showError } = useError();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const links = [
    {
      to: '/admin/analytics',
      icon: BarChart2,
      text: 'Analíticas'
    },
    {
      to: '/admin/users',
      icon: Users,
      text: 'Usuarios'
    },
    {
      to: '/admin/notifications',
      icon: Bell,
      text: 'Notificaciones'
    },
    {
      to: '/admin/reports',
      icon: AlertTriangle,
      text: 'Reportes'
    },
    {
      to: '/admin/documents',
      icon: FileText,
      text: 'Documentos'
    },
    {
      to: '/admin/ratings',
      icon: Star,
      text: 'Evaluaciones'
    },
    {
      to: '/admin/referrals',
      icon: Share2,
      text: 'Referidos'
    },
    {
      to: '/admin/monitoring',
      icon: Activity,
      text: 'Monitoreo'
    }
  ];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout(); // El hook useAuth maneja la redirección internamente
    } catch (error) {
      showError('Error al cerrar sesión', error.message);
      console.error('Error al cerrar sesión:', error);
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  return (
    <aside className={`fixed top-0 left-0 h-screen transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    } ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-r ${
      isDarkMode ? 'border-gray-800' : 'border-gray-200'
    }`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && (
            <span className="text-xl font-bold">Admin</span>
          )}
          <button
            onClick={onToggle}
            className={`p-2 rounded-lg ${
              isDarkMode 
                ? 'hover:bg-gray-800' 
                : 'hover:bg-gray-100'
            }`}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-3 rounded-lg
                      ${isCollapsed ? 'justify-center' : ''}
                      ${isActive
                        ? isDarkMode
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-900'
                        : isDarkMode
                          ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {!isCollapsed && (
                      <span>{link.text}</span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 space-y-2">
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
              isDarkMode 
                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            } ${isCollapsed ? 'justify-center' : ''}`}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            {!isCollapsed && (
              <span>{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
            )}
          </button>

          <button
            onClick={() => setShowLogoutModal(true)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
              isDarkMode 
                ? 'text-red-400 hover:text-red-300 hover:bg-gray-800' 
                : 'text-red-600 hover:text-red-700 hover:bg-gray-100'
            } ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && (
              <span>Cerrar Sesión</span>
            )}
          </button>
        </div>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        isLoading={isLoggingOut}
        onConfirm={handleLogout}
      />
    </aside>
  );
};

AdminSidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default AdminSidebar;
