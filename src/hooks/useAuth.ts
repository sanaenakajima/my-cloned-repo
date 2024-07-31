// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchUserThunk, setAuthenticated } from '../store/userSlice';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.user.isLoggedIn);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserThunk(userId));
      dispatch(setAuthenticated(true));
    }
  }, [dispatch, userId]);

  return { isAuthenticated };
};

export default useAuth;
