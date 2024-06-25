// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import articleReducer from './articleSlice';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';

export interface ArticleState {
  items: any[]; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    articles: articleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

