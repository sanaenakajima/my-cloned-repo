// src/App.tsx
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Box } from '@mui/material';
import TopPage from './components/pages/TopPage';
import RegisterPage from './components/pages/RegisterPage';
import MyPage from './components/pages/MyPage';
import LoginPage from './components/pages/LoginPage';
import UpdateProfilePage from './components/pages/UpdateProfilePage';
import CreateArticlePage from './components/pages/CreateArticlePage';
import ArticleListPage from './components/pages/ArticleListPage';
import ArticleDetailPage from './components/pages/ArticleDetailPage';
import Header from './components/organisms/Header';
import ScrollToTop from './components/atoms/ScrollToTop';
import NotFoundPage from './components/pages/NotFoundPage';
import withAuth from './hoc/withAuth';
import './App.css';

const App: React.FC = () => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      x: 100,
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: -100,
    },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 2.0,
  };

  return (
    <>
      <ScrollToTop />
      <Header />
      <Box sx={{ pt: '150px', height: '100vh', bgcolor: '#0d1b2a' }}>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={{ backgroundColor: '#0d1b2a', height: '100%' }}
                >
                  <TopPage />
                </motion.div>
              }
            />
            <Route
              path="/top"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={{ backgroundColor: '#0d1b2a', height: '100%' }}
                >
                  <TopPage />
                </motion.div>
              }
            />
            <Route
              path="/register"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={{ backgroundColor: '#0d1b2a', height: '100%' }}
                >
                  <RegisterPage />
                </motion.div>
              }
            />
            <Route
              path="/my-page"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={{ backgroundColor: '#0d1b2a', height: '100%' }}
                >
                  {withAuth(MyPage)({})}
                </motion.div>
              }
            />
            <Route
              path="/login"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={{ backgroundColor: '#0d1b2a', height: '100%' }}
                >
                  <LoginPage />
                </motion.div>
              }
            />
            <Route
              path="/update-profile"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={{ backgroundColor: '#0d1b2a', height: '100%' }}
                >
                  {withAuth(UpdateProfilePage)({})}
                </motion.div>
              }
            />
            <Route
              path="/create-article"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={{ backgroundColor: '#0d1b2a', height: '100%' }}
                >
                  {withAuth(CreateArticlePage)({})}
                </motion.div>
              }
            />
            <Route
              path="/article-list"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={{ backgroundColor: '#0d1b2a', height: '100%' }}
                >
                  {withAuth(ArticleListPage)({})}
                </motion.div>
              }
            />
            <Route
              path="/articles/:articleId"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={{ backgroundColor: '#0d1b2a', height: '100%' }}
                >
                  <ArticleDetailPage />
                </motion.div>
              }
            />
            <Route
              path="*"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  style={{ backgroundColor: '#0d1b2a', height: '100%' }}
                >
                  <NotFoundPage />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </Box>
    </>
  );
};

export default App;
