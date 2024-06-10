// src/App.tsx
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TopPage from './pages/TopPage';
import RegisterPage from './pages/RegisterPage';
import MyPage from './pages/MyPage';
import HeaderLayout from './pages/HeaderLayout';
import CreateArticlePage from './pages/CreateArticlePage';
import ArticleDetailPage from './pages/ArticleDetailPage'; // 追加

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeaderLayout />}>
          <Route index element={<TopPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="my-page" element={<MyPage />} />
          <Route path="create-article" element={<CreateArticlePage />} />
          <Route path="article-list" element={<TopPage />} />
          <Route path="articles/:articleId" element={<ArticleDetailPage />} /> {/* 追加 */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;


