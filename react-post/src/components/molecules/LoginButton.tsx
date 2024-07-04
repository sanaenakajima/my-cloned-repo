// src/components/molecules/LoginButton.tsx
import React from 'react';
import Button from '../atoms/Button';

interface LoginButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const LoginButton: React.FC<LoginButtonProps> = ({ type = 'submit', onClick, disabled, children }) => (
  <Button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`py-3 px-6 ${disabled ? 'bg-gray-300' : 'bg-navy-700 hover:bg-navy-900'}`}
  >
    {children}
  </Button>
);

export default LoginButton;

