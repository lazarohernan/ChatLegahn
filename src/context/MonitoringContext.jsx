import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MonitoringContext = createContext(null);

export const MonitoringProvider = ({ children }) => {
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    responseTime: 0,
    dbLatency: 0
  });

  const [logs, setLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [serviceStatus, setServiceStatus] = useState({});

  // Simulación de métricas en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(() => ({
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        responseTime: Math.random() * 1000,
        dbLatency: Math.random() * 100
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const addLog = (level, message, service) => {
    setLogs(prev => [{
      id: Date.now(),
      timestamp: new Date().toISOString(),
      level,
      message,
      service
    }, ...prev]);
  };

  const addAlert = (type, message) => {
    setAlerts(prev => [{
      id: Date.now(),
      timestamp: new Date().toISOString(),
      type,
      message,
      isRead: false
    }, ...prev]);
  };

  const updateServiceStatus = (service, status) => {
    setServiceStatus(prev => ({
      ...prev,
      [service]: status
    }));
  };

  const value = {
    metrics,
    logs,
    alerts,
    serviceStatus,
    addLog,
    addAlert,
    updateServiceStatus
  };

  return (
    <MonitoringContext.Provider value={value}>
      {children}
    </MonitoringContext.Provider>
  );
};

MonitoringProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useMonitoring = () => {
  const context = useContext(MonitoringContext);
  if (!context) {
    throw new Error('useMonitoring must be used within a MonitoringProvider');
  }
  return context;
};
