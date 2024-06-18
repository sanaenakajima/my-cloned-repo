// src/components/organisms/ArticleForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { createArticle, updateArticle } from '../../store/articleSlice';
import ArticleFormFields from '../molecules/ArticleFormFields';
import Button from '../atoms/Button';

interface ArticleFormProps {
  mode: 'create' | 'edit';
  initialTitle?: string;
  initialContent?: string;
  articleId?: number;
  onSave?: (updatedArticle: { title: string; content: string; article_id: number }) => Promise<void>;
  onCancel?: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ mode, initialTitle = '', initialContent = '', articleId, onSave, onCancel }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userInfo);

  useEffect(() => {
    console.log('Current user in ArticleForm:', user);
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!user) {
      setSubmitError('ユーザー情報が見つかりません。ログインしてください。');
      return;
    }

    try {
      if (mode === 'create') {
        const response = await dispatch(createArticle({ 
          title, 
          content, 
          user_name: user.name, 
          user_id: user.user_id 
        })).unwrap();
        console.log('Article created successfully:', response);
        navigate(`/articles/${response.article_id}`);
      } else if (mode === 'edit' && articleId) {
        await onSave?.({ title, content, article_id: articleId });
      }
    } catch (error) {
      console.error('Article submission failed:', error);
      setSubmitError('記事の作成に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="text-2xl font-bold mb-10 text-center">{mode === 'create' ? '新規投稿画面' : '記事編集画面'}</h1>
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
      <div className="submit-button-container flex justify-end space-x-2">
        <Button type="submit" disabled={!title || !content}>
          {mode === 'create' ? '投稿する' : '保存'}
        </Button>
        {mode === 'edit' && onCancel && (
          <Button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
            キャンセル
          </Button>
        )}
      </div>
    </form>
  );
};

export default ArticleForm;


