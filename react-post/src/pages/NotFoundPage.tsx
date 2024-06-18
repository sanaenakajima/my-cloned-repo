import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../components/atoms/Title';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <p className="text-4xl text-gray-700">404</p> 
      <p className="text-2xl text-gray-700 mb-8">NOT FOUND</p> 
      <p className="text-1xl text-gray-700 mb-8">ページが見つかりませんでした。</p>
      <Link to="/" className="text-navy-600 hover:text-navy-800 text-1xl underline">
        トップページに戻る
      </Link>
    </div>
  );
};

export default NotFoundPage;


