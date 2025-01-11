import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import LoadingButton from '../components/LoadingButton';

const ResetPassword = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Lógica para enviar correo de reset
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación
      setSuccess(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
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
            Restablecer Contraseña
          </h2>
          <p className={`mt-2 text-center ${
            isDarkMode ? 'text-dark-secondary' : 'text-gray-600'
          }`}>
            Ingresa tu correo electrónico para recibir instrucciones
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <p className={`${isDarkMode ? 'text-dark-primary' : 'text-gray-900'}`}>
              Se han enviado las instrucciones a tu correo electrónico.
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
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className={`block text-sm font-medium ${
                  isDarkMode ? 'text-dark-primary' : 'text-gray-700'
                }`}
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${
                  isDarkMode 
                    ? 'bg-dark-primary border-dark-border text-dark-primary' 
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>

            <LoadingButton
              type="submit"
              loading={loading}
              className="w-full"
              loadingText="Enviando..."
            >
              Enviar Instrucciones
            </LoadingButton>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className={`text-sm ${
                  isDarkMode ? 'text-primary hover:text-primary-light' : 'text-primary hover:text-primary-dark'
                }`}
              >
                Volver al Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
