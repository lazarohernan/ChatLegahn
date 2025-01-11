import { useTheme } from '../../context/ThemeContext';
import { AlertCircle } from 'lucide-react';

const Reports = () => {
  const { isDarkMode } = useTheme();

  const reports = [
    {
      id: 1,
      title: 'Error en respuesta del chat',
      description: 'La IA no está respondiendo correctamente a consultas sobre derecho mercantil',
      date: '2024-01-20',
      status: 'pending'
    },
    // Más reportes aquí
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Reportes de Problemas</h1>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Gestiona los reportes de problemas enviados por los usuarios
        </p>
      </div>

      <div className="grid gap-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className={`p-4 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <AlertCircle className={`w-5 h-5 mt-1 ${
                  report.status === 'pending' 
                    ? 'text-yellow-500' 
                    : 'text-green-500'
                }`} />
                <div>
                  <h3 className="font-medium">{report.title}</h3>
                  <p className={`text-sm mt-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {report.description}
                  </p>
                  <span className={`text-xs mt-2 block ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    Reportado el {report.date}
                  </span>
                </div>
              </div>
              <button
                className={`px-3 py-1 text-sm rounded-md ${
                  report.status === 'pending'
                    ? isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                    : isDarkMode
                      ? 'bg-green-900/30 text-green-400'
                      : 'bg-green-100 text-green-800'
                }`}
              >
                {report.status === 'pending' ? 'Marcar como resuelto' : 'Resuelto'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
