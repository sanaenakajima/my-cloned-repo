// src/store/articleSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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
  totalItems: number;
  perPage: number;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  firstPageUrl: string | null;
  lastPageUrl: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  from: number | null;
  to: number | null;
}

const initialState: ArticleState = {
  articles: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  perPage: 15,
  nextPageUrl: null,
  prevPageUrl: null,
  firstPageUrl: null,
  lastPageUrl: null,
  status: 'idle',
  error: null,
  from: null,
  to: null,
};

export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (article: { title: string; content: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/articles', article);

      if (response.status !== 201) {
        const errorMessage = `Failed with status: ${response.status}`;
        console.error(errorMessage);
        return rejectWithValue(errorMessage);
      }

      const data = response.data;
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
    try {
      const response = await axios.get(`http://localhost:5000/articles?page=${page}`);
      return response.data;
    } catch (error) {
      const errorResponse = error as any;
      throw new Error(`HTTP error! status: ${errorResponse.response?.status}`);
    }
  }
);

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
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
        state.currentPage = action.payload.current_page;
        state.totalPages = action.payload.last_page;
        state.totalItems = action.payload.total;
        state.perPage = action.payload.per_page;
        state.nextPageUrl = action.payload.next_page_url;
        state.prevPageUrl = action.payload.prev_page_url;
        state.firstPageUrl = action.payload.first_page_url;
        state.lastPageUrl = action.payload.last_page_url;
        state.from = action.payload.from;
        state.to = action.payload.to;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setCurrentPage } = articleSlice.actions;

export default articleSlice.reducer;







