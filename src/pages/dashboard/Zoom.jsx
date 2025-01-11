import { useTheme } from '../../context/ThemeContext';
import { PlayCircle, Calendar } from 'lucide-react';

const Zoom = () => {
  const { isDarkMode } = useTheme();
  const sessions = [
    {
      id: 1,
      title: 'Actualización en Derecho Laboral 2024',
      speaker: 'Dr. Carlos Ramírez',
      date: '2024-01-15',
      duration: '1h 30min',
      thumbnail: 'https://placehold.co/400x225',
      recording: true
    },
    {
      id: 2,
      title: 'Reformas Fiscales y su Impacto',
      speaker: 'Dra. María González',
      date: '2024-01-10',
      duration: '2h',
      thumbnail: 'https://placehold.co/400x225',
      recording: true
    },
    {
      id: 3,
      title: 'Propiedad Intelectual en la Era Digital',
      speaker: 'Dr. Juan Méndez',
      date: '2024-01-20',
      duration: '1h 45min',
      thumbnail: 'https://placehold.co/400x225',
      recording: false
    },
    {
      id: 4,
      title: 'Derecho Mercantil Internacional',
      speaker: 'Dra. Ana López',
      date: '2024-01-25',
      duration: '2h',
      thumbnail: 'https://placehold.co/400x225',
      recording: false
    }
  ];

  return (
    <div className={`p-6 min-h-screen ${isDarkMode ? 'bg-dark-primary' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${
            isDarkMode ? 'text-dark-primary' : 'text-gray-800'
          }`}>
            Sesiones de Zoom
          </h1>
          <button className={`px-4 py-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'bg-primary text-white hover:bg-primary-dark' 
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}>
            Programar Sesión
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`rounded-lg shadow-sm overflow-hidden ${
                isDarkMode ? 'bg-dark-secondary' : 'bg-white'
              } hover:shadow-md transition-shadow`}
            >
              <div className="relative">
                <img
                  src={session.thumbnail}
                  alt={session.title}
                  className="w-full h-48 object-cover"
                />
                {session.recording && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Grabación disponible
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className={`font-semibold mb-2 ${
                  isDarkMode ? 'text-dark-primary' : 'text-gray-800'
                }`}>
                  {session.title}
                </h3>
                <p className={`text-sm mb-3 ${
                  isDarkMode ? 'text-dark-secondary' : 'text-gray-600'
                }`}>
                  {session.speaker}
                </p>
                
                <div className={`flex items-center justify-between text-sm ${
                  isDarkMode ? 'text-dark-secondary' : 'text-gray-500'
                }`}>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {session.date}
                  </div>
                  <span>{session.duration}</span>
                </div>

                <button
                  className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    session.recording
                      ? isDarkMode
                        ? 'bg-primary text-white hover:bg-primary-dark'
                        : 'bg-primary text-white hover:bg-primary-dark'
                      : isDarkMode
                        ? 'bg-dark-hover text-dark-secondary'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <PlayCircle className="w-5 h-5" />
                  {session.recording ? 'Ver Grabación' : 'Próximamente'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Zoom;
