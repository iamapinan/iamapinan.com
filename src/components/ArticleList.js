import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../api';

const ArticleList = ({ type }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles(type).then(data => setArticles(data));
  }, [type]);

  return (
    <div className="article-list">
      {articles.map(article => (
        <div key={article.id} className="article-item p-4 border rounded mb-4">
          <h3 className="text-xl font-bold">{article.title}</h3>
          <p>{article.excerpt}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;