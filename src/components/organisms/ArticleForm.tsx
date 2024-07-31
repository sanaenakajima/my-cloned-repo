// src/components/organisms/ArticleForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { createArticle } from '../../store/articleSlice';
import ArticleFormFields from '../molecules/ArticleFormFields';
import Button from '../atoms/Button';
import { Box, Typography } from '@mui/material';

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
    console.log('User:', user);
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!user) {
      setSubmitError('ユーザー情報が見つかりません。ログインしてください。');
      return;
    }

    console.log('User ID:', user.user_id);
    console.log('Title:', title);
    console.log('Content:', content);

    try {
      if (mode === 'create') {
        const response = await dispatch(createArticle({ 
          title, 
          content, 
          user_name: user.nickname, 
          user_id: user.user_id
        })).unwrap();
        console.log('Article created:', response);
        navigate(`/articles/${response.article_id}`);
      } else if (mode === 'edit' && articleId) {
        await onSave?.({ title, content, article_id: articleId });
        console.log('Article updated');
        navigate(`/articles/${articleId}`);
      }
    } catch (error) {
      setSubmitError('記事の作成に失敗しました。もう一度お試しください。');
      console.error('Error creating article:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '600px', mx: 'auto', bgcolor: '#0d1b2a' }}>
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
        <Typography variant="body2" color="error" sx={{ mb: 2, textAlign: 'center' }}>{submitError}</Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          type="submit"
          disabled={!title || !content}
          sx={{
            position: 'relative',
            color: '#EEEEEE',
            textTransform: 'none',
            backgroundColor: 'transparent',
            border: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
              '&::after': {
                transform: 'scaleX(1)',
              }
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-1px', 
              left: '0',
              width: '100%',
              height: '2px',
              backgroundColor: '#EEEEEE',
              transform: 'scaleX(0)',
              transformOrigin: 'center',
              transition: 'transform 0.3s ease',
            },
          }}
        >
          {mode === 'create' ? 'Post' : 'Save'}
        </Button>
        {mode === 'edit' && onCancel && (
          <Button 
            type="button"
            onClick={onCancel}
            sx={{
              position: 'relative',
              color: '#EEEEEE',
              textTransform: 'none',
              backgroundColor: 'transparent',
              border: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                '&::after': {
                  transform: 'scaleX(1)',
                }
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-1px', 
                left: '0',
                width: '100%',
                height: '2px',
                backgroundColor: '#EEEEEE',
                transform: 'scaleX(0)',
                transformOrigin: 'center',
                transition: 'transform 0.3s ease',
              },
            }}
          >
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ArticleForm;