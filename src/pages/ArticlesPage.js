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
    <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
      <div class="px-4 mx-auto max-w-2xl ">
      <h1 className="text-2xl font-bold mb-4">บทความทั้งหมด</h1>
      <ArticleList articles={articles} />
      <div className="pagination mt-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="mr-2 px-4 py-2 bg-gray-300 rounded">Previous</button>
        <button onClick={() => setPage(page + 1)} className="px-4 py-2 bg-gray-300 rounded">Next</button>
      </div>
    </div>
  </main>
  );
};

export default ArticlesPage;