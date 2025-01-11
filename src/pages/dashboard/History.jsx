import { useTheme } from '../../context/ThemeContext';
import { Calendar, MessageSquare } from 'lucide-react';

const History = () => {
  const { isDarkMode } = useTheme();
  const chatHistory = [
    {
      id: 1,
      date: '2024-01-08',
      time: '14:30',
      topic: 'Consulta sobre derecho laboral',
      preview: 'Necesito información sobre el proceso de despido justificado...',
    },
    {
      id: 2,
      date: '2024-01-07',
      time: '11:15',
      topic: 'Derecho mercantil',
      preview: 'Procedimiento para constituir una sociedad anónima...',
    },
    {
      id: 3,
      date: '2024-01-07',
      time: '09:45',
      topic: 'Propiedad intelectual',
      preview: 'Registro de marca comercial y protección de derechos...',
    },
    {
      id: 4,
      date: '2024-01-06',
      time: '16:20',
      topic: 'Derecho civil',
      preview: 'Consulta sobre contrato de arrendamiento...',
    },
  ];

  return (
    <div className={`p-6 min-h-screen ${isDarkMode ? 'bg-dark-primary' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-2xl font-bold mb-6 ${
          isDarkMode ? 'text-dark-primary' : 'text-gray-800'
        }`}>
          Historial de Consultas
        </h1>
        
        <div className="space-y-4">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className={`${
                isDarkMode 
                  ? 'bg-dark-secondary hover:bg-dark-hover' 
                  : 'bg-white hover:shadow-md'
              } rounded-lg shadow-sm p-4 transition-all cursor-pointer`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    <MessageSquare className={`w-5 h-5 ${
                      isDarkMode ? 'text-dark-primary' : 'text-primary'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      isDarkMode ? 'text-dark-primary' : 'text-gray-800'
                    }`}>
                      {chat.topic}
                    </h3>
                    <p className={`text-sm mt-1 line-clamp-2 ${
                      isDarkMode ? 'text-dark-secondary' : 'text-gray-600'
                    }`}>
                      {chat.preview}
                    </p>
                  </div>
                </div>
                <div className={`flex items-center text-sm ${
                  isDarkMode ? 'text-dark-secondary' : 'text-gray-500'
                }`}>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{chat.date}</span>
                  <span className="mx-1">•</span>
                  <span>{chat.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
