import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboardLayout = () => {
  const { isDarkMode } = useTheme();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <AdminSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-20' : 'ml-64'
      }`}>
        <div className="container mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
