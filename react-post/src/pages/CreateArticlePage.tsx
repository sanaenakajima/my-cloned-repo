// src/pages/CreateArticlePage.tsx
import React from 'react';
import ArticleForm from '../components/organisms/ArticleForm';

const CreateArticlePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 bg-gray-100">
      <ArticleForm />
    </div>
  );
};

export default CreateArticlePage;
