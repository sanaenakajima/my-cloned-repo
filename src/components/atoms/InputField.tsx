// src/components/atoms/InputField.tsx
import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  className?: string;
  id: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, error, className, id }) => (
  <div className={`input-field ${className}`}>
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className={`shadow appearance-none border ${error ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
    />
    {error && <p className="text-red-500 text-xs italic">{error}</p>}
  </div>
);

export default InputField;
