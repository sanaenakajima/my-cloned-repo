// components/atoms/login/LoginErrorMessage.tsx
import React from 'react';

interface LoginErrorMessageProps {
    message: string;
}

const LoginErrorMessage: React.FC<LoginErrorMessageProps> = ({ message }) => (
    <p className="text-red-500 text-sm">{message}</p>
);

export default LoginErrorMessage;