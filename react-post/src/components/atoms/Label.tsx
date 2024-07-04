// src/components/atoms/Label.tsx
import React from 'react';

// LabelProps 型の定義
type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
};

// Label コンポーネントの定義
const Label: React.FC<LabelProps> = ({ children, className, ...props }) => (
  <label className={`block text-gray-700 ${className}`} {...props}>
    {children}
  </label>
);

export default Label;
