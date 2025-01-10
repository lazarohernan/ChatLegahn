import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabaseService } from '../services/supabaseService';
import { useError } from '../context/ErrorContext';
import LoadingButton from '../components/LoadingButton';

const EmailConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showError } = useError();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const token = searchParams.get('token');
        const type = searchParams.get('type');

        if (!token || type !== 'signup') {
          throw new Error('Link de confirmación inválido');
        }

        // Confirmar el correo con Supabase
        const { error } = await supabaseService.supabase.auth.verifyOtp({
          token,
          type: 'signup'
        });

        if (error) throw error;

        setVerified(true);
        showError('Correo electrónico verificado correctamente', 'success');
      } catch (error) {
        console.error('Error confirmando email:', error);
        showError(
          error.message || 'Error al confirmar el correo electrónico',
          'error'
        );
      } finally {
        setLoading(false);
      }
    };

    confirmEmail();
  }, [searchParams, showError]);

  const handleContinue = () => {
    navigate('/login', {
      state: {
        message: 'Tu cuenta ha sido verificada. Ya puedes iniciar sesión.'
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Confirmación de Correo
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {loading
              ? 'Verificando tu correo electrónico...'
              : verified
              ? '¡Tu correo ha sido verificado!'
              : 'Ha ocurrido un error al verificar tu correo'}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {loading ? (
            <div className="flex justify-center">
              <LoadingButton
                loading={true}
                loadingText="Verificando..."
                className="w-full"
              >
                Verificar
              </LoadingButton>
            </div>
          ) : verified ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <svg
                  className="h-16 w-16 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <button
                onClick={handleContinue}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continuar al inicio de sesión
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <svg
                  className="h-16 w-16 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <button
                onClick={() => navigate('/register')}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Volver al registro
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;
