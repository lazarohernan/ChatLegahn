import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  Search,
  Eye,
  CreditCard,
  UserPlus,
  Trash2,
  AlertCircle
} from 'lucide-react';
import UserActionModal from '../../components/UserActionModal';

const Users = () => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCode, setDeleteCode] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const users = [
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@ejemplo.com',
      registerDate: '2024-01-15',
      status: 'active',
      type: 'premium',
      lastPayment: '2024-01-15'
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria@ejemplo.com',
      registerDate: '2024-01-10',
      status: 'active',
      type: 'basic',
      lastPayment: '2024-01-10'
    }
  ];

  const handleUserAction = (actionId, user) => {
    if (actionId === 'delete') {
      setShowDeleteModal(true);
      setShowUserModal(false);
      setSelectedUser(user);
    } else {
      console.log('Acción:', actionId, 'Usuario:', user);
    }
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleDeleteUser = () => {
    if (deleteCode === '123456') {
      console.log('Usuario eliminado:', selectedUser);
      setShowDeleteModal(false);
      setDeleteCode('');
      setSelectedUser(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Usuarios Registrados</h1>
      </div>

      {/* Users Table */}
      <div className={`rounded-xl border ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-100'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Registro</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Último Pago</th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr 
                  key={user.id} 
                  className={`${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  } cursor-pointer`}
                  onClick={() => handleRowClick(user)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.registerDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`capitalize ${
                      user.type === 'premium' ? 'text-purple-600 font-medium' : ''
                    }`}>
                      {user.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.lastPayment}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(user);
                        }}
                        className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                        title="Ver información"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUserAction('subscription', user);
                        }}
                        className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                        title="Gestionar suscripción"
                      >
                        <CreditCard className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUserAction('partner', user);
                        }}
                        className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                        title="Cambiar a socio"
                      >
                        <UserPlus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUserAction('delete', user);
                        }}
                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-red-600"
                        title="Eliminar usuario"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Action Modal */}
      <UserActionModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        user={selectedUser}
        onAction={handleUserAction}
      />

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
                <h3 className="text-lg font-semibold">Eliminar Usuario</h3>
              </div>
              <p className={`mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Esta acción es irreversible. Por favor, ingrese el código de confirmación.
              </p>
              <input
                type="text"
                value={deleteCode}
                onChange={(e) => setDeleteCode(e.target.value)}
                placeholder="Código de confirmación"
                className={`w-full px-4 py-2 rounded-lg border mb-4 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-100'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteCode('');
                  }}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteUser}
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

export default Users;
