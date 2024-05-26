"use client";


import { useEffect } from 'react';
import axios from 'axios';

export default function DownloadExcel() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/downloads');
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.xlsx');
        document.body.appendChild(link);
        link.click();
        console.log('Excel file downloaded');
      } catch (error) {
        console.error('Error downloading Excel file:', error);
      }
    };

    fetchData();
  }, []);

  return <div>Downloading Excel file...</div>;
}
