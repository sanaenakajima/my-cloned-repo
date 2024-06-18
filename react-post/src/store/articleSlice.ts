// src/store/articleSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Article {
  article_id: number;
  title: string;
  content: string;
  user_name: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface ArticleState {
  articles: Article[];
  selectedArticle: Article | null;
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
  selectedArticle: null,
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
  async (articleData: { title: string; content: string; user_name: string; user_id: string }) => {
    const response = await axios.post('http://localhost:5000/articles', articleData);
    return response.data;
  }
);

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (page: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/articles?page=${page}`);
      return response.data;
    } catch (error: any) {
      throw new Error(`HTTP error! status: ${error.response?.status}`);
    }
  }
);

export const fetchArticleById = createAsyncThunk(
  'articles/fetchArticleById',
  async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/articles/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(`HTTP error! status: ${error.response?.status}`);
    }
  }
);

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async (articleData: { article_id: number; title: string; content: string; user_id: string }) => {
    const response = await axios.put(`http://localhost:5000/articles/${articleData.article_id}`, articleData);
    return response.data;
  }
);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (articleId: number) => {
    const response = await axios.delete(`http://localhost:5000/articles/${articleId}`);
    if (response.status === 204) {
      return articleId;
    } else {
      throw new Error('Failed to delete article');
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
        state.error = action.error.message || 'Something went wrong';
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
      })
      .addCase(fetchArticleById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedArticle = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(updateArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedArticle = action.payload;
        state.articles = state.articles.map(article =>
          article.article_id === action.payload.article_id ? action.payload : article
        );
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(deleteArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = state.articles.filter(article => article.article_id !== action.payload);
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  }
});

export const { setCurrentPage } = articleSlice.actions;

export default articleSlice.reducer;
