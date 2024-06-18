// src/pages/LoginPage.tsx
import React from 'react';
import LoginForm from '../components/organisms/LoginForm';
import Title from '../components/atoms/Title';

const LoginPage: React.FC = () => (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 bg-gray-100">
        <div className="w-full max-w-md p-6">
            <Title text="ログイン" className="mb-12" />
            <LoginForm />
        </div>
    </div>
);

export default LoginPage;
