// src/components/AlertsOverTime.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchData } from '../utils/data';
import 'chart.js/auto';

const AlertsOverTime = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();

      if (data.length === 0) {
        setChartData(null);
        return;
      }

      // Aggregate data by hour
      const alertsByHour = data.reduce((acc, curr) => {
        const hour = curr.timestamp.getHours();
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(alertsByHour);
      const values = Object.values(alertsByHour);

      setChartData({
        labels,
        datasets: [{
          label: 'Alerts Over Time',
          data: values,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
        }]
      });
    };

    loadData();
  }, []);

  return (
    <div>
      <h2>Alerts Over Time</h2>
      {chartData ? <Line data={chartData} /> : <p>No data available</p>}
    </div>
  );
};

export default AlertsOverTime;
