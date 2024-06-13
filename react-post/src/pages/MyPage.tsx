// src/pages/MyPage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchUser } from '../store/userSlice';
import UserProfile from '../components/molecules/UserProfile';

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
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {errors.general}</div>;
  }

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen" style={{ marginTop: '-10%' }}>
      {userInfo ? (
        <UserProfile email={userInfo.email} representativeImage={userInfo.representative_image} />
      ) : (
        <div>ユーザー情報が見つかりません</div>
      )}
    </div>
  );
};

export default MyPage;





