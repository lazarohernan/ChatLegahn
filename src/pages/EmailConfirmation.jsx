import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabaseService } from '@services/supabaseService';
import { useError } from '@context/ErrorContext';
import LoadingButton from '@components/LoadingButton';

const EmailConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showError } = useError();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        const email = searchParams.get('email');

        if (!token || !email) {
          throw new Error('Token o email no proporcionados');
        }

        await supabaseService.auth.verifyEmail(token, email);
        setIsVerifying(false);
      } catch (error) {
        showError(error.message);
        setIsVerifying(false);
      }
    };

    verifyEmail();
  }, [searchParams, showError]);

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Verificación de Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {isVerifying
              ? 'Verificando tu email...'
              : 'Tu email ha sido verificado exitosamente'}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <LoadingButton
            onClick={handleContinue}
            loading={isVerifying}
            disabled={isVerifying}
            className="w-full"
          >
            Continuar al Login
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;
