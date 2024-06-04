// pages/LoginPage.tsx
import React from 'react';
import LoginForm from '../components/organisms/LoginForm';

const LoginPage: React.FC = () => (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 bg-gray-100">
      <div className="w-full max-w-md p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-navy-800">ログイン</h2>
        <LoginForm />
      </div>
    </div>
  );
  
  export default LoginPage;