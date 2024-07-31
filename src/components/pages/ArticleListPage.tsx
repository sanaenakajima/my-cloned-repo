import React from 'react';
import { motion } from 'framer-motion';
import ArticleList from '../organisms/ArticleList';

const ArticleListPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#0d1b2a', minHeight: '100vh', padding: '20px' }} className="flex flex-col items-center">
      <motion.div
        className="max-w-screen-lg w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={{ color: '#EEEEEE', textAlign: 'center', marginBottom: '20px', fontFamily: 'Impact, sans-serif' ,fontSize: '4.00rem'}}>
          Article List
        </h1>
        <ArticleList />
      </motion.div>
    </div>
  );
};

export default ArticleListPage;
