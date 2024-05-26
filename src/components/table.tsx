"use client"

import React, { useEffect, useState } from 'react';
import styles from '@/components/Table.module.css';

interface DataItem {
  _id: string;
  companyName: string;
  TotalRecords: string;
  mailselectedDomain: string;
  selectedDomain: string;
  selectedMailPattern: string;
}

function Table() {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('https://api-codehub.vercel.app/api/conferences/company-input')
      .then(response => response.json())
      .then((data: DataItem[]) => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Company Name</th>
          <th>Total Records</th>
          <th>Mail Selected Domain</th>
          <th>Selected Domain</th>
          <th>Selected Mail Pattern</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.companyName}</td>
            <td>{item.TotalRecords}</td>
            <td>{item.mailselectedDomain}</td>
            <td>{item.selectedDomain}</td>
            <td>{item.selectedMailPattern}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
