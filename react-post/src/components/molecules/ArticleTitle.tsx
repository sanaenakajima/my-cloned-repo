// src/components/molecules/ArticleTitle.tsx
import React from 'react';

interface ArticleTitleProps {
  title: string;
  className?: string;
}

const ArticleTitle: React.FC<ArticleTitleProps> = ({ title, className }) => {
  return <h1 className={`text-2xl font-bold break-words overflow-hidden ${className}`}>{title}</h1>;
};

export default ArticleTitle;
