// components/atoms/login/LoginLabel.tsx
import React from 'react';

interface LoginLabelProps {
    htmlFor: string;
    children: React.ReactNode;
}

const LoginLabel: React.FC<LoginLabelProps> = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="block text-gray-700">
        {children}
    </label>
);

export default LoginLabel;