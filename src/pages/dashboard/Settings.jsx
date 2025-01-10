import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  KeyIcon
} from '@heroicons/react/24/outline';

const Settings = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: UserCircleIcon },
    { id: 'notifications', name: 'Notificaciones', icon: BellIcon },
    { id: 'privacy', name: 'Privacidad', icon: ShieldCheckIcon },
    { id: 'security', name: 'Seguridad', icon: KeyIcon },
  ];

  return (
    <div className={`p-6 min-h-screen ${isDarkMode ? 'bg-dark-primary' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-2xl font-bold mb-6 ${
          isDarkMode ? 'text-dark-primary' : 'text-gray-800'
        }`}>
          Configuración
        </h1>

        <div className={`${isDarkMode ? 'bg-dark-secondary' : 'bg-white'} rounded-lg shadow-sm`}>
          <div className={`border-b ${isDarkMode ? 'border-dark-border' : 'border-gray-200'}`}>
            <div className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? isDarkMode
                        ? 'border-primary text-primary'
                        : 'border-primary text-primary'
                      : isDarkMode
                        ? 'border-transparent text-dark-secondary hover:text-dark-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-dark-hover' : 'bg-gray-200'
                  }`}>
                    <UserCircleIcon className={`w-12 h-12 ${
                      isDarkMode ? 'text-dark-secondary' : 'text-gray-400'
                    }`} />
                  </div>
                  <button className={`${
                    isDarkMode ? 'text-primary hover:text-primary-light' : 'text-primary hover:text-primary-dark'
                  } transition-colors`}>
                    Cambiar foto
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-dark-primary' : 'text-gray-700'
                    }`}>
                      Nombre
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        isDarkMode 
                          ? 'bg-dark-primary border-dark-border text-dark-primary' 
                          : 'bg-white border-gray-200'
                      }`}
                      defaultValue="Juan"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-dark-primary' : 'text-gray-700'
                    }`}>
                      Apellidos
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        isDarkMode 
                          ? 'bg-dark-primary border-dark-border text-dark-primary' 
                          : 'bg-white border-gray-200'
                      }`}
                      defaultValue="Pérez"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-dark-primary' : 'text-gray-700'
                    }`}>
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        isDarkMode 
                          ? 'bg-dark-primary border-dark-border text-dark-primary' 
                          : 'bg-white border-gray-200'
                      }`}
                      defaultValue="juan@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-dark-primary' : 'text-gray-700'
                    }`}>
                      Cédula Profesional
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        isDarkMode 
                          ? 'bg-dark-primary border-dark-border text-dark-primary' 
                          : 'bg-white border-gray-200'
                      }`}
                      defaultValue="12345678"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className={`px-6 py-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-primary text-white hover:bg-primary-dark' 
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}>
                    Guardar Cambios
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className={`font-medium ${
                      isDarkMode ? 'text-dark-primary' : 'text-gray-800'
                    }`}>
                      Notificaciones por correo
                    </h3>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-dark-secondary' : 'text-gray-500'
                    }`}>
                      Recibe actualizaciones en tu correo
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className={`font-medium ${
                      isDarkMode ? 'text-dark-primary' : 'text-gray-800'
                    }`}>
                      Perfil público
                    </h3>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-dark-secondary' : 'text-gray-500'
                    }`}>
                      Hacer visible tu perfil a otros usuarios
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className={`font-medium mb-4 ${
                    isDarkMode ? 'text-dark-primary' : 'text-gray-800'
                  }`}>
                    Cambiar Contraseña
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        isDarkMode ? 'text-dark-primary' : 'text-gray-700'
                      }`}>
                        Contraseña Actual
                      </label>
                      <input
                        type="password"
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          isDarkMode 
                            ? 'bg-dark-primary border-dark-border text-dark-primary' 
                            : 'bg-white border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        isDarkMode ? 'text-dark-primary' : 'text-gray-700'
                      }`}>
                        Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          isDarkMode 
                            ? 'bg-dark-primary border-dark-border text-dark-primary' 
                            : 'bg-white border-gray-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        isDarkMode ? 'text-dark-primary' : 'text-gray-700'
                      }`}>
                        Confirmar Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          isDarkMode 
                            ? 'bg-dark-primary border-dark-border text-dark-primary' 
                            : 'bg-white border-gray-200'
                        }`}
                      />
                    </div>
                    <div className="flex justify-end">
                      <button className={`px-6 py-2 rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'bg-primary text-white hover:bg-primary-dark' 
                          : 'bg-primary text-white hover:bg-primary-dark'
                      }`}>
                        Actualizar Contraseña
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
