import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  Upload,
  File,
  FileText,
  Trash2,
  Search,
  FolderPlus,
  AlertCircle
} from 'lucide-react';

const Documents = () => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const documents = [
    {
      id: 1,
      name: 'Formato de Demanda Civil',
      type: 'docx',
      category: 'Plantillas',
      uploadDate: '2024-01-15',
      size: '245 KB'
    },
    {
      id: 2,
      name: 'Contrato de Servicios Legales',
      type: 'pdf',
      category: 'Contratos',
      uploadDate: '2024-01-10',
      size: '1.2 MB'
    }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Archivo seleccionado:', file);
      // Aquí iría la lógica de subida
    }
  };

  const handleDelete = (doc) => {
    setSelectedDoc(doc);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Documento eliminado:', selectedDoc);
    setShowDeleteModal(false);
    setSelectedDoc(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Documentos</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-100'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
          <label className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer ${
            isDarkMode 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}>
            <Upload className="w-4 h-4" />
            <span>Subir Documento</span>
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx"
            />
          </label>
        </div>
      </div>

      <div className={`rounded-xl border ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FolderPlus className="w-5 h-5" />
              <h2 className="font-semibold">Documentos Disponibles</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Tamaño</th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {documents.map((doc) => (
                  <tr 
                    key={doc.id}
                    className={isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {doc.type === 'pdf' ? (
                          <File className="w-5 h-5 text-red-500" />
                        ) : (
                          <FileText className="w-5 h-5 text-blue-500" />
                        )}
                        <span className="font-medium">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{doc.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap uppercase">{doc.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doc.uploadDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doc.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDelete(doc)}
                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-red-600"
                        title="Eliminar documento"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-xl shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-red-100">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold">Eliminar Documento</h3>
              </div>
              <p className={`mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                ¿Está seguro que desea eliminar este documento? Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
