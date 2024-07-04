// src/components/molecules/ArticleListItem.tsx
import React from 'react';
import { shortenText } from '../../utils/shortenText';

interface ArticleListItemProps {
  article: {
    article_id: number;
    title: string;
    content: string;
  };
  onClick: (articleId: number) => void;
}

const ArticleListItem: React.FC<ArticleListItemProps> = ({ article, onClick }) => {
  return (
    <div 
      className="grid grid-cols-2 border-b border-gray-200 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={() => onClick(article.article_id)}
    >
      <div className="py-2 px-4 font-bold break-words">
        <span className="block sm:hidden">{shortenText(article.title, 10)}</span>
        <span className="hidden sm:block">{article.title}</span>
      </div>
      <div className="py-2 px-4 text-gray-700 break-words">
        <span className="block sm:hidden">{shortenText(article.content, 10)}</span>
        <span className="hidden sm:block">{article.content}</span>
      </div>
    </div>
  );
};

export default ArticleListItem;
