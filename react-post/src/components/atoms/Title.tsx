// src/components/atoms/Title.tsx
import React from 'react';

interface TitleProps {
  text: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ text, className }) => {
  return <h1 className={`text-2xl font-bold text-center text-navy-800${className}`}>{text}</h1>;
};

export default Title;
