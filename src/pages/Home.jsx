import Navbar from '../components/Navbar';
import { 
  ChatBubbleLeftRightIcon, 
  DocumentTextIcon, 
  ClockIcon, 
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import { getThemeClass } from '../config/theme';
import { useNavigation } from '../hooks/useNavigation';

const features = [
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Chat Legal Inteligente',
    description: 'Obtén respuestas instantáneas a tus consultas legales con nuestra IA especializada.'
  },
  {
    icon: DocumentTextIcon,
    title: 'Generación de Documentos',
    description: 'Crea documentos legales personalizados con asistencia inteligente.'
  },
  {
    icon: ClockIcon,
    title: 'Disponibilidad 24/7',
    description: 'Accede a asesoramiento legal en cualquier momento, desde cualquier lugar.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Seguridad Garantizada',
    description: 'Tus datos están protegidos con los más altos estándares de seguridad.'
  }
];

const plans = [
  {
    name: 'Básico',
    price: '29',
    features: [
      'Consultas ilimitadas',
      'Generación básica de documentos',
      'Historial de consultas',
      'Soporte por email'
    ]
  },
  {
    name: 'Profesional',
    price: '79',
    popular: true,
    features: [
      'Todo lo del plan Básico',
      'Generación avanzada de documentos',
      'Sesiones de video con abogados',
      'Soporte prioritario 24/7',
      'Análisis legal detallado'
    ]
  },
  {
    name: 'Empresarial',
    price: '199',
    features: [
      'Todo lo del plan Profesional',
      'API personalizada',
      'Gestor de cuenta dedicado',
      'Personalización de documentos',
      'Integración con sistemas existentes'
    ]
  }
];

const Home = () => {
  const { navigateWithTransition } = useNavigation();
  const { isDarkMode } = useTheme();

  const handleNavigation = (path) => {
    navigateWithTransition(path, { replace: false });
  };

  return (
    <div className={`min-h-screen ${
      getThemeClass(isDarkMode,
        'bg-gray-900 text-white',
        'bg-white text-gray-900'
      )
    }`}>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                  <span className="block">LegalAI Chat</span>
                  <span className={`block ${
                    getThemeClass(isDarkMode,
                      'text-blue-400',
                      'text-blue-600'
                    )
                  }`}>Inteligencia Legal a tu Alcance</span>
                </h1>
                <p className={`mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl ${
                  getThemeClass(isDarkMode,
                    'text-gray-300',
                    'text-gray-500'
                  )
                }`}>
                  Obtén respuestas instantáneas, análisis legal y asistencia en la redacción de documentos con nuestro chat impulsado por IA.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => handleNavigation('/register')}
                      className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md md:py-4 md:text-lg md:px-10 ${
                        getThemeClass(isDarkMode,
                          'bg-blue-500 text-white hover:bg-blue-600',
                          'bg-blue-600 text-white hover:bg-blue-700'
                        )
                      }`}
                    >
                      Crear Cuenta
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => handleNavigation('/login')}
                      className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md md:py-4 md:text-lg md:px-10 ${
                        getThemeClass(isDarkMode,
                          'bg-gray-800 text-white hover:bg-gray-700',
                          'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        )
                      }`}
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className={`py-12 ${
        getThemeClass(isDarkMode,
          'bg-gray-800',
          'bg-gray-50'
        )
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-3xl font-extrabold sm:text-4xl ${
              getThemeClass(isDarkMode,
                'text-white',
                'text-gray-900'
              )
            }`}>
              Características Principales
            </h2>
            <p className={`mt-4 text-xl ${
              getThemeClass(isDarkMode,
                'text-gray-300',
                'text-gray-500'
              )
            }`}>
              Todo lo que necesitas para tu práctica legal en una sola plataforma
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className={`flow-root rounded-lg px-6 pb-8 ${
                    getThemeClass(isDarkMode,
                      'bg-gray-900',
                      'bg-white'
                    )
                  }`}>
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className={`mt-8 text-lg font-medium tracking-tight ${
                        getThemeClass(isDarkMode,
                          'text-white',
                          'text-gray-900'
                        )
                      }`}>
                        {feature.title}
                      </h3>
                      <p className={`mt-5 text-base ${
                        getThemeClass(isDarkMode,
                          'text-gray-400',
                          'text-gray-500'
                        )
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className={`py-12 ${
        getThemeClass(isDarkMode,
          'bg-gray-900',
          'bg-white'
        )
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-3xl font-extrabold sm:text-4xl ${
              getThemeClass(isDarkMode,
                'text-white',
                'text-gray-900'
              )
            }`}>
              Planes y Precios
            </h2>
            <p className={`mt-4 text-xl ${
              getThemeClass(isDarkMode,
                'text-gray-300',
                'text-gray-500'
              )
            }`}>
              Elige el plan que mejor se adapte a tus necesidades
            </p>
          </div>

          <div className="mt-10 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <div key={index} className={`relative rounded-lg p-6 flex flex-col ${
                getThemeClass(isDarkMode,
                  'bg-gray-800 shadow-xl',
                  'bg-white shadow-lg'
                )
              }`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 -mr-1 -mt-1 w-36 bg-blue-500 text-white text-sm text-center transform rotate-45 origin-bottom-left">
                    Popular
                  </div>
                )}
                <h3 className={`text-xl font-semibold ${
                  getThemeClass(isDarkMode,
                    'text-white',
                    'text-gray-900'
                  )
                }`}>{plan.name}</h3>
                <p className="mt-4">
                  <span className={`text-4xl font-extrabold ${
                    getThemeClass(isDarkMode,
                      'text-white',
                      'text-gray-900'
                    )
                  }`}>${plan.price}</span>
                  <span className={`text-base font-medium ${
                    getThemeClass(isDarkMode,
                      'text-gray-400',
                      'text-gray-500'
                    )
                  }`}>/mes</span>
                </p>
                <ul className="mt-6 space-y-4 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className={`ml-3 text-base ${
                        getThemeClass(isDarkMode,
                          'text-gray-300',
                          'text-gray-700'
                        )
                      }`}>{feature}</p>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleNavigation('/register')}
                  className={`mt-8 w-full py-3 px-6 rounded-md shadow-sm text-white text-sm font-medium ${
                    plan.popular
                      ? getThemeClass(isDarkMode,
                          'bg-blue-500 hover:bg-blue-600',
                          'bg-blue-600 hover:bg-blue-700'
                        )
                      : getThemeClass(isDarkMode,
                          'bg-gray-700 hover:bg-gray-600',
                          'bg-gray-800 hover:bg-gray-900'
                        )
                  }`}
                >
                  Comenzar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`${
        getThemeClass(isDarkMode,
          'bg-gray-800 border-t border-gray-700',
          'bg-gray-800'
        )
      }`}>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Producto
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#features" className="text-base text-gray-300 hover:text-white">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-base text-gray-300 hover:text-white">
                    Precios
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Documentación
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Soporte
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Centro de ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Guías
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Empresa
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Sobre nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Términos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; 2024 LegalAI Chat. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
