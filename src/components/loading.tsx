import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center h-screen'>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex justify-center items-center h-20 w-full">
          <div className="animate-pulse flex space-x-4">
            <div className="bg-gray-400 h-8 w-32 rounded"></div>
            <div className="bg-gray-400 h-8 w-32 rounded"></div>
            <div className="bg-gray-400 h-8 w-32 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingScreen;
