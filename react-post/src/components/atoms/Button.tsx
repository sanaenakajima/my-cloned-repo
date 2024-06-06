// src/components/atoms/Button.tsx
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button className={`bg-navy-700 hover:bg-navy-900 text-white font-bold py-2 px-4 rounded ${className}`} {...props}>
    {children}
  </button>
);

export default Button;
