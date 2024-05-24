// src/components/atoms/InputField.tsx
import React from 'react';
import ErrorMessage from './ErrorMessage';

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string;
    className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, error, className }) => {
    return (
        <div className={`input-field ${className}`}>
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-red-500'}`}
            />
            <ErrorMessage error={error} />
        </div>
    );
};

export default InputField;
