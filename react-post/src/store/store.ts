// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
