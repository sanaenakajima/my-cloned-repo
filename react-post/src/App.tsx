// src/App.tsx
import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TopPage from './pages/TopPage';
import RegisterPage from './pages/RegisterPage';
import MyPage from './pages/MyPage';
import HeaderLayout from './pages/HeaderLayout';
import CreateArticlePage from './pages/CreateArticlePage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ArticleListPage from './pages/ArticleListPage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/organisms/Header';

const App: React.FC = () => {
  const [error, setError] = useState<any>(null);

  return (
    <>
      <Header isLoggedIn={true} onLogout={() => {}} />
      <div className="pt-16">
        {error && <ErrorBoundary error={error} />}
        <Routes>
          <Route path="/" element={<HeaderLayout />}>
            <Route index element={<TopPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="my-page" element={<MyPage />} />
              <Route path="create-article" element={<CreateArticlePage />} />
              <Route path="article-list" element={<ArticleListPage />} />
              <Route path="articles/:articleId" element={<ArticleDetailPage />} />
              <Route path="update-profile" element={<UpdateProfilePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;











