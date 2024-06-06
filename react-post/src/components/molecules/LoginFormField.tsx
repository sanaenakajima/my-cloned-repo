// src/components/molecules/login/LoginFormField.tsx
import React from 'react';
import InputField from '../atoms/LoginInput';

interface LoginFormFieldProps {
    label: string;
    type: 'text' | 'email' | 'password';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string;
}

const LoginFormField: React.FC<LoginFormFieldProps> = ({ label, type, value, onChange, error }) => (
    <div className="mb-6">
        <InputField
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            error={error}
        />
    </div>
);

export default LoginFormField;