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
import ArticleDetailPage from './pages/ArticleDetailPage';
import ArticleListPage from './pages/ArticleListPage'; // 無効になっているインポートを修正
import UpdateProfilePage from './pages/UpdateProfilePage';

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
          <Route path="article-list" element={<ArticleListPage />} /> {/* 修正 */}
          <Route path="articles/:articleId" element={<ArticleDetailPage />} />
          <Route path="update-profile" element={<UpdateProfilePage />} /> {/* 会員情報変更ページ */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;





