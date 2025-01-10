import MonitoringDashboard from '../../components/monitoring/MonitoringDashboard';
import { MonitoringProvider } from '../../context/MonitoringContext';

const Monitoring = () => {
  return (
    <MonitoringProvider>
      <MonitoringDashboard />
    </MonitoringProvider>
  );
};

export default Monitoring;
