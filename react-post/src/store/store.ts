// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer
  }
});

// RootState の型定義
export type RootState = ReturnType<typeof store.getState>;