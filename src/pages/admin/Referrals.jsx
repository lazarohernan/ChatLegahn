import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  Users,
  DollarSign,
  Settings,
  Download,
  ChevronDown,
  Search,
  Filter
} from 'lucide-react';

const Referrals = () => {
  const { isDarkMode } = useTheme();
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Datos de ejemplo
  const stats = [
    {
      title: 'Total Referidos',
      value: '1,234',
      change: '+12.5%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Comisiones Generadas',
      value: '$45,678',
      change: '+8.2%',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Tasa de Conversión',
      value: '68%',
      change: '+5.1%',
      icon: Settings,
      color: 'bg-purple-500'
    }
  ];

  const referrals = [
    {
      id: 1,
      referrer: 'Juan Pérez',
      referred: 'Ana Martínez',
      date: '2024-01-08',
      status: 'active',
      commission: '$150.00'
    },
    {
      id: 2,
      referrer: 'María García',
      referred: 'Carlos López',
      date: '2024-01-07',
      status: 'pending',
      commission: '$75.00'
    },
    {
      id: 3,
      referrer: 'Pedro Sánchez',
      referred: 'Laura Torres',
      date: '2024-01-07',
      status: 'completed',
      commission: '$200.00'
    }
  ];

  const handleDownload = (format) => {
    console.log('Descargando en formato:', format);
    setShowDownloadMenu(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'completed':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'pending':
        return 'Pendiente';
      case 'completed':
        return 'Completado';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sistema de Referidos</h1>
        <div className="flex items-center gap-4">
          <div className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <span className="text-sm font-medium">Última actualización: Hace 5 minutos</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-white hover:bg-gray-50'
              } border border-gray-200 dark:border-gray-700`}
            >
              <Download className="w-4 h-4" />
              <span>Exportar</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showDownloadMenu && (
              <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                  onClick={() => handleDownload('excel')}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    isDarkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-50'
                  } border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  Excel (.xlsx)
                </button>
                <button
                  onClick={() => handleDownload('csv')}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    isDarkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  CSV
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`relative overflow-hidden p-6 rounded-xl border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${stat.color} bg-opacity-20`}>
                  <stat.icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {stat.title}
                </p>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div className={`absolute right-0 top-0 h-full w-1 ${stat.color}`} />
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className={`p-4 rounded-xl border ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                }`}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`rounded-lg border px-4 py-2 ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="pending">Pendientes</option>
              <option value="completed">Completados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Referrals Table */}
      <div className={`rounded-xl border overflow-hidden ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Usuario que Refirió
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Usuario Referido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Comisión
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {referrals.map((referral) => (
                <tr key={referral.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {referral.referrer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {referral.referred}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {referral.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`${getStatusColor(referral.status)} font-medium`}>
                      {getStatusText(referral.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {referral.commission}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Program Settings */}
      <div className={`p-6 rounded-xl border ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <h2 className="text-xl font-semibold mb-4">Configuración del Programa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Comisión por Referido
            </label>
            <input
              type="text"
              value="10%"
              readOnly
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Mínimo para Pago
            </label>
            <input
              type="text"
              value="$50.00"
              readOnly
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Período de Pago
            </label>
            <input
              type="text"
              value="Mensual"
              readOnly
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
