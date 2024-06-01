// src/components/Dashboard.js
import React from 'react';
import AlertsOverTime from './AlertsOverTime';
import SeverityDistribution from './SeverityDistribution';
import TopSourceIPs from './TopSourceIPs';

const Dashboard = () => {
  return (
    <div style={{ backgroundColor: '#2d2d2d', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <h1>Network Alerts Dashboard</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <AlertsOverTime />
        <SeverityDistribution />
        <TopSourceIPs />
      </div>
    </div>
  );
};

export default Dashboard;
