import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import HeaderControls from '../components/HeaderControls';
import { useTheme } from '../context/ThemeContext';

const DashboardLayout = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-dark-primary text-dark-primary' : 'bg-white text-gray-900'}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className={`flex-shrink-0 h-16 ${isDarkMode ? 'bg-dark-secondary' : 'bg-white border-b border-gray-200'}`}>
          <HeaderControls />
        </div>
        <main className={`flex-1 overflow-auto p-6 ${isDarkMode ? 'bg-dark-primary' : 'bg-gray-50'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
