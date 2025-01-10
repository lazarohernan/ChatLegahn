import { useTheme } from '../context/ThemeContext';
import { getThemeClass } from '../config/theme';
import { useNavigation } from '../hooks/useNavigation';

const Navbar = () => {
  const { isDarkMode } = useTheme();
  const { navigateWithTransition } = useNavigation();

  return (
    <nav className={`fixed w-full z-50 ${
      getThemeClass(isDarkMode,
        'bg-gray-900 border-gray-700',
        'bg-white border-gray-200'
      )
    } border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={() => navigateWithTransition('/')}
                className={`text-xl font-bold ${
                  getThemeClass(isDarkMode,
                    'text-white',
                    'text-gray-900'
                  )
                }`}
              >
                LegalAI Chat
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateWithTransition('/login')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                getThemeClass(isDarkMode,
                  'text-gray-300 hover:text-white',
                  'text-gray-700 hover:text-gray-900'
                )
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => navigateWithTransition('/register')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                getThemeClass(isDarkMode,
                  'bg-blue-500 text-white hover:bg-blue-600',
                  'bg-blue-600 text-white hover:bg-blue-700'
                )
              }`}
            >
              Crear Cuenta
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
