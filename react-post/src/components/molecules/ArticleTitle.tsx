// src/components/molecules/ArticleTitle.tsx
import React from 'react';
import Text from '../atoms/Text';

interface ArticleTitleProps {
  title: string;
}

const ArticleTitle: React.FC<ArticleTitleProps> = ({ title }) => {
  return <Text text={title} className="text-gray-900 text-xl font-bold" />;
};

export default ArticleTitle;
