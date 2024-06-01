// src/components/TopSourceIPs.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchData } from '../utils/data';
import 'chart.js/auto';

const TopSourceIPs = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();

      if (data.length === 0) {
        setChartData(null);
        return;
      }

      // Aggregate data by source IP
      const sourceCount = data.reduce((acc, curr) => {
        acc[curr.src_ip] = (acc[curr.src_ip] || 0) + 1;
        return acc;
      }, {});

      // Sort and take top 10
      const sortedSourceCount = Object.entries(sourceCount).sort((a, b) => b[1] - a[1]).slice(0, 10);
      const labels = sortedSourceCount.map(entry => entry[0]);
      const values = sortedSourceCount.map(entry => entry[1]);

      setChartData({
        labels,
        datasets: [{
          label: 'Top Source IPs',
          data: values,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        }]
      });
    };

    loadData();
  }, []);

  return (
    <div>
      <h2>Top Source IPs</h2>
      {chartData ? <Bar data={chartData} /> : <p>No data available</p>}
    </div>
  );
};

export default TopSourceIPs;
