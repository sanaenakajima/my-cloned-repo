// src/components/atoms/Text.tsx
import React from 'react';

interface TextProps {
  text: string;
  className?: string;
}

const Text: React.FC<TextProps> = ({ text, className }) => {
  return <p className={`text-base ${className}`}>{text}</p>;
};

export default Text;
