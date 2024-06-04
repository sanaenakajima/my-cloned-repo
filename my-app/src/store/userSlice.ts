// src/store/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
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
  }
};

export const register = createAsyncThunk(
  'user/register',
  async (userData: { name: string; email: string; password: string; password_confirmation: string; representative_image: string }, { dispatch }) => {
    const response = await fetch('/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to register');
    }
    const data = await response.json();
    const tokenExpiry = Date.now() + 60 * 60 * 1000; // 60分後
    localStorage.setItem('access_token', data.token);
    localStorage.setItem('token_expiry', tokenExpiry.toString());

    dispatch(login({ email: userData.email, password: userData.password }));

    return data;
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }) => {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to login');
    }
    const data = await response.json();
    const tokenExpiry = Date.now() + 60 * 60 * 1000; // 60分後
    localStorage.setItem('access_token', data.user.token);
    localStorage.setItem('token_expiry', tokenExpiry.toString());
    return { token: data.user.token, tokenExpiry };
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
      localStorage.removeItem('access_token');
      localStorage.removeItem('token_expiry');
    },
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
        state.errors.general = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.errors.general = action.error.message || 'Failed to login';
      });
  },
});

export const { setEmail, setPassword, setPasswordConfirm, setNickname, setUserIcon, setErrors, clearErrors, logout } = userSlice.actions;
export default userSlice.reducer;

