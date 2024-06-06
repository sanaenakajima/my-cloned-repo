// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  userIcon: string | null;
  errors: {
    email: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
    userIcon: string;
  };
}

const initialState: UserState = {
  email: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
  userIcon: null,
  errors: {
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    userIcon: ''
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setPasswordConfirm: (state, action: PayloadAction<string>) => {
      state.passwordConfirm = action.payload;
    },
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    setUserIcon: (state, action: PayloadAction<string | null>) => {
      state.userIcon = action.payload;
    },
    setErrors: (state, action: PayloadAction<typeof initialState.errors>) => {
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = initialState.errors;
    }
  }

});

export const { setEmail, setPassword, setPasswordConfirm, setNickname, setUserIcon, setErrors, clearErrors } = userSlice.actions;
export default userSlice.reducer;