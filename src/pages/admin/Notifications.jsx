import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Bell, Send, Users } from 'lucide-react';

const Notifications = () => {
  const { isDarkMode } = useTheme();
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    type: 'all'
  });

  const sentNotifications = [
    {
      id: 1,
      title: 'Actualización del Sistema',
      message: 'Nuevas funcionalidades disponibles en el chat',
      type: 'all',
      date: '2024-01-20',
      recipients: 'Todos los usuarios'
    },
    // Más notificaciones aquí
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enviando notificación:', notificationForm);
    // Aquí iría la lógica para enviar la notificación
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Notificaciones</h1>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Envía notificaciones a los usuarios
        </p>
      </div>

      {/* Formulario de nueva notificación */}
      <div className={`p-4 rounded-lg border mb-8 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <h2 className="text-lg font-semibold mb-4">Nueva Notificación</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Título
            </label>
            <input
              type="text"
              value={notificationForm.title}
              onChange={(e) => setNotificationForm({
                ...notificationForm,
                title: e.target.value
              })}
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-100'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Mensaje
            </label>
            <textarea
              value={notificationForm.message}
              onChange={(e) => setNotificationForm({
                ...notificationForm,
                message: e.target.value
              })}
              className={`w-full px-3 py-2 rounded-md border h-32 ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-100'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Destinatarios
            </label>
            <select
              value={notificationForm.type}
              onChange={(e) => setNotificationForm({
                ...notificationForm,
                type: e.target.value
              })}
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-100'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">Todos los usuarios</option>
              <option value="active">Usuarios activos</option>
              <option value="inactive">Usuarios inactivos</option>
            </select>
          </div>

          <button
            type="submit"
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              isDarkMode
                ? 'bg-primary hover:bg-primary-dark text-white'
                : 'bg-primary hover:bg-primary-dark text-white'
            }`}
          >
            <Send className="w-4 h-4" />
            Enviar Notificación
          </button>
        </form>
      </div>

      {/* Historial de notificaciones */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Historial de Notificaciones</h2>
        <div className="grid gap-4">
          {sentNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className={`text-sm mt-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`text-xs flex items-center gap-1 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      <Users className="w-3 h-3" />
                      {notification.recipients}
                    </span>
                    <span className={`text-xs ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {notification.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
