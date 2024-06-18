// src/pages/ArticleDetailPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticleById, updateArticle, deleteArticle } from '../store/articleSlice';
import { fetchUser } from '../store/userSlice';
import ArticleAuthor from '../components/molecules/ArticleAuthor';
import ArticleTitle from '../components/molecules/ArticleTitle';
import ArticleContent from '../components/molecules/ArticleContent';
import Title from '../components/atoms/Title';
import Button from '../components/atoms/Button';
import ArticleForm from '../components/organisms/ArticleForm';
import LoadingSpinner from '../components/atoms/LoadingSpinner';
import { RootState, AppDispatch } from '../store/store';

const ArticleDetailPage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const article = useSelector((state: RootState) => state.articles.selectedArticle);
  const user = useSelector((state: RootState) => state.user.userInfo);
  const articleStatus = useSelector((state: RootState) => state.articles.status);
  const articleError = useSelector((state: RootState) => state.articles.error);
  const userStatus = useSelector((state: RootState) => state.user.status);
  const userError = useSelector((state: RootState) => state.user.errors.general);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (articleId) {
      const articleIdNumber = parseInt(articleId, 10);
      if (!isNaN(articleIdNumber)) {
        console.log('Fetching article by ID:', articleIdNumber);
        dispatch(fetchArticleById(articleIdNumber));
      } else {
        console.error('Invalid article ID:', articleId);
      }
    }
  }, [dispatch, articleId]);

  useEffect(() => {
    if (article && article.user_id) {
      console.log('Fetching user info by user ID:', article.user_id);
      dispatch(fetchUser(article.user_id));
    }
  }, [dispatch, article]);

  const handleSave = async (updatedArticle: { article_id: number; title: string; content: string }) => {
    await dispatch(updateArticle({ ...updatedArticle, user_id: article!.user_id })).unwrap();
    setIsEditing(false);
    dispatch(fetchArticleById(updatedArticle.article_id));
  };

  const handleDelete = () => {
    if (article && window.confirm('本当に削除しますか？')) {
      dispatch(deleteArticle(article.article_id)).unwrap().then(() => {
        navigate('/article-list'); // 正しい投稿一覧画面に遷移
      });
    }
  };

  console.log('Article status:', articleStatus);
  console.log('Article error:', articleError);
  console.log('Selected article:', article);
  console.log('User status:', userStatus);
  console.log('User error:', userError);
  console.log('User info:', user);

  if (articleStatus === 'loading' || userStatus === 'loading') {
    return <LoadingSpinner />;
  }

  if (!article || !user) {
    return <div>No article found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="text-center mt-12 mb-12">
          {!isEditing && <Title text="投稿詳細画面" />}
        </div>
        {isEditing ? (
          <div className="flex justify-center items-center">
            <ArticleForm
              mode="edit"
              initialTitle={article.title}
              initialContent={article.content}
              articleId={article.article_id}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <ArticleTitle title={article.title} />
              <ArticleAuthor authorName={user.name} />
            </div>
            <ArticleContent content={article.content} />
            <div className="flex justify-end mt-4">
              <Button onClick={() => setIsEditing(true)} className="mr-2 bg-navy-700 hover:bg-navy-900 text-white font-bold py-2 px-4 rounded">
                編集
              </Button>
              <Button onClick={handleDelete} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                削除
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetailPage;
