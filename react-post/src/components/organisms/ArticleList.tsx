// src/components/organisms/ArticleList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchArticles, setCurrentPage } from '../../store/articleSlice';
import { useNavigate } from 'react-router-dom';
import ArticleSummary from '../molecules/ArticleSummary';
import Pagination from '../molecules/Pagination';

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
    <div>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && (
        <>
          <div className="text-center mb-4">
            全 {totalItems} 件中 {from} - {to} 件表示
          </div>
          <table className="min-w-full bg-white table-fixed border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/3 py-2 px-4 text-left border-r border-gray-200">タイトル</th>
                <th className="w-2/3 py-2 px-4 text-left">投稿内容</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <ArticleSummary
                  key={article.article_id}
                  title={article.title}
                  content={article.content}
                  onClick={() => handleArticleClick(article.article_id)}
                />
              ))}
              {[...Array(perPage - articles.length)].map((_, index) => (
                <tr key={`empty-row-${index}`} className="border-b border-gray-200">
                  <td className="py-2 px-4 text-left border-r border-gray-200">&nbsp;</td>
                  <td className="py-2 px-4 text-left">&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
            firstPageUrl={firstPageUrl}
            lastPageUrl={lastPageUrl}
            prevPageUrl={prevPageUrl}
            nextPageUrl={nextPageUrl}
          />
        </>
      )}
    </div>
  );
};

export default ArticleList;








