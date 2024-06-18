// src/pages/CreateArticlePage.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchUser } from '../store/userSlice';
import ArticleForm from '../components/organisms/ArticleForm';

const CreateArticlePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (!userInfo && userId) {
      dispatch(fetchUser(userId));
    }
  }, [dispatch, userInfo, userId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-10 bg-gray-100">
      <ArticleForm mode="create" />
    </div>
  );
};

export default CreateArticlePage;

