// src/store/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { registerUser, loginUser, fetchUser, updateUser } from '../services/api';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.19:5000';

export interface UserState {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  userIcon: string | null;
  token: string | null;
  tokenExpiry: number | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  errors: {
    email: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
    userIcon: string;
    general: string;
  };
  userInfo: {
    user_id: string;
    id: string;
    email: string;
    nickname: string;
    representative_image: string;
  } | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  email: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
  userIcon: null,
  token: localStorage.getItem('access_token'),
  tokenExpiry: Number(localStorage.getItem('token_expiry')),
  status: 'idle',
  errors: {
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    userIcon: '',
    general: ''
  },
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null,
  isLoggedIn: Boolean(localStorage.getItem('access_token') && Date.now() <= Number(localStorage.getItem('token_expiry')))
};

export const register = createAsyncThunk(
  'user/register',
  async (userData: { nickname: string; email: string; password: string; password_confirmation: string; representative_image: string }, { dispatch }) => {
    try {
      const response = await registerUser(userData.nickname, userData.email, userData.password, userData.representative_image);
      const tokenExpiry = Date.now() + 60 * 60 * 1000; // 60分後
      localStorage.setItem('access_token', response.token);
      localStorage.setItem('token_expiry', tokenExpiry.toString());
      localStorage.setItem('user_id', response.id);

      dispatch(setToken({ token: response.token, tokenExpiry }));
      dispatch(setAuthenticated(true));
      dispatch(fetchUserThunk(response.id)); // 登録完了後にユーザー情報をフェッチ
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to register');
      } else {
        throw new Error('Failed to register');
      }
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }, { dispatch }) => {
    try {
      const response = await loginUser(credentials.email, credentials.password);
      const tokenExpiry = Date.now() + 60 * 60 * 1000; // 60分後
      localStorage.setItem('access_token', response.token);
      localStorage.setItem('token_expiry', tokenExpiry.toString());
      localStorage.setItem('user_id', response.user.id);
      dispatch(fetchUserThunk(response.user.id)); // ログイン完了後にユーザー情報をフェッチ
      return { token: response.token, tokenExpiry, userInfo: response.user };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to login');
      } else {
        throw new Error('Failed to login');
      }
    }
  }
);

export const fetchUserThunk = createAsyncThunk(
  'user/fetchUser',
  async (userId: string) => {
    try {
      const response = await fetchUser(userId);
      return {
        ...response,
        user_id: response.id  // idプロパティを追加
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`HTTP error! status: ${error.response.status}`);
      } else {
        throw new Error('Failed to fetch user');
      }
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (userData: { email: string; nickname: string; representative_image: string }, { dispatch, rejectWithValue }) => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      return rejectWithValue('User ID not found');
    }
    try {
      const response = await updateUser(userId, userData);
      dispatch(fetchUserThunk(userId)); // 更新完了後にユーザー情報を再フェッチ
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to update user');
      } else {
        return rejectWithValue('Failed to update user');
      }
    }
  }
);

const userSlice = createSlice({
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
    },
    logout: (state) => {
      state.token = null;
      state.tokenExpiry = null;
      state.isLoggedIn = false;
      state.userInfo = null;
      localStorage.removeItem('access_token');
      localStorage.removeItem('token_expiry');
      localStorage.removeItem('user_id');
      localStorage.removeItem('userInfo');
    },
    setToken: (state, action: PayloadAction<{ token: string; tokenExpiry: number }>) => {
      state.token = action.payload.token;
      state.tokenExpiry = action.payload.tokenExpiry;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<{ id: string; user_id: string; email: string; nickname: string; representative_image: string }>) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.errors.general = action.error.message || 'Failed to register';
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.tokenExpiry = action.payload.tokenExpiry;
        state.userInfo = action.payload.userInfo;
        localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.errors.general = action.error.message || 'Failed to login';
      })
      .addCase(fetchUserThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.errors.general = action.error.message || 'Failed to fetch user';
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.errors.general = action.payload as string || 'Failed to update user';
      });
  }
});

export const {
  setEmail,
  setPassword,
  setPasswordConfirm,
  setNickname,
  setUserIcon,
  setErrors,
  clearErrors,
  logout,
  setToken,
  setAuthenticated,
  setUserInfo
} = userSlice.actions;

export default userSlice.reducer;
