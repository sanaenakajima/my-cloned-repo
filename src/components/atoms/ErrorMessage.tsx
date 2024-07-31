// src/components/atoms/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => (
  <div className={`text-red-500 text-sm ${className}`}>
    {message}
  </div>
);

export default ErrorMessage;
