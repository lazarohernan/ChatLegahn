import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authBg from '../assets/auth-bg.jpg';
import { useAuth } from '../hooks/useAuth';
import { useError } from '../context/ErrorContext';
import LoadingButton from '../components/LoadingButton';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, resetPassword } = useAuth();
  const { showError } = useError();
  const [loading, setLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.email) {
      showError('El correo electrónico es requerido', 'validation');
      return false;
    }
    if (!formData.password && !isResetting) {
      showError('La contraseña es requerida', 'validation');
      return false;
    }
    return true;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      showError('Ingresa tu correo electrónico para restablecer la contraseña', 'validation');
      return;
    }

    try {
      setIsResetting(true);
      await resetPassword(formData.email);
      showError('Se ha enviado un enlace para restablecer tu contraseña', 'success');
    } catch (error) {
      console.error('Reset password error:', error);
      showError(error.message || 'Error al enviar el correo de restablecimiento', 'error');
    } finally {
      setIsResetting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const userData = await login(formData.email, formData.password);
      
      if (userData) {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Error al iniciar sesión';
      
      // Manejar errores específicos de Supabase
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Credenciales inválidas';
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Por favor confirma tu correo electrónico';
      } else if (error.message.includes('Too many requests')) {
        errorMessage = 'Demasiados intentos. Por favor espera unos minutos';
      }
      
      showError(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado izquierdo - Imagen */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${authBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">LegalAI Chat</h2>
              <p className="text-xl text-white/80">Tu asistente legal inteligente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lado derecho - Formulario */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm">
          <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Iniciar Sesión
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <button
                onClick={() => navigate('/register')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Regístrate aquí
              </button>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember"
                      type="checkbox"
                      checked={formData.remember}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Recordarme
                    </label>
                  </div>

                  <div className="text-sm">
                    <button
                      type="button"
                      onClick={handleResetPassword}
                      disabled={isResetting}
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      {isResetting ? 'Enviando...' : '¿Olvidaste tu contraseña?'}
                    </button>
                  </div>
                </div>

                <div>
                  <LoadingButton
                    type="submit"
                    loading={loading}
                    loadingText="Iniciando sesión..."
                    className="w-full"
                  >
                    Iniciar Sesión
                  </LoadingButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
