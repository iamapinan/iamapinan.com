import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from '../api';
import { marked } from 'marked';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    getArticle(id).then(data => setArticle(data));
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">{article.title}</h1>
      <p className="text-gray-600">{new Date(article.date).toLocaleDateString()}</p>
      <img src={article.coverImage || 'https://source.unsplash.com/random'} alt={article.title} className="w-full h-64 object-cover mt-4" />
      <div className="mt-4">
        <div dangerouslySetInnerHTML={{ __html: marked(article.content) }} />
      </div>
      <div className="mt-8">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Share on Facebook</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded ml-2">Share on LINE</button>
        <button className="bg-blue-400 text-white px-4 py-2 rounded ml-2">Share on X</button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2" onClick={() => navigator.clipboard.writeText(window.location.href)}>Copy URL</button>
      </div>
    </div>
  );
};

export default ArticlePage;