import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { PublicRoute } from '../components/PublicRoute';

// Layouts
import DashboardLayout from '../layouts/DashboardLayout';
import AdminDashboardLayout from '../layouts/AdminDashboardLayout';

// Public Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ResetPassword from '../pages/ResetPassword';
import VerifyEmail from '../pages/VerifyEmail';
import EmailConfirmation from '../pages/EmailConfirmation';

// Dashboard Pages
import Chat from '../pages/dashboard/Chat';
import History from '../pages/dashboard/History';
import Tools from '../pages/dashboard/Tools';
import Settings from '../pages/dashboard/Settings';
import Profile from '../pages/dashboard/Profile';
import Subscription from '../pages/dashboard/Subscription';

// Admin Pages
import Analytics from '../pages/admin/Analytics';
import Users from '../pages/admin/Users';
import Documents from '../pages/admin/Documents';
import Notifications from '../pages/admin/Notifications';
import Reports from '../pages/admin/Reports';
import Ratings from '../pages/admin/Ratings';
import Referrals from '../pages/admin/Referrals';
import Monitoring from '../pages/admin/Monitoring';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
      <Route path="/verify-email" element={<PublicRoute><VerifyEmail /></PublicRoute>} />
      <Route path="/email-confirmation" element={<PublicRoute><EmailConfirmation /></PublicRoute>} />

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Chat />} />
        <Route path="chat" element={<Chat />} />
        <Route path="history" element={<History />} />
        <Route path="tools" element={<Tools />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="subscription" element={<Subscription />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute><AdminDashboardLayout /></ProtectedRoute>}>
        <Route index element={<Analytics />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="users" element={<Users />} />
        <Route path="documents" element={<Documents />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="reports" element={<Reports />} />
        <Route path="ratings" element={<Ratings />} />
        <Route path="referrals" element={<Referrals />} />
        <Route path="monitoring" element={<Monitoring />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
