// src/components/atoms/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  return message ? <p className={`text-red-500 text-xs text-left italic ${className}`}>{message}</p> : null;
};

export default ErrorMessage;

