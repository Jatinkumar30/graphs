// src/utils/data.js
import axios from 'axios';

export const fetchData = async () => {
  const response = await axios.get('/eve.json');
  const rawData = response.data.split('\n').filter(line => line)?.map(line => JSON.parse(line));
  
  // Preprocess data
  const processedData = rawData.map(item => ({
    timestamp: new Date(item.timestamp),
    src_ip: item.src_ip,
    dest_ip: item.dest_ip,
    severity: item.alert?.severity,
    category: item.alert?.category,
    signature: item.alert?.signature
  }));

  return processedData;
};
