import React, { useState, useEffect } from 'react';
import { fetchArticles } from '../api';
import ArticleList from '../components/ArticleList';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchArticles('all', page).then(data => setArticles(data));
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Articles</h1>
      <ArticleList articles={articles} />
      <div className="pagination mt-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="mr-2 px-4 py-2 bg-gray-300 rounded">Previous</button>
        <button onClick={() => setPage(page + 1)} className="px-4 py-2 bg-gray-300 rounded">Next</button>
      </div>
    </div>
  );
};

export default ArticlesPage;