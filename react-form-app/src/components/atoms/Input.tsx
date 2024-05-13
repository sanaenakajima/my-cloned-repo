// components/atoms/Input.tsx
import React from "react";

interface InputProps {
  type: string;
  id: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input: React.FC<InputProps> = ({ type, id, placeholder, name, value, onChange, error }) => {
  return (
    <div className="inputContainer">
      <input type={type} id={id} placeholder={placeholder} name={name} value={value} onChange={onChange} />
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Input;
