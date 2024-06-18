// src/components/organisms/ArticleList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchArticles, setCurrentPage } from '../../store/articleSlice';
import { useNavigate } from 'react-router-dom';
import ArticleSummary from '../molecules/ArticleSummary';
import Pagination from '../molecules/Pagination';
import LoadingSpinner from '../atoms/LoadingSpinner';

const ArticleList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { 
    articles, 
    currentPage, 
    totalPages, 
    status, 
    error, 
    totalItems, 
    perPage, 
    from, 
    to, 
    firstPageUrl, 
    lastPageUrl, 
    prevPageUrl, 
    nextPageUrl 
  } = useSelector((state: RootState) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles(currentPage));
  }, [dispatch, currentPage]);

  const handleArticleClick = (articleId: number) => {
    navigate(`/articles/${articleId}`);
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 flex flex-col items-center">
      {status === 'loading' && (
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner />
        </div>
      )}
      {status === 'failed' && <div className="text-red-500">Error: {error}</div>}
      {status === 'succeeded' && (
        <div className="container mx-auto p-4 max-w-screen-lg">
          <div className="text-center mb-4">
            全 {totalItems} 件中 {from} - {to} 件表示
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-2 bg-navy-700 text-white p-2 rounded-t-lg">
              <div className="py-2 px-4">タイトル</div>
              <div className="py-2 px-4">投稿内容</div>
            </div>
            {articles.map((article) => {
              if (article.article_id == null) {
                console.error("記事IDがnullです:", article);
              }
              return (
                <div 
                  key={article.article_id} 
                  className="grid grid-cols-2 border-b border-gray-200 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleArticleClick(article.article_id)}
                >
                  <div className="py-2 px-4 font-bold">{article.title}</div>
                  <div className="py-2 px-4 text-gray-700">{article.content}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-8">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
              firstPageUrl={firstPageUrl}
              lastPageUrl={lastPageUrl}
              prevPageUrl={prevPageUrl}
              nextPageUrl={nextPageUrl}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleList;















