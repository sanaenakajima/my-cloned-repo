// src/components/molecules/LoginInputField.tsx
import React from 'react';
import InputField from '../atoms/InputField';

interface LoginInputFieldProps {
  label: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  className?: string;
}

const LoginInputField: React.FC<LoginInputFieldProps> = (props) => {
  return <InputField {...props} />;
};

export default LoginInputField;

