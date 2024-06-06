import React from 'react';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => (
    <button onClick={onClick} className={`bg-navy-700 hover:bg-navy-900 text-white font-bold py-2 px-4 rounded ${className}`}>
        {children}
    </button>
);

export default Button;