// src/components/atoms/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen pt-10 bg-lightGray-500">
      <div className="flex space-x-2 text-navy-700">
        <div className="dot1 animate-bounce">L</div>
        <div className="dot2 animate-bounce">o</div>
        <div className="dot3 animate-bounce">a</div>
        <div className="dot4 animate-bounce">d</div>
        <div className="dot5 animate-bounce">i</div>
        <div className="dot6 animate-bounce">n</div>
        <div className="dot7 animate-bounce">g</div>
        <div className="dot8 animate-bounce text-teal-500">.</div>
        <div className="dot9 animate-bounce text-gold-500">.</div>
        <div className="dot10 animate-bounce text-teal-500">.</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;






