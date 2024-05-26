// pages/index.js (or any other page)
import React from 'react';
import Table from '@/components/table';
import NavigationMenuDemo from '@/lib/navbar';


export default async function  HomePage() {
  return (
    <div className=' justify-center px-12'>
      <NavigationMenuDemo />
      <h1>Data Table</h1>
      <Table />
    </div>
  );
}

