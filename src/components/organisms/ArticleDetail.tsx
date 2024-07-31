// src/components/organisms/ArticleDetail.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticleById, deleteArticle } from '../../store/articleSlice';
import { RootState, AppDispatch } from '../../store/store';
import Button from '../atoms/Button';
import LoadingSpinner from '../atoms/LoadingSpinner';
import { Box, Typography } from '@mui/material';

interface ArticleDetailProps {
  onEdit: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ onEdit }) => {
  const { articleId } = useParams<{ articleId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const article = useSelector((state: RootState) => state.articles.selectedArticle);
  const status = useSelector((state: RootState) => state.articles.status);

  useEffect(() => {
    if (articleId) {
      dispatch(fetchArticleById(Number(articleId)));
    }
  }, [dispatch, articleId]);

  const handleDelete = () => {
    if (article && window.confirm('本当に削除しますか？')) {
      dispatch(deleteArticle(article.article_id)).unwrap().then(() => {
        navigate('/article-list'); 
      });
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (!article) {
    return <div>No article found</div>;
  }

  return (
    <Box sx={{ maxWidth: '800px', width: '100%', p: 3, bgcolor: '#1b263b', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, color: 'white' }}>{article.title}</Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'white' }}>{article.content}</Typography>
      <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', color: 'gray' }}>{article.user_name}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button onClick={onEdit} sx={{ mr: 2 }}>
          Edit
        </Button>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default ArticleDetail;
