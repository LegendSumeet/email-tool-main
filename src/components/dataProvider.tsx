"use client"


import { SheetError } from '@/app/update-unproccess-error/colums';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';



interface DataContextType {
  data: SheetError[];
  fetchData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<SheetError[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api-codehub.vercel.app/api/conferences/company-input");
      const newData: SheetError[] = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
