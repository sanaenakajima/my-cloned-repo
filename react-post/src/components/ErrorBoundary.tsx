// src/components/ErrorBoundary.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorBoundaryProps {
  error: any;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ error }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const status = error.response ? error.response.status : null;

      switch (status) {
        case 400:
          // console.error('APIエラーが発生しました。'); 
          // alert('APIエラーが発生しました。');
          break;
        case 401:
          // console.error('認証が必要です。ログインしてください。'); 
          // alert('認証が必要です。ログインしてください。');
          // navigate('/login');
          break;
        case 404:
          // console.error('ページが見つかりません。'); 
          // navigate('/not-found');
          break;
        case 500:
          // console.error('サーバーエラーが発生しました。'); 
          // alert('サーバーエラーが発生しました。');
          // navigate('/');
          break;
        default:
          // console.error('エラーが発生しました。'); 
          // alert('エラーが発生しました。');
          break;
      }
      
      // どのエラーでも404ページに遷移する
      navigate('/not-found');
    }
  }, [error, navigate]);

  return null;
};

export default ErrorBoundary;

