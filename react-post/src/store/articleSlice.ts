// src/store/articleSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ArticleState {
  articles: any[];
  status: string;
  error: string | null;
}

const initialState: ArticleState = {
  articles: [],
  status: 'idle',
  error: null,
};

export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (article: { title: string; content: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/articles', { // フルURLに修正
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      });

      if (!response.ok) {
        const errorMessage = `Failed with status: ${response.status}`;
        console.error(errorMessage);
        return rejectWithValue(errorMessage);
      }

      const data = await response.json();
      if (!data.article_id) {
        const errorMessage = 'Invalid response format';
        console.error(errorMessage);
        return rejectWithValue(errorMessage);
      }

      return data;
    } catch (error) {
      const errorMessage = 'Failed to create article';
      console.error(errorMessage, error);
      return rejectWithValue(errorMessage);
    }
  }
);

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles.push(action.payload);
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default articleSlice.reducer;



