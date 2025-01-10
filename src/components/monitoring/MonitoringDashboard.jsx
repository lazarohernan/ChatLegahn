import { useMonitoring } from '../../context/MonitoringContext';
import PropTypes from 'prop-types';
import MetricsChart from './MetricsChart';

const MetricsCard = ({ title, value, unit, className }) => (
  <div className={`p-4 rounded-lg ${className}`}>
    <p className="text-sm opacity-75">{title}</p>
    <p className="text-2xl font-bold">{value} {unit}</p>
  </div>
);

MetricsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

const LogItem = ({ log }) => (
  <div className={`p-3 mb-2 rounded-lg ${
    log.level === 'error' ? 'bg-red-50 dark:bg-red-900' :
    log.level === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900' :
    'bg-blue-50 dark:bg-blue-900'
  }`}>
    <div className="flex justify-between">
      <span className="font-medium">{log.service}</span>
      <span className="text-sm opacity-75">{new Date(log.timestamp).toLocaleTimeString()}</span>
    </div>
    <p className="mt-1">{log.message}</p>
  </div>
);

LogItem.propTypes = {
  log: PropTypes.shape({
    id: PropTypes.number.isRequired,
    level: PropTypes.string.isRequired,
    service: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }).isRequired
};

const AlertItem = ({ alert }) => (
  <div className="p-3 mb-2 bg-red-50 dark:bg-red-900 rounded-lg">
    <div className="flex justify-between">
      <span className="font-medium">{alert.type}</span>
      <span className="text-sm opacity-75">{new Date(alert.timestamp).toLocaleTimeString()}</span>
    </div>
    <p className="mt-1">{alert.message}</p>
  </div>
);

AlertItem.propTypes = {
  alert: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }).isRequired
};

const MonitoringDashboard = () => {
  const { metrics, logs, alerts, serviceStatus } = useMonitoring();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard de Monitoreo</h1>
      
      {/* Métricas - Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricsCard
          title="CPU"
          value={metrics.cpu.toFixed(1)}
          unit="%"
          className="bg-blue-50 dark:bg-blue-900"
        />
        <MetricsCard
          title="Memoria"
          value={metrics.memory.toFixed(1)}
          unit="%"
          className="bg-green-50 dark:bg-green-900"
        />
        <MetricsCard
          title="Tiempo de Respuesta"
          value={metrics.responseTime.toFixed(0)}
          unit="ms"
          className="bg-purple-50 dark:bg-purple-900"
        />
        <MetricsCard
          title="Latencia DB"
          value={metrics.dbLatency.toFixed(0)}
          unit="ms"
          className="bg-orange-50 dark:bg-orange-900"
        />
      </div>

      {/* Métricas - Gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <MetricsChart
          metric={metrics.cpu}
          color="#3B82F6"
          title="CPU"
          unit="%"
        />
        <MetricsChart
          metric={metrics.memory}
          color="#10B981"
          title="Memoria"
          unit="%"
        />
        <MetricsChart
          metric={metrics.responseTime}
          color="#8B5CF6"
          title="Tiempo de Respuesta"
          unit=" ms"
        />
        <MetricsChart
          metric={metrics.dbLatency}
          color="#F97316"
          title="Latencia DB"
          unit=" ms"
        />
      </div>

      {/* Estado de Servicios */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Estado de Servicios</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(serviceStatus).map(([service, status]) => (
            <div key={service} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="font-medium">{service}</span>
              <div className={`mt-2 inline-block px-2 py-1 rounded-full text-sm ${
                status === 'healthy' ? 'bg-green-100 text-green-800' :
                status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logs Recientes */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Logs Recientes</h2>
          <div className="space-y-2">
            {logs.slice(0, 5).map(log => (
              <LogItem key={log.id} log={log} />
            ))}
          </div>
        </div>

        {/* Alertas Activas */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Alertas Activas</h2>
          <div className="space-y-2">
            {alerts.slice(0, 5).map(alert => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringDashboard;
