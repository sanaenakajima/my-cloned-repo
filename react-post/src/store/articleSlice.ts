// src/store/articleSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Article {
  article_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface ArticleState {
  articles: Article[];
  currentPage: number;
  totalPages: number;
  status: string;
  error: string | null;
}

const initialState: ArticleState = {
  articles: [],
  currentPage: 1,
  totalPages: 1,
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

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (page: number) => {
    const response = await fetch(`/article?page=${page}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
);

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
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
      })
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.data;
        state.totalPages = action.payload.last_page;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setCurrentPage } = articleSlice.actions;

export default articleSlice.reducer;




