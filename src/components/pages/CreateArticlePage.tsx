// src/components/pages/CreateArticlePage.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchUserThunk } from '../../store/userSlice';
import ArticleForm from '../organisms/ArticleForm';
import { Container, Box, Typography } from '@mui/material';

const CreateArticlePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (!userInfo && userId) {
      dispatch(fetchUserThunk(userId));
    }
  }, [dispatch, userInfo, userId]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0d1b2a', pt: 10 }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" sx={{ color: 'white', mb: 4 }}>
          Create New Article
        </Typography>
        <ArticleForm mode="create" />
      </Container>
    </Box>
  );
};

export default CreateArticlePage;
