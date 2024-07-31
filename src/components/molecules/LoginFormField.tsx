// src/components/molecules/LoginFormField.tsx
import React, { ChangeEvent } from 'react';
import CustomTextField from '../atoms/CustomTextField';

interface LoginFormFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const LoginFormField: React.FC<LoginFormFieldProps> = ({ label, type, value, onChange, error }) => (
  <CustomTextField
    label={label}
    type={type}
    value={value}
    onChange={onChange}
    fullWidth
    margin="normal"
    error={!!error}
    helperText={error}
  />
);

export default LoginFormField;
