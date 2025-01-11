import { useTheme } from '../../context/ThemeContext';
import { Download } from 'lucide-react';

const Tools = () => {
  const { isDarkMode } = useTheme();
  const documents = [
    {
      id: 1,
      title: 'Guía de Derecho Civil',
      description: 'Manual completo sobre los fundamentos del derecho civil y sus aplicaciones prácticas.',
      filename: 'guia-derecho-civil.pdf'
    },
    {
      id: 2,
      title: 'Procedimientos Penales',
      description: 'Documento detallado sobre los procedimientos en materia penal y su correcta aplicación.',
      filename: 'procedimientos-penales.pdf'
    },
    {
      id: 3,
      title: 'Derecho Mercantil',
      description: 'Compendio actualizado de leyes y regulaciones en materia mercantil.',
      filename: 'derecho-mercantil.pdf'
    },
    {
      id: 4,
      title: 'Derecho Laboral',
      description: 'Guía completa sobre derechos y obligaciones en relaciones laborales.',
      filename: 'derecho-laboral.pdf'
    },
    {
      id: 5,
      title: 'Propiedad Intelectual',
      description: 'Manual sobre protección de derechos de autor y propiedad industrial.',
      filename: 'propiedad-intelectual.pdf'
    },
    {
      id: 6,
      title: 'Derecho Fiscal',
      description: 'Documento sobre obligaciones fiscales y procedimientos tributarios.',
      filename: 'derecho-fiscal.pdf'
    }
  ];

  const handleDownload = (filename) => {
    // Aquí irá la lógica de descarga
    console.log(`Descargando ${filename}`);
  };

  return (
    <div className={`p-6 min-h-screen ${isDarkMode ? 'bg-dark-primary' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-2xl font-bold mb-6 ${
          isDarkMode ? 'text-dark-primary' : 'text-gray-800'
        }`}>
          Herramientas y Recursos
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`${
                isDarkMode 
                  ? 'bg-dark-secondary hover:bg-dark-hover' 
                  : 'bg-white hover:shadow-md'
              } rounded-lg shadow-sm p-6 transition-shadow`}
            >
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-dark-primary' : 'text-gray-800'
              }`}>
                {doc.title}
              </h3>
              <p className={`text-sm mb-4 line-clamp-2 ${
                isDarkMode ? 'text-dark-secondary' : 'text-gray-600'
              }`}>
                {doc.description}
              </p>
              <button
                onClick={() => handleDownload(doc.filename)}
                className={`flex items-center gap-2 text-sm font-medium ${
                  isDarkMode 
                    ? 'text-primary hover:text-primary-light' 
                    : 'text-primary hover:text-primary-dark'
                } transition-colors`}
              >
                <Download className="w-5 h-5" />
                Descargar PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
