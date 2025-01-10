import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const MetricsChart = ({ metric, color, title, unit }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Añadir nuevo punto de datos
    setData(prev => {
      const newData = [...prev, {
        time: new Date().toLocaleTimeString(),
        value: metric
      }];
      // Mantener solo los últimos 10 puntos
      return newData.slice(-10);
    });
  }, [metric]);

  return (
    <div className="h-64 w-full">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis unit={unit} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

MetricsChart.propTypes = {
  metric: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired
};

export default MetricsChart;
