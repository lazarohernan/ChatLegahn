import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import LoadingButton from '../../components/LoadingButton';
import { Check, X } from 'lucide-react';

const plans = [
  {
    name: 'Básico',
    price: '29.99',
    features: [
      'Consultas legales ilimitadas',
      'Acceso a documentos básicos',
      'Chat con IA básico',
      'Soporte por email'
    ],
    limitations: [
      'Sin acceso a documentos premium',
      'Sin análisis avanzado de documentos',
      'Sin prioridad en soporte'
    ]
  },
  {
    name: 'Profesional',
    price: '59.99',
    features: [
      'Todo lo del plan Básico',
      'Documentos premium',
      'Chat con IA avanzado',
      'Análisis de documentos',
      'Soporte prioritario',
      'Acceso a webinars'
    ],
    limitations: [
      'Sin acceso a API',
      'Sin personalización de documentos'
    ]
  },
  {
    name: 'Empresarial',
    price: '99.99',
    features: [
      'Todo lo del plan Profesional',
      'API access',
      'Personalización completa',
      'Soporte 24/7',
      'Capacitación personalizada',
      'Dashboard analytics'
    ],
    limitations: []
  }
];

const Subscription = () => {
  const { isDarkMode } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (planName) => {
    setSelectedPlan(planName);
    setLoading(true);
    try {
      // Simulación de suscripción
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Suscrito al plan:', planName);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className={`text-3xl font-bold mb-8 ${
        isDarkMode ? 'text-dark-primary' : 'text-gray-900'
      }`}>
        Planes de Suscripción
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            onClick={() => !loading && setSelectedPlan(plan.name)}
            className={`rounded-lg p-6 cursor-pointer transition-all ${
              isDarkMode 
                ? 'bg-dark-secondary border border-dark-border hover:border-primary' 
                : 'bg-white border border-gray-200 hover:border-primary'
            } ${
              selectedPlan === plan.name 
                ? 'ring-2 ring-primary transform scale-[1.02]' 
                : ''
            }`}
          >
            <div className="text-center mb-6">
              <h2 className={`text-2xl font-bold ${
                isDarkMode ? 'text-dark-primary' : 'text-gray-900'
              }`}>
                {plan.name}
              </h2>
              <div className="mt-4">
                <span className={`text-4xl font-bold ${
                  isDarkMode ? 'text-dark-primary' : 'text-gray-900'
                }`}>
                  ${plan.price}
                </span>
                <span className={
                  isDarkMode ? 'text-dark-secondary' : 'text-gray-500'
                }>/mes</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="space-y-2">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <Check className={`w-5 h-5 mr-2 ${
                      isDarkMode ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <span className={
                      isDarkMode ? 'text-dark-primary' : 'text-gray-700'
                    }>{feature}</span>
                  </div>
                ))}
              </div>

              {plan.limitations.length > 0 && (
                <div className="space-y-2 mt-4">
                  {plan.limitations.map((limitation) => (
                    <div key={limitation} className="flex items-center">
                      <X className={`w-5 h-5 mr-2 ${
                        isDarkMode ? 'text-red-400' : 'text-red-500'
                      }`} />
                      <span className={
                        isDarkMode ? 'text-dark-secondary' : 'text-gray-500'
                      }>{limitation}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <LoadingButton
              onClick={(e) => {
                e.stopPropagation();
                handleSubscribe(plan.name);
              }}
              loading={loading && selectedPlan === plan.name}
              loadingText="Procesando..."
              className="w-full"
              disabled={loading}
            >
              {selectedPlan === plan.name ? 'Plan Seleccionado' : 'Seleccionar Plan'}
            </LoadingButton>
          </div>
        ))}
      </div>

      <div className={`mt-12 p-6 rounded-lg ${
        isDarkMode ? 'bg-dark-secondary' : 'bg-gray-50'
      }`}>
        <h3 className={`text-xl font-semibold mb-4 ${
          isDarkMode ? 'text-dark-primary' : 'text-gray-900'
        }`}>
          Información Importante
        </h3>
        <ul className={`list-disc pl-5 space-y-2 ${
          isDarkMode ? 'text-dark-secondary' : 'text-gray-600'
        }`}>
          <li>Todos los planes incluyen actualizaciones gratuitas</li>
          <li>Puedes cancelar tu suscripción en cualquier momento</li>
          <li>Facturación mensual sin compromisos a largo plazo</li>
          <li>Garantía de devolución de 30 días</li>
        </ul>
      </div>
    </div>
  );
};

export default Subscription;
