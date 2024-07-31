// src/components/molecules/ArticleListItem.tsx
import React from 'react';
import { Box, Typography, Card, CardContent, CardActionArea } from '@mui/material';
import { motion } from 'framer-motion';

interface ArticleListItemProps {
  article: { article_id: number; title: string; content: string; };
  onClick: (articleId: number) => void;
}

const truncateText = (text: string, length: number): string => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

const ArticleListItem: React.FC<ArticleListItemProps> = ({ article, onClick }) => (
  <Card
    component={motion.div}
    whileHover={{ scale: 1.05 }}
    sx={{
      backgroundColor: '#373A40',
      color: '#EEEEEE',
      borderRadius: 2,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      '&:hover': {
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      },
    }}
  >
    <CardActionArea onClick={() => onClick(article.article_id)}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ mb: 1 }}>
          {truncateText(article.title, 10)}
        </Typography>
        <Typography variant="body2" color="#EEEEEE">
          {truncateText(article.content, 20)}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default ArticleListItem;
