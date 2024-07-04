// src/components/atoms/TextAreaField.tsx
import React from 'react';
import ErrorMessage from './ErrorMessage';

type TextAreaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, error, id, className, ...props }) => {
  return (
    <div className={`textarea-field ${className}`}>
      <label htmlFor={id} className="block text-gray-700 text-sm text-left font-bold mb-2">{label}</label>
      <textarea
        id={id}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-red-500'}`}
        {...props}
        style={{ minHeight: '200px' }} 
      ></textarea>
      <ErrorMessage message={error} />
    </div>
  );
};

export default TextAreaField;





