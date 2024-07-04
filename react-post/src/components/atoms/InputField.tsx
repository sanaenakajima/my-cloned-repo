// src/components/atoms/InputField.tsx
import React from 'react';
import Label from './Label';
import ErrorMessage from './ErrorMessage';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  label?: string;
  error?: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, error, className, id, ...props }) => {
  // idが渡されない場合は、labelからユニークなidを生成する
  const uniqueId = id || label?.replace(/\s+/g, '-').toLowerCase() || `input-${Math.random().toString(36).substring(2, 15)}`;

  return (
    <div className={`input-field ${className}`}>
      {label && <Label htmlFor={uniqueId} className="text-sm text-left font-bold mb-2">{label}</Label>}
      <input
        id={uniqueId}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-red-500'}`}
        {...props}
      />
      <ErrorMessage message={error} />
    </div>
  );
};

export default InputField;
