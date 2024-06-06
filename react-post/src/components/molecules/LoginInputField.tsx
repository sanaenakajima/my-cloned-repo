// src/components/molecules/LoginInputField.tsx
import React from 'react';
import InputField from '../atoms/InputField';

interface LoginInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const LoginInputField: React.FC<LoginInputFieldProps> = (props) => {
  return <InputField {...props} />;
};

export default LoginInputField;
