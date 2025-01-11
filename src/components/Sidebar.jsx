import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import MenuItem from './MenuItem';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';
import { useError } from '../context/ErrorContext';
import { useNavigation } from '../hooks/useNavigation';
import { 
  MessageSquare,
  Clock,
  FileText,
  Video,
  Settings,
  LogOut,
  AlertTriangle,
  ChevronLeft,
  BookOpen
} from 'lucide-react';
import ReportProblemModal from './ReportProblemModal';
import LogoutModal from './LogoutModal';
import { getThemeClass, lightTheme, darkTheme } from '../config/theme';

const Sidebar = () => {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const { logout } = useAuth();
  const { showError } = useError();
  const { navigateWithTransition } = useNavigation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeItem, setActiveItem] = useState('chat');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = useMemo(() => [
    { id: 'chat', name: 'Chat', icon: MessageSquare, path: '/dashboard/chat', className: 'chat-section' },
    { id: 'history', name: 'Historial', icon: Clock, path: '/dashboard/history', className: 'history-section' },
    { id: 'tools', name: 'Herramientas', icon: FileText, path: '/dashboard/tools', className: 'tools-section' },
    { id: 'zoom', name: 'Sesiones Zoom', icon: Video, path: '/dashboard/zoom', className: 'zoom-section' },
    { id: 'docs', name: 'Documentación', icon: BookOpen, path: '/dashboard/docs', className: 'docs-section' },
    { id: 'settings', name: 'Configuración', icon: Settings, path: '/dashboard/settings', className: 'settings-section' },
  ], []);

  const handleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const handleReportClick = useCallback(() => {
    setIsReportModalOpen(true);
  }, []);

  const handleReportClose = useCallback(() => {
    setIsReportModalOpen(false);
  }, []);

  const handleNavigate = useCallback((path) => {
    navigateWithTransition(path);
  }, [navigateWithTransition]);

  const handleLogout = useCallback(async () => {
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
  }, [logout, showError]);

  useEffect(() => {
    const currentPath = location.pathname.split('/').pop();
    setActiveItem(currentPath || 'chat');
  }, [location]);

  return (
    <div className={`h-screen flex flex-col border-r relative transition-all duration-300 ${
      getThemeClass(isDarkMode, 
        `${lightTheme.sidebar} ${lightTheme.border}`, 
        `${darkTheme.sidebar} ${darkTheme.border}`
      )
    } ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <button
        onClick={handleCollapse}
        className={`absolute -right-3 top-6 p-1.5 rounded-full border ${getThemeClass(isDarkMode, lightTheme.shadowMd, darkTheme.shadowMd)} z-10 transition-colors ${
          getThemeClass(isDarkMode,
            `${lightTheme.primary} ${lightTheme.border} ${lightTheme.hover}`,
            `${darkTheme.primary} ${darkTheme.border} ${darkTheme.hover}`
          )
        }`}
      >
        <ChevronLeft className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''} ${
          getThemeClass(isDarkMode, lightTheme.textTertiary, darkTheme.textTertiary)
        }`} />
      </button>

      <div className="p-4">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} mb-8 px-2`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            getThemeClass(isDarkMode, lightTheme.logo, darkTheme.logo)
          }`}>
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className={`text-xl font-semibold transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'} ${
            getThemeClass(isDarkMode, lightTheme.logoText, darkTheme.logoText)
          }`}>
            {!isCollapsed && 'LegalAI'}
          </span>
        </div>
        
        <nav className="space-y-1.5">
          {menuItems.map(item => (
            <MenuItem 
              key={item.id} 
              item={item} 
              isCollapsed={isCollapsed}
              activeItem={activeItem}
              isDarkMode={isDarkMode}
              onNavigate={handleNavigate}
            />
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 space-y-2">
        <button
          onClick={() => setShowLogoutModal(true)}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} ${
            getThemeClass(isDarkMode,
              `${lightTheme.iconButton}`,
              `${darkTheme.iconButton}`
            )
          }`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            {!isCollapsed && 'Cerrar Sesión'}
          </span>
        </button>

        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          isLoading={isLoggingOut}
          onConfirm={handleLogout}
        />
        <button 
          onClick={handleReportClick}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-2 text-xs rounded-lg transition-colors ${
            getThemeClass(isDarkMode,
              `${lightTheme.textTertiary} hover:${lightTheme.textSecondary}`,
              `${darkTheme.textTertiary} hover:${darkTheme.textSecondary}`
            )
          }`}
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            {!isCollapsed && 'Reportar Problema'}
          </span>
        </button>
      </div>

      <ReportProblemModal 
        isOpen={isReportModalOpen}
        onClose={handleReportClose}
      />
    </div>
  );
};

export default Sidebar;
