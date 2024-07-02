// src/store/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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
    name: string;
    email: string;
    representative_image: string;
  } | null;
  isLoggedIn: boolean; // ここを追加
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
  isLoggedIn: Boolean(localStorage.getItem('access_token') && Date.now() <= Number(localStorage.getItem('token_expiry'))) // ここを追加
};


export const register = createAsyncThunk(
  'user/register',
  async (userData: { name: string; email: string; password: string; password_confirmation: string; representative_image: string }, { dispatch }) => {
    try {
      const response = await axios.post('/user', userData);
      const data = response.data;
      const tokenExpiry = Date.now() + 60 * 60 * 1000; // 60分後
      localStorage.setItem('access_token', data.token);
      localStorage.setItem('token_expiry', tokenExpiry.toString());
      localStorage.setItem('user_id', data.user_id); // ユーザーIDを保存

      // ログインアクションの代わりに、直接トークンと認証情報を設定
      dispatch(setToken({ token: data.token, tokenExpiry }));
      dispatch(setAuthenticated(true));
      return data;
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
  async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post('/login', credentials);
      const data = response.data;
      const tokenExpiry = Date.now() + 60 * 60 * 1000; // 60分後
      localStorage.setItem('access_token', data.user.token);
      localStorage.setItem('token_expiry', tokenExpiry.toString());
      localStorage.setItem('user_id', data.user.user_id); // ユーザーIDを保存
      return { token: data.user.token, tokenExpiry, userInfo: data.user };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to login');
      } else {
        throw new Error('Failed to login');
      }
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: string) => {
    try {
      const response = await axios.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`HTTP error! status: ${error.response.status}`);
      } else {
        throw new Error('Failed to fetch user');
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: { email: string; nickname: string; representative_image: string }, { rejectWithValue }) => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      return rejectWithValue('User ID not found');
    }
    try {
      const response = await axios.put(`/user/${userId}`, userData);
      if (response.status === 204) {
        return;
      }
      return response.data;
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
      state.isLoggedIn = false; // ここを追加
      localStorage.removeItem('access_token');
      localStorage.removeItem('token_expiry');
      localStorage.removeItem('userInfo');
    },
    setToken: (state, action: PayloadAction<{ token: string; tokenExpiry: number }>) => {
      state.token = action.payload.token;
      state.tokenExpiry = action.payload.tokenExpiry;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.errors.general = '';
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
        state.token = action.payload.token;
        state.tokenExpiry = action.payload.tokenExpiry;
        state.userInfo = action.payload.userInfo;
        state.isLoggedIn = true; // ここを追加
        localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo));
        state.errors.general = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.errors.general = action.error.message || 'Failed to login';
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.errors.general = action.error.message || 'Failed to fetch user';
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.userInfo = { ...state.userInfo, ...action.payload };
          localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.errors.general = action.payload as string;
      });
  }
});

export const { setEmail, setPassword, setPasswordConfirm, setNickname, setUserIcon, setErrors, clearErrors, logout, setToken, setAuthenticated } = userSlice.actions;
export default userSlice.reducer;
