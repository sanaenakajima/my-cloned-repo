// src/components/organisms/ArticleList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchArticles, setCurrentPage } from '../../store/articleSlice';
import { useNavigate } from 'react-router-dom';
import ArticleListItem from '../molecules/ArticleListItem';
import Pagination from '../molecules/Pagination';
import LoadingSpinner from '../atoms/LoadingSpinner';
import { Box, Typography, Paper } from '@mui/material';

const ArticleList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { articles, currentPage, totalPages, status, error, totalItems, from, to } = useSelector((state: RootState) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles(currentPage));
  }, [dispatch, currentPage]);

  const handleArticleClick = (articleId: number) => {
    navigate(`/articles/${articleId}`);
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <Typography color="error">
        Error: {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#0d1b2a', py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {status === 'succeeded' && articles.length > 0 ? (
        <Box sx={{ width: '100%' }}>
          <Typography sx={{ textAlign: 'center', mb: 4, color: '#EEEEEE' }}>
            Showing {from} - {to} of {totalItems} articles
          </Typography>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', px: 2 }}>
            {articles.map((article) => (
              <ArticleListItem 
                key={article.article_id} 
                article={article} 
                onClick={handleArticleClick}
              />
            ))}
          </Box>
          <Box sx={{ mt: 8 }}>
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange}
            />
          </Box>
        </Box>
      ) : (
        <Typography sx={{ textAlign: 'center', mt: 4, color: '#EEEEEE' }}>
          No articles found.
        </Typography>
      )}
    </Box>
  );
};

export default ArticleList;
