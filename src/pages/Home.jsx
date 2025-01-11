import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../hooks/useNavigation';

const Home = () => {
  const navigate = useNavigate();
  const { navigate: navigationNavigate } = useNavigation();

  const handleGetStarted = () => {
    navigate('/login');
    navigationNavigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Bienvenido a LegalAI Chat
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Tu asistente legal inteligente, disponible 24/7 para ayudarte con consultas y documentación legal.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition hover:scale-105"
          >
            Comenzar Ahora
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Consultas Legales
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Obtén respuestas inmediatas a tus dudas legales con nuestro asistente AI especializado.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Documentación
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Genera y revisa documentos legales de manera eficiente con ayuda de inteligencia artificial.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Disponibilidad 24/7
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Accede a asistencia legal en cualquier momento, desde cualquier lugar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
