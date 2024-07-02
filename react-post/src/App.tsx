// src/App.tsx
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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
    <Router>
      <Header isLoggedIn={true} onLogout={() => {}} /> 
      <div className="pt-24"> 
        {error && <ErrorBoundary error={error} />}
        <AppRoutes />
      </div>
    </Router> 
  );
};

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HeaderLayout />}>
          <Route index element={<AnimatedPage component={TopPage} />} />
          <Route path="register" element={<AnimatedPage component={RegisterPage} />} />
          <Route path="login" element={<AnimatedPage component={LoginPage} />} />
          <Route element={<PrivateRoute />}>
            <Route path="my-page" element={<AnimatedPage component={MyPage} />} />
            <Route path="create-article" element={<AnimatedPage component={CreateArticlePage} />} />
            <Route path="article-list" element={<AnimatedPage component={ArticleListPage} />} />
            <Route path="articles/:articleId" element={<AnimatedPage component={ArticleDetailPage} />} />
            <Route path="update-profile" element={<AnimatedPage component={UpdateProfilePage} />} />
          </Route>
          <Route path="*" element={<AnimatedPage component={NotFoundPage} />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

interface AnimatedPageProps {
  component: React.ComponentType;
}

const AnimatedPage: React.FC<AnimatedPageProps> = ({ component: Component }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <Component />
    </motion.div>
  );
};

export default App;
