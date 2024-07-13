import React, { useState, useEffect } from 'react';
import { getWeather, getGreeting } from '../utils';
import ArticleList from '../components/ArticleList';

const HomePage = () => {
  const [greeting, setGreeting] = useState('');
  const [weather, setWeather] = useState({});

  useEffect(() => {
    setGreeting(getGreeting());
    setWeather(getWeather());
  }, []);

  return (
    <div className="container mx-auto p-4">
      <section className="welcome">
        <h1 className="text-4xl font-bold">{greeting}, welcome to iamapinan!</h1>
        <p>Current weather: {weather.temp}°C, {weather.description}</p>
      </section>
      <section className="search">
        <input type="text" placeholder="Search articles..." className="w-full p-2 mt-4 border rounded" />
      </section>
      <section className="latest-articles mt-8">
        <h2 className="text-2xl font-bold">Latest Articles</h2>
        <ArticleList type="latest" />
      </section>
      <section className="popular-articles mt-8">
        <h2 className="text-2xl font-bold">Most Popular Articles</h2>
        <ArticleList type="popular" />
      </section>
      <footer className="mt-8">
        <p>© 2024 iamapinan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;