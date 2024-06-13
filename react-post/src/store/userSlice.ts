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
  userInfo: {
    name: string;
    email: string;
    representative_image: string;
  } | null;
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
  userInfo: null,
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
    localStorage.setItem('user_id', data.user.user_id); // ユーザーIDを保存
    return { token: data.user.token, tokenExpiry };
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: string) => {
    const response = await fetch(`/user/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: { email: string; nickname: string; representative_image: string }, { rejectWithValue }) => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      return rejectWithValue('User ID not found');
    }
    const response = await fetch(`/user/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      try {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to update user');
      } catch {
        return rejectWithValue('Failed to update user');
      }
    }
    // 204 No Content の場合、レスポンスボディは存在しないのでそのまま返す
    if (response.status === 204) {
      return;
    }
    return await response.json();
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
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
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
        // state.userInfoの更新を行う
        if (action.payload) {
          state.userInfo = { ...state.userInfo, ...action.payload };
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.errors.general = action.payload as string;
      });
  }
});

export const { setEmail, setPassword, setPasswordConfirm, setNickname, setUserIcon, setErrors, clearErrors, logout } = userSlice.actions;
export default userSlice.reducer;




