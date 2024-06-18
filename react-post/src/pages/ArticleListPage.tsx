// src/pages/ArticleListPage.tsx
import React from 'react';
import Title from '../components/atoms/Title';
import ArticleList from '../components/organisms/ArticleList';

const ArticleListPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-14">
      <div className="container mx-auto p-4 max-w-screen-lg">
        <Title text="投稿一覧画面"/>
        <ArticleList />
      </div>
    </div>
  );
};

export default ArticleListPage;


