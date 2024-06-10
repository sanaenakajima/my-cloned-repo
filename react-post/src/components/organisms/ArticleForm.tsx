// src/components/organisms/ArticleForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { createArticle } from '../../store/articleSlice';
import ArticleFormFields from '../molecules/ArticleFormFields';
import Button from '../atoms/Button';

const ArticleForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    try {
      const response = await dispatch(createArticle({ title, content })).unwrap();
      console.log('Article created successfully:', response);
      navigate(`/articles/${response.article_id}`);
    } catch (error) {
      console.error('Article creation failed:', error);
      setSubmitError('記事の作成に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="text-2xl font-bold mb-6 text-center">新規投稿画面</h1>
      <ArticleFormFields
        title={title}
        content={content}
        onFieldChange={(e) => {
          const { name, value } = e.target;
          if (name === 'title') setTitle(value);
          if (name === 'content') setContent(value);
        }}
      />
      {submitError && (
        <div className="text-red-500 text-sm mb-4 text-center">{submitError}</div>
      )}
      <div className="submit-button-container flex justify-end">
        <Button type="submit" disabled={!title || !content}>
          投稿する
        </Button>
      </div>
    </form>
  );
};

export default ArticleForm;


















