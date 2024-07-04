// src/components/organisms/ArticleDetail.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticleById, deleteArticle } from '../../store/articleSlice';
import { fetchUser } from '../../store/userSlice';
import ArticleAuthor from '../molecules/ArticleAuthor';
import ArticleTitle from '../molecules/ArticleTitle';
import ArticleContent from '../molecules/ArticleContent';
import Button from '../atoms/Button';
import LoadingSpinner from '../atoms/LoadingSpinner';
import { RootState, AppDispatch } from '../../store/store';

interface ArticleDetailProps {
  onEdit: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ onEdit }) => {
  const { articleId } = useParams<{ articleId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const article = useSelector((state: RootState) => state.articles.selectedArticle);
  const user = useSelector((state: RootState) => state.user.userInfo);
  const articleStatus = useSelector((state: RootState) => state.articles.status);
  const userStatus = useSelector((state: RootState) => state.user.status);

  useEffect(() => {
    if (articleId) {
      const articleIdNumber = parseInt(articleId, 10);
      if (!isNaN(articleIdNumber)) {
        dispatch(fetchArticleById(articleIdNumber));
      }
    }
  }, [dispatch, articleId]);

  useEffect(() => {
    if (article && article.user_id) {
      dispatch(fetchUser(article.user_id));
    }
  }, [dispatch, article]);

  const handleDelete = () => {
    if (article && window.confirm('本当に削除しますか？')) {
      dispatch(deleteArticle(article.article_id)).unwrap().then(() => {
        navigate('/article-list'); // 正しい投稿一覧画面に遷移
      });
    }
  };

  if (articleStatus === 'loading' || userStatus === 'loading') {
    return <LoadingSpinner />;
  }

  if (!article || !user) {
    return <div>No article found</div>;
  }

  return (
    <div className="max-w-4xl w-full mx-auto p-6 rounded-lg shadow-md bg-white">
      <div className="mb-4">
        <ArticleTitle title={article.title} />
      </div>
      <ArticleContent content={article.content} />
      <div className="flex justify-end mt-2">
        <ArticleAuthor authorName={user.name} />
      </div>
      <div className="flex justify-end mt-4">
        <Button onClick={onEdit} className="mr-2 bg-navy-700 hover:bg-navy-900 text-white font-bold py-2 px-4 rounded">
          編集
        </Button>
        <Button onClick={handleDelete} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          削除
        </Button>
      </div>
    </div>
  );
};

export default ArticleDetail;
