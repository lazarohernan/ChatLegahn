import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboardLayout = () => {
  const { isDarkMode } = useTheme();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'bg-dark-primary text-dark-primary' : 'bg-gray-50 text-gray-900'
    }`}>
      <AdminSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-20' : 'ml-64'
      } ${isDarkMode ? 'bg-dark-primary' : 'bg-gray-50'}`}>
        <div className={`container mx-auto px-6 py-8 ${
          isDarkMode ? 'bg-dark-secondary rounded-lg shadow-lg' : 'bg-white rounded-lg shadow-sm'
        }`}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
