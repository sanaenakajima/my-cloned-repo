// src/components/atoms/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 font-semibold rounded text-white ${props.disabled ? 'bg-navy-600 cursor-not-allowed' : 'bg-navy-700 hover:bg-navy-800'} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;



