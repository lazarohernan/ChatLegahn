import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Spinner from '../components/Spinner';

const VerifyEmail = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, error

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        if (!token) {
          setStatus('error');
          return;
        }

        // Simulación de verificación
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus('success');
      } catch (error) {
        console.error('Error:', error);
        setStatus('error');
      }
    };

    verifyEmail();
  }, [searchParams]);

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <div className="text-center">
            <Spinner size="lg" center />
            <p className={`mt-4 ${isDarkMode ? 'text-dark-primary' : 'text-gray-900'}`}>
              Verificando tu correo electrónico...
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center space-y-4">
            <h3 className={`text-xl font-semibold ${
              isDarkMode ? 'text-dark-primary' : 'text-gray-900'
            }`}>
              ¡Email Verificado!
            </h3>
            <p className={isDarkMode ? 'text-dark-secondary' : 'text-gray-600'}>
              Tu correo electrónico ha sido verificado exitosamente.
            </p>
            <button
              onClick={() => navigate('/login')}
              className={`w-full py-2 px-4 rounded-md ${
                isDarkMode 
                  ? 'bg-primary text-white hover:bg-primary-dark' 
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              Ir al Login
            </button>
          </div>
        );

      case 'error':
        return (
          <div className="text-center space-y-4">
            <h3 className={`text-xl font-semibold ${
              isDarkMode ? 'text-red-400' : 'text-red-600'
            }`}>
              Error de Verificación
            </h3>
            <p className={isDarkMode ? 'text-dark-secondary' : 'text-gray-600'}>
              No se pudo verificar tu correo electrónico. El enlace podría haber expirado.
            </p>
            <button
              onClick={() => navigate('/login')}
              className={`w-full py-2 px-4 rounded-md ${
                isDarkMode 
                  ? 'bg-primary text-white hover:bg-primary-dark' 
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              Volver al Login
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDarkMode ? 'bg-dark-primary' : 'bg-gray-50'
    }`}>
      <div className={`max-w-md w-full p-6 space-y-8 ${
        isDarkMode ? 'bg-dark-secondary' : 'bg-white'
      } rounded-lg shadow-lg`}>
        <div>
          <h2 className={`text-3xl font-bold text-center ${
            isDarkMode ? 'text-dark-primary' : 'text-gray-900'
          }`}>
            Verificación de Email
          </h2>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default VerifyEmail;
