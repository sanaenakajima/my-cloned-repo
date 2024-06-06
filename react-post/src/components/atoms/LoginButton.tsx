// src/components/atoms/login/LoginButton.tsx
import React from 'react';

interface LoginButtonProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}

const LoginButton: React.FC<LoginButtonProps> = ({ type = 'submit', onClick, disabled, children }) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`py-3 px-6 font-bold text-white rounded ${disabled ? 'bg-gray-300' : 'bg-navy-700 hover:bg-navy-900'
            }`}
    >
        {children}
    </button>
);

export default LoginButton;