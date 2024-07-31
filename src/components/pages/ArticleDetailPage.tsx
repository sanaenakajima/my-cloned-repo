import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Title from '../atoms/Title';
import ArticleForm from '../organisms/ArticleForm';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { updateArticle, fetchArticleById, deleteArticle } from '../../store/articleSlice';
import LoadingSpinner from '../atoms/LoadingSpinner';
import { Box, Container, Typography } from '@mui/material';
import Button from '../atoms/Button';

const ArticleDetailPage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const article = useSelector((state: RootState) => state.articles.selectedArticle);
  const status = useSelector((state: RootState) => state.articles.status);

  useEffect(() => {
    if (articleId) {
      dispatch(fetchArticleById(Number(articleId)));
    }
  }, [dispatch, articleId]);

  const handleSave = async (updatedArticle: { title: string; content: string; article_id: number }) => {
    await dispatch(updateArticle({ ...updatedArticle, user_id: article!.user_id })).unwrap();
    setIsEditing(false);
    navigate(`/articles/${updatedArticle.article_id}`);
    dispatch(fetchArticleById(updatedArticle.article_id)); // 最新のデータを取得
  };

  const handleDelete = () => {
    if (article && window.confirm('本当に削除しますか？')) {
      dispatch(deleteArticle(article.article_id)).unwrap().then(() => {
        navigate('/article-list'); // 削除後に記事一覧ページに遷移
      });
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (!article) {
    return <div>記事が見つかりませんでした。</div>;
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0d1b2a', pt: 10 }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" sx={{ color: 'white', mb: 4 }}>
          {isEditing ? 'Edit Article' : 'Article Details'}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {!isEditing ? (
            <Box sx={{ maxWidth: '800px', width: '100%', p: 3, bgcolor: '#1b263b', borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h5" sx={{ mb: 2, color: 'white' }}>{article.title}</Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'white' }}>{article.content}</Typography>
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', color: 'gray' }}>{article.user_name}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button onClick={() => setIsEditing(true)} sx={{ mr: 2 }}>
                  Edit
                </Button>
                <Button onClick={handleDelete} color="secondary">
                  Delete
                </Button>
              </Box>
            </Box>
          ) : (
            <ArticleForm
              mode="edit"
              initialTitle={article.title}
              initialContent={article.content}
              articleId={article.article_id}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ArticleDetailPage;
