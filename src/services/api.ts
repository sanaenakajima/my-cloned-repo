// src/services/api.ts
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.19:5000';

export const registerUser = (nickname: string, email: string, password: string, representative_image: string) => {
  return axios.post(`${API_URL}/user`, {
    nickname,
    email,
    password,
    representative_image
  }).then(response => response.data);
};

export const loginUser = (email: string, password: string) => {
  return axios.post(`${API_URL}/login`, {
    email,
    password
  }).then(response => response.data);
};

export const fetchUser = (userId: string) => {
  return axios.get(`${API_URL}/user/${userId}`).then(response => response.data);
};

export const updateUser = (userId: string, userData: { email: string, nickname: string, representative_image: string }) => {
  return axios.put(`${API_URL}/user/${userId}`, userData).then(response => response.data);
};

export const createArticle = (articleData: { title: string; content: string; user_name: string; user_id: number }) => {
  return axios.post(`${API_URL}/articles`, articleData).then(response => response.data);
};

export const fetchArticles = (page: number) => {
  return axios.get(`${API_URL}/articles?page=${page}`).then(response => response.data);
};

export const fetchArticleById = (id: number) => {
  return axios.get(`${API_URL}/articles/${id}`).then(response => response.data);
};

export const updateArticle = (articleData: { article_id: number; title: string; content: string; user_id: string }) => {
  return axios.put(`${API_URL}/articles/${articleData.article_id}`, articleData).then(response => response.data);
};

export const deleteArticle = (articleId: number) => {
  return axios.delete(`${API_URL}/articles/${articleId}`).then(response => response.data);
};