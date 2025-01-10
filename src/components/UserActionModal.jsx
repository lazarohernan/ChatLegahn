import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Eye, 
  CreditCard, 
  UserPlus, 
  Trash2,
  X,
  CheckCircle,
  Clock,
  Shield,
  Mail,
  Calendar,
  DollarSign,
  Building,
  Phone,
  MapPin,
  Globe,
  MessageSquare,
  FileText,
  Settings,
  ChevronRight
} from 'lucide-react';

const UserActionModal = ({ isOpen, onClose, user, onAction }) => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('info');

  if (!isOpen || !user) return null;

  const tabs = [
    { id: 'info', name: 'Información', icon: Eye },
    { id: 'subscription', name: 'Suscripción', icon: CreditCard },
    { id: 'activity', name: 'Actividad', icon: Clock },
    { id: 'settings', name: 'Configuración', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <Building className="w-5 h-5" />
                  <h4 className="font-medium">Información Profesional</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Cédula Profesional</p>
                    <p className="font-medium">12345678</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Especialidad</p>
                    <p className="font-medium">Derecho Mercantil</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Años de Experiencia</p>
                    <p className="font-medium">8 años</p>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5" />
                  <h4 className="font-medium">Información de Contacto</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Teléfono</p>
                    <p className="font-medium">+52 123 456 7890</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ubicación</p>
                    <p className="font-medium">Ciudad de México, México</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5" />
                <h4 className="font-medium">Documentos Verificados</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Identificación Oficial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Cédula Profesional</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Comprobante de Domicilio</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'subscription':
        return (
          <div className="space-y-6">
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-purple-500" />
                  <h4 className="font-medium">Plan Actual</h4>
                </div>
                <span className="px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
                  Premium
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Facturación</p>
                  <p className="font-medium">Mensual - $99.00 USD</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Próximo Cobro</p>
                  <p className="font-medium">15 de Febrero, 2024</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Método de Pago</p>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h4 className="font-medium mb-4">Historial de Pagos</h4>
              <div className="space-y-3">
                {[1,2,3].map((i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                    <div>
                      <p className="font-medium">Pago Mensual - Premium</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">15 de Enero, 2024</p>
                    </div>
                    <span className="font-medium">$99.00</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'activity':
        return (
          <div className="space-y-6">
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-5 h-5" />
                <h4 className="font-medium">Uso del Chat</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-gray-400">Chats Iniciados</p>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-sm text-gray-400">Tasa de Respuesta</p>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <p className="text-2xl font-bold">4.8</p>
                  <p className="text-sm text-gray-400">Calificación</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h4 className="font-medium mb-4">Actividad Reciente</h4>
              <div className="space-y-4">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className={`p-2 rounded-full ${
                      isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                    }`}>
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium">Consulta sobre derecho mercantil</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Hace 2 horas</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h4 className="font-medium mb-4">Permisos y Accesos</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Chat AI</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Acceso al chat con IA</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Herramientas Premium</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Acceso a funciones avanzadas</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sesiones Zoom</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Acceso a videollamadas</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <h4 className="font-medium mb-4">Acciones de Cuenta</h4>
              <div className="space-y-3">
                <button
                  onClick={() => onAction('partner', user)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-600"
                >
                  <div className="flex items-center gap-3">
                    <UserPlus className="w-5 h-5 text-blue-500" />
                    <div className="text-left">
                      <p className="font-medium">Cambiar a Socio</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Otorgar privilegios de socio</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onAction('delete', user)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-600"
                >
                  <div className="flex items-center gap-3">
                    <Trash2 className="w-5 h-5 text-red-500" />
                    <div className="text-left">
                      <p className="font-medium">Eliminar Cuenta</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Eliminar permanentemente</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={`w-full max-w-4xl rounded-xl shadow-lg ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className={`mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>{user.email}</p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? isDarkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-100 text-gray-900'
                    : isDarkMode
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="mt-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActionModal;
