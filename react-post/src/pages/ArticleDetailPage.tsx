// src/pages/ArticleDetailPage.tsx
import React, { useState } from 'react';
import Title from '../components/atoms/Title';
import ArticleDetail from '../components/organisms/ArticleDetail';
import ArticleForm from '../components/organisms/ArticleForm';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { updateArticle, fetchArticleById } from '../store/articleSlice';

const ArticleDetailPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const article = useSelector((state: RootState) => state.articles.selectedArticle);
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async (updatedArticle: { title: string; content: string; article_id: number }) => {
    await dispatch(updateArticle({ ...updatedArticle, user_id: article!.user_id })).unwrap();
    setIsEditing(false);
    dispatch(fetchArticleById(updatedArticle.article_id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="container mx-auto p-4">
        <div className="text-center mt-12">
          <Title text={isEditing ? "記事編集画面" : "投稿詳細画面"} />
        </div>
        <div className="w-full flex justify-center mt-12">
          {!isEditing ? (
            <ArticleDetail onEdit={() => setIsEditing(true)} />
          ) : (
            <ArticleForm
              mode="edit"
              initialTitle={article?.title || ''}
              initialContent={article?.content || ''}
              articleId={article?.article_id}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
