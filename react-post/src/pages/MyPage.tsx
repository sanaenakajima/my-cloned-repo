// src/pages/MyPage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchUser } from '../store/userSlice';
import UserProfile from '../components/molecules/UserProfile';
import LoadingSpinner from '../components/atoms/LoadingSpinner';

const MyPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo, status, errors, token } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const userId = localStorage.getItem('user_id'); // ローカルストレージからユーザーIDを取得
    if (token && userId) {
      dispatch(fetchUser(userId));
    }
  }, [dispatch, token]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div>Error: {errors.general}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="container mx-auto flex justify-center items-start -mt-32">
        {userInfo ? (
          <UserProfile email={userInfo.email} representativeImage={userInfo.representative_image} />
        ) : (
          <div>ユーザー情報が見つかりません</div>
        )}
      </div>
    </div>
  );
};

export default MyPage;









