// components/atoms/ErrorMessage.tsx
import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="error">{message}</div>
  );
}

export default ErrorMessage;
