// src/components/atoms/InputField.tsx
import React from 'react';
import ErrorMessage from './ErrorMessage';

// InputFieldProps 型の定義
type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

// InputField コンポーネントの定義
const InputField: React.FC<InputFieldProps> = ({ label, error, className, ...props }) => {
  return (
    <div className={`input-field ${className}`}>
      <label className="block text-gray-700 text-sm text-left font-bold mb-2">{label}</label>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-red-500'}`}
        {...props}
      />
      <ErrorMessage message={error} />
    </div>
  );
};

export default InputField;


