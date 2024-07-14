import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../api';

const ArticleList = ({ type }) => {
  const [articles, setArticles] = useState([]);

  const viewArticle = (id) => {
    // Redirect to the article page with the specified id
    window.location.href = `/article/${id}`;
  };

  useEffect(() => {
    fetchArticles(type).then(data => setArticles(data));
  }, [type]);

  return (
    <div className="article-list">
      {articles.map(article => (
        <div key={article.id} className="article-item p-4 border rounded mb-4" onClick={() => viewArticle(article.id)}>
          <a href={'/article/'+article.id}><h3 className="text-xl font-bold">{article.title}</h3></a>
          <p>{article.excerpt}</p>
          <p className="text-gray-500">Category: {article.categories} @ {new Date(article.date).toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;