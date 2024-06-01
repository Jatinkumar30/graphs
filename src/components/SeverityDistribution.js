// src/components/SeverityDistribution.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchData } from '../utils/data';
import 'chart.js/auto';

const SeverityDistribution = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();

      if (data.length === 0) {
        setChartData(null);
        return;
      }

      // Aggregate data by severity
      const severityCount = data.reduce((acc, curr) => {
        acc[curr.severity] = (acc[curr.severity] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(severityCount);
      const values = Object.values(severityCount);

      setChartData({
        labels,
        datasets: [{
          label: 'Severity Distribution',
          data: values,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
      });
    };

    loadData();
  }, []);

  return (
    <div>
      <h2>Severity Distribution</h2>
      {chartData ? <Pie data={chartData} /> : <p>No data available</p>}
    </div>
  );
};

export default SeverityDistribution;
