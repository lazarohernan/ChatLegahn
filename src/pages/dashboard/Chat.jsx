import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const Chat = () => {
  const { isDarkMode } = useTheme();
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Aquí irá la lógica para enviar el mensaje
    setMessage('');
  };

  return (
    <div className={`flex flex-col h-full ${isDarkMode ? 'bg-dark-primary' : 'bg-gray-50'}`}>
      {/* Chat Area */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Mensaje de bienvenida */}
          <div className={`p-4 rounded-lg mb-4 ${
            isDarkMode ? 'bg-dark-secondary text-white' : 'bg-white text-gray-900'
          } shadow-sm`}>
            <h2 className="text-lg font-semibold mb-2">¡Bienvenido a LegalAI Chat!</h2>
            <p className="text-sm">
              Estoy aquí para ayudarte con tus consultas legales. ¿En qué puedo asistirte hoy?
            </p>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className={`border-t ${
        isDarkMode 
          ? 'bg-dark-secondary/80 backdrop-blur-md border-dark-border' 
          : 'bg-white/80 backdrop-blur-md border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto p-4">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu consulta aquí..."
              className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                isDarkMode 
                  ? 'bg-dark-primary border-dark-border text-white placeholder-gray-500'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
            />
            <button
              type="submit"
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 ${
                isDarkMode 
                  ? 'text-dark-secondary hover:text-white' 
                  : 'text-gray-400 hover:text-primary'
              } transition-colors`}
              disabled={!message.trim()}
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </button>
          </form>
          <p className={`text-xs mt-2 text-center ${
            isDarkMode ? 'text-dark-secondary' : 'text-gray-500'
          }`}>
            Presiona Enter para enviar tu mensaje
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
