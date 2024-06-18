// src/pages/TestPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestPage: React.FC = () => {
  const navigate = useNavigate();

  const trigger404Error = () => {
    navigate('/non-existing-endpoint');  // 存在しないルートに移動して404ページを表示
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <button onClick={trigger404Error} className="bg-navy-700 text-white font-bold py-2 px-4 rounded">
        Trigger 404 Error
      </button>
    </div>
  );
};

export default TestPage;
