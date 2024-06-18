// src/components/molecules/ArticleAuthor.tsx
import React from 'react';
import Text from '../atoms/Text';

interface ArticleAuthorProps {
  authorName: string;
  className?: string;
}

const ArticleAuthor: React.FC<ArticleAuthorProps> = ({ authorName, className }) => {
  return <Text text={`投稿者: ${authorName}`} className={`text-gray-600 text-sm ${className}`} />;
};

export default ArticleAuthor;
