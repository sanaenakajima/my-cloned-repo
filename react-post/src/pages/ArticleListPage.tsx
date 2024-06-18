//src/pages/ArticleListPage
import React from 'react';
import ArticleList from '../components/organisms/ArticleList';

const ArticleListPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="container mx-auto p-4 max-w-screen-lg">
        <h1 className="text-2xl font-bold text-center mt-14">投稿一覧画面</h1>
        <ArticleList />
      </div>
    </div>
  );
};

export default ArticleListPage;


