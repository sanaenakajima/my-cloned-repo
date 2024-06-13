import React from 'react';
import ArticleList from '../components/organisms/ArticleList';

const ArticleListPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 max-w-screen-lg">
      <h1 className="text-2xl font-bold mb-4 text-center mt-20 mb-8">投稿一覧画面</h1>
      <ArticleList />
    </div>
  );
};

export default ArticleListPage;

