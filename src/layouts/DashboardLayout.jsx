import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import HeaderControls from '../components/HeaderControls';
import { useTheme } from '../context/ThemeContext';
import { getThemeClass, lightTheme, darkTheme } from '../config/theme';

const DashboardLayout = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`flex h-screen ${getThemeClass(isDarkMode, lightTheme.secondary, darkTheme.primary)}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-shrink-0 h-16">
          <HeaderControls />
        </div>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
