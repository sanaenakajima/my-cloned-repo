// src/components/molecules/ArticleContent.tsx
import React from 'react';
import Text from '../atoms/Text';

interface ArticleContentProps {
  content: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  return <Text text={content} className="text-gray-800 mt-4 break-words" />;
};

export default ArticleContent;
