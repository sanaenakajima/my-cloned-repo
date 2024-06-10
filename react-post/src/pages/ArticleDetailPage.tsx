// src/pages/ArticleDetailPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetailPage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">記事詳細ページ</h1>
      <p>記事ID: {articleId}</p>
      {/* ここに記事の詳細内容を表示するロジックを追加します */}
    </div>
  );
};

export default ArticleDetailPage;
