import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTheme } from '../../context/ThemeContext';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  Activity,
  MessageSquare,
  LineChart,
  BarChart,
  Download,
  ChevronDown
} from 'lucide-react';

const Analytics = () => {
  const { isDarkMode } = useTheme();
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());

  const stats = [
    {
      title: 'Ingresos Totales',
      value: '$45,231.89',
      change: '+20.1%',
      icon: DollarSign,
      color: 'bg-blue-500'
    },
    {
      title: 'Ganancias Último Mes',
      value: '$12,234.56',
      change: '+15.3%',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Suscripciones Activas',
      value: '2,420',
      change: '+12.2%',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Ventas del Mes',
      value: '182',
      change: '+8.1%',
      icon: ShoppingCart,
      color: 'bg-orange-500'
    }
  ];

  const metrics = [
    {
      title: 'Usuarios Activos',
      value: '2,420',
      change: '+20%',
      icon: Users,
      color: 'bg-indigo-500'
    },
    {
      title: 'Chats Iniciados',
      value: '1,210',
      change: '+15%',
      icon: MessageSquare,
      color: 'bg-pink-500'
    },
    {
      title: 'Tasa de Respuesta',
      value: '98%',
      change: '+5%',
      icon: Activity,
      color: 'bg-teal-500'
    }
  ];

  const handleDownload = (format) => {
    // Aquí iría la lógica de descarga según el formato
    console.log('Descargando en formato:', format);
    setShowDownloadMenu(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Panel de Analíticas</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div className={`flex items-center space-x-4 px-6 py-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className="flex flex-col">
                <label className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Fecha de inicio
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className={`bg-transparent w-32 text-sm border rounded-md px-2 py-1 ${
                    isDarkMode 
                      ? 'text-white border-gray-700 focus:border-blue-500' 
                      : 'text-gray-900 border-gray-300 focus:border-blue-500'
                  }`}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Seleccionar"
                />
              </div>
              <div className={`h-8 w-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
              <div className="flex flex-col">
                <label className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Fecha de fin
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className={`bg-transparent w-32 text-sm border rounded-md px-2 py-1 ${
                    isDarkMode 
                      ? 'text-white border-gray-700 focus:border-blue-500' 
                      : 'text-gray-900 border-gray-300 focus:border-blue-500'
                  }`}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Seleccionar"
                />
              </div>
            </div>
            <div className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <span className="text-sm font-medium">Última actualización: Hace 5 minutos</span>
            </div>
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
              <span>Descargar</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showDownloadMenu && (
              <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } border-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} z-[9999]`}>
                <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <button
                    onClick={() => handleDownload('pdf')}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      isDarkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-50'
                    } border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                  >
                    PDF
                  </button>
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
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {metric.title}
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold">{metric.value}</h3>
                  <span className={`text-xs font-medium ${
                    metric.change.startsWith('+') 
                      ? 'text-green-500' 
                      : 'text-red-500'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${metric.color} bg-opacity-20`}>
                <metric.icon className={`w-5 h-5 ${metric.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usuarios Activos Chart */}
        <div className={`p-6 rounded-xl border ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold">Usuarios Activos</h3>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Últimos 30 días
              </p>
            </div>
            <LineChart className="w-5 h-5" />
          </div>
          <div className="h-[300px] flex items-center justify-center">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Aquí iría el gráfico de usuarios activos
            </p>
          </div>
        </div>

        {/* Uso del Chat Chart */}
        <div className={`p-6 rounded-xl border ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold">Uso del Chat</h3>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Por hora del día
              </p>
            </div>
            <BarChart className="w-5 h-5" />
          </div>
          <div className="h-[300px] flex items-center justify-center">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Aquí iría el gráfico de uso del chat
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
