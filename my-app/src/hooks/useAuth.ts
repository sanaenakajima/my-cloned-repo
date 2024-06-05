//src/hooks/useAuth.ts//
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { logout } from '../store/userSlice';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const tokenExpiry = useAppSelector((state) => state.user.tokenExpiry);

  useEffect(() => {
    if (token && tokenExpiry) {
      const now = Date.now();
      if (now > tokenExpiry) {
        dispatch(logout());
      }
    }
  }, [token, tokenExpiry, dispatch]);

  const isAuthenticated = Boolean(token && tokenExpiry && Date.now() <= tokenExpiry);

  return { isAuthenticated };
};

export default useAuth;






