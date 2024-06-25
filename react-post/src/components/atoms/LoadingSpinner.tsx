// src/components/atoms/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center -mt-60 h-screen" data-testid="loading-spinner">
      <div className="text-xl font-bold text-navy-700 animate-bounce">Loading...</div>
    </div>
  );
};

export default LoadingSpinner;











