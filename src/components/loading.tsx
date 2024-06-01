import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-pulse flex space-x-4">
        <div className="bg-gray-400 h-8 w-32 rounded"></div>
        <div className="bg-gray-400 h-8 w-32 rounded"></div>
        <div className="bg-gray-400 h-8 w-32 rounded"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
