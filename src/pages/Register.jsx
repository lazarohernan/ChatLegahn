import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authBg from '../assets/auth-bg.jpg';
import { useFormValidation } from '../hooks/useFormValidation';
import { useAuth } from '../hooks/useAuth';
import { useError } from '../context/ErrorContext';
import PasswordStrength from '../components/PasswordStrength';
import LoadingButton from '../components/LoadingButton';

const validationRules = {
  name: { required: true, minLength: 3 },
  email: { required: true, email: true },
  password: { required: true, minLength: 8 },
  confirmPassword: { required: true, match: 'password' },
  terms: { required: true }
};

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showError } = useError();
  const [loading, setLoading] = useState(false);
  const {
    values,
    errors,
    isValid,
    handleChange
  } = useFormValidation(
    {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false
    },
    validationRules
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      showError('Por favor, corrija los errores del formulario', 'validation');
      return;
    }

    try {
      setLoading(true);
      await register({
        name: values.name,
        email: values.email,
        password: values.password
      });
      
      // Mostrar mensaje de éxito y redirigir a confirmación
      showError('Se ha enviado un correo de confirmación. Por favor, verifica tu bandeja de entrada.', 'success');
      navigate('/login', { 
        state: { 
          message: 'Por favor, verifica tu correo electrónico para completar el registro.' 
        }
      });
    } catch (error) {
      console.error('Register error:', error);
      let errorMessage = 'Error al crear la cuenta';
      
      // Manejar errores específicos de Supabase
      if (error.message.includes('Email already registered')) {
        errorMessage = 'Este correo electrónico ya está registrado';
      } else if (error.message.includes('Password should be')) {
        errorMessage = 'La contraseña debe tener al menos 8 caracteres';
      } else if (error.message.includes('Invalid email')) {
        errorMessage = 'El correo electrónico no es válido';
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
              <p className="text-xl text-white/80">Únete a la comunidad legal inteligente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lado derecho - Formulario */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm">
          <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Crear cuenta
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <button
                onClick={() => navigate('/login')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre completo
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={values.name}
                      onChange={handleChange}
                      className={`block w-full appearance-none rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 sm:text-sm ${
                        errors.name 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-300 focus:border-blue-500'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                    )}
                  </div>
                </div>

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
                      value={values.email}
                      onChange={handleChange}
                      className={`block w-full appearance-none rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 sm:text-sm ${
                        errors.email 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-300 focus:border-blue-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                    )}
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
                      autoComplete="new-password"
                      required
                      value={values.password}
                      onChange={handleChange}
                      className={`block w-full appearance-none rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 sm:text-sm ${
                        errors.password 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-300 focus:border-blue-500'
                      }`}
                    />
                    {errors.password && (
                      <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                    )}
                    <PasswordStrength password={values.password} />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirmar contraseña
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={values.confirmPassword}
                      onChange={handleChange}
                      className={`block w-full appearance-none rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 sm:text-sm ${
                        errors.confirmPassword 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-300 focus:border-blue-500'
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    checked={values.terms}
                    onChange={handleChange}
                    className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
                      errors.terms ? 'border-red-300' : ''
                    }`}
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    Acepto los{' '}
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      términos y condiciones
                    </a>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-xs text-red-600">{errors.terms}</p>
                )}

                <div>
                  <LoadingButton
                    type="submit"
                    loading={loading}
                    disabled={!isValid}
                    loadingText="Creando cuenta..."
                    className="w-full"
                  >
                    Crear cuenta
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

export default Register;
