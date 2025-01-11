import { lazy, Suspense } from 'react';
import { createHashRouter, RouterProvider, createRoutesFromElements, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ErrorProvider } from './context/ErrorContext';
import { MonitoringProvider } from './context/MonitoringContext';
import { WalkthroughProvider } from './context/WalkthroughContext';
import { NavigationProvider } from './context/NavigationContext';
import DashboardLayout from './layouts/DashboardLayout';
import AdminDashboardLayout from './layouts/AdminDashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Spinner from './components/Spinner';

// Lazy loaded components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const EmailConfirmation = lazy(() => import('./pages/EmailConfirmation'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));

// Dashboard pages
const Chat = lazy(() => import('./pages/dashboard/Chat'));
const History = lazy(() => import('./pages/dashboard/History'));
const Tools = lazy(() => import('./pages/dashboard/Tools'));
const Zoom = lazy(() => import('./pages/dashboard/Zoom'));
const Docs = lazy(() => import('./pages/dashboard/Docs'));
const Settings = lazy(() => import('./pages/dashboard/Settings'));
const Profile = lazy(() => import('./pages/dashboard/Profile'));
const Subscription = lazy(() => import('./pages/dashboard/Subscription'));

// Admin pages
const Analytics = lazy(() => import('./pages/admin/Analytics'));
const Users = lazy(() => import('./pages/admin/Users'));
const Notifications = lazy(() => import('./pages/admin/Notifications'));
const Reports = lazy(() => import('./pages/admin/Reports'));
const Documents = lazy(() => import('./pages/admin/Documents'));
const Ratings = lazy(() => import('./pages/admin/Ratings'));
const Referrals = lazy(() => import('./pages/admin/Referrals'));
const Monitoring = lazy(() => import('./pages/admin/Monitoring'));

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* Rutas públicas */}
      <Route
        element={
          <PublicRoute>
            <Outlet />
          </PublicRoute>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Spinner size="lg" center />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="login"
          element={
            <Suspense fallback={<Spinner size="lg" center />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="register"
          element={
            <Suspense fallback={<Spinner size="lg" center />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="confirm-email"
          element={
            <Suspense fallback={<Spinner size="lg" center />}>
              <EmailConfirmation />
            </Suspense>
          }
        />
        <Route
          path="reset-password"
          element={
            <Suspense fallback={<Spinner size="lg" center />}>
              <ResetPassword />
            </Suspense>
          }
        />
        <Route
          path="verify-email"
          element={
            <Suspense fallback={<Spinner size="lg" center />}>
              <VerifyEmail />
            </Suspense>
          }
        />
      </Route>

      {/* Rutas protegidas */}
      <Route
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        {/* Rutas del dashboard */}
        <Route path="dashboard" element={<DashboardLayout />}>
          {/* Redirige /dashboard a /dashboard/chat */}
          <Route index element={<Navigate to="/dashboard/chat" replace />} />
          <Route
            path="chat"
            element={
              <Suspense fallback={<Spinner size="lg" center />}>
                <Chat />
              </Suspense>
            }
          />
          <Route
            path="history"
            element={
              <Suspense fallback={<Spinner size="lg" center />}>
                <History />
              </Suspense>
            }
          />
          <Route
            path="tools"
            element={
              <Suspense fallback={<Spinner size="lg" center />}>
                <Tools />
              </Suspense>
            }
          />
          <Route
            path="zoom"
            element={
              <Suspense fallback={<Spinner size="lg" center />}>
                <Zoom />
              </Suspense>
            }
          />
          <Route
            path="docs/*"
            element={
              <Suspense fallback={<Spinner size="lg" center />}>
                <Docs />
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense fallback={<Spinner size="lg" center />}>
                <Settings />
              </Suspense>
            }
          />
          <Route
            path="profile"
            element={
              <Suspense fallback={<Spinner size="lg" center />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="subscription"
            element={
              <Suspense fallback={<Spinner size="lg" center />}>
                <Subscription />
              </Suspense>
            }
          />
        </Route>

        {/* Rutas de administrador */}
        <Route path="admin" element={<AdminDashboardLayout />}>
          {/* Redirige /admin a /admin/analytics */}
          <Route index element={<Navigate to="/admin/analytics" replace />} />
          <Route
            path="analytics"
            element={
              <Suspense fallback={<Spinner size="lg" center />}>
                <Analytics />
              </Suspense>
            }
          />
          <Route
            path="users"
            element={
              <Suspense fallback={<Spinner size="lg" center />}>
                <Users />
              </Suspense>
            }
          />
          <Route
            path="notifications"
            element={
              <Suspense fallback={<Spinner size="lg" center />}>
                <Notifications />
              </Suspense>
            }
          />
          <Route
            path="reports"
            element={
              <Suspense fallback={<Spinner size="lg" center />}>
                <Reports />
              </Suspense>
            }
          />
          <Route
            path="documents/*"
            element={
              <Suspense fallback={<Spinner size="lg" center />}>
                <Documents />
              </Suspense>
            }
          />
          <Route
            path="ratings"
            element={
              <Suspense fallback={<Spinner size="lg" center />}>
                <Ratings />
              </Suspense>
            }
          />
          <Route
            path="referrals"
            element={
              <Suspense fallback={<Spinner size="lg" center />}>
                <Referrals />
              </Suspense>
            }
          />
          <Route
            path="monitoring"
            element={
              <Suspense fallback={<Spinner size="lg" center />}>
                <Monitoring />
              </Suspense>
            }
          />
        </Route>
      </Route>

      {/* Ruta para manejar URLs no encontradas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  ),
  {
    basename: '/', // Asegura que las rutas hash funcionen correctamente
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

function App() {
  return (
    <ThemeProvider>
      <ErrorProvider>
        <AuthProvider>
          <MonitoringProvider>
            <WalkthroughProvider>
              <NavigationProvider>
                <RouterProvider router={router} />
              </NavigationProvider>
            </WalkthroughProvider>
          </MonitoringProvider>
        </AuthProvider>
      </ErrorProvider>
    </ThemeProvider>
  );
}

export default App;
