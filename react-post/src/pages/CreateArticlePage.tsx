// src/pages/CreateArticlePage.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchUser } from '../store/userSlice';
import ArticleForm from '../components/organisms/ArticleForm';
import Title from '../components/atoms/Title';

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
      <div className="w-full max-w-4xl mx-auto p-4">
        <Title text="新規投稿画面" className="mb-7 text-center" />
        <ArticleForm mode="create" />
      </div>
    </div>
  );
};

export default CreateArticlePage;



