//components/molecules/FormField.tsx
import React from "react";
import Input from "../atoms/Input"; 
import ErrorMessage from "../atoms/ErrorMessage"; 

interface FormFieldProps {
  type: string;
  id: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ type, id, placeholder, name, value, onChange, error }) => {
  return (
    <div>
      <Input type={type} id={id} placeholder={placeholder} name={name} value={value} onChange={onChange} />
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default FormField;

