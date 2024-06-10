// src/components/atoms/TextAreaField.tsx
import React from 'react';
import ErrorMessage from './ErrorMessage';

type TextAreaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, error, className, ...props }) => {
  return (
    <div className={`textarea-field ${className}`}>
      <label className="block text-gray-700 text-sm text-left font-bold mb-2">{label}</label>
      <textarea
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-red-500'}`}
        {...props}
        style={{ minHeight: '200px' }} // 高さを調整
      ></textarea>
      <ErrorMessage message={error} />
    </div>
  );
};

export default TextAreaField;


