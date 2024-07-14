import React, { useState, useEffect } from "react";
import { getWeather, getGreeting } from "../utils";
import ArticleList from "../components/ArticleList";
import profileImage from "../assets/iamapinan.jpg";
const HomePage = () => {
  const [greeting, setGreeting] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    setGreeting(getGreeting());
    setWeather(getWeather());
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const articles = []; // Define the 'articles' variable with an empty array or assign it with the actual articles data.
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
      <div class="px-4 mx-auto max-w-2xl ">
        <img
          src={profileImage}
          alt="Profile"
          className="rounded-full w-32 h-32 object-cover mb-4"
        />
        <section className="welcome">
          <h1 className="text-4xl font-bold leading-normal">
            {greeting} 👋🏻 <br/>ยินดีต้อนรับสู่ <span className="text-blue-600 italic">iamapinan!</span>
          </h1>
          <p className="mt-6">
            Current weather: {weather.temp}°C
          </p>
        </section>
        <section className="search">
          <input
            type="text"
            placeholder="ค้นหาบทความ..."
            className="w-full p-2 mt-4 border rounded"
            value={searchTerm}
            onChange={handleSearch}
          />
        </section>
        <section className="articles mt-8 w-full">
          <h2 className="text-2xl font-bold mb-4">ล่าสุด</h2>
          <ArticleList type="latest" articles={filteredArticles} />
        </section>
        <section className="graph mt-20 w-full">
          <img src="http://ghchart.rshah.org/iamapinan" alt="iamapinan's Github chart" />
        </section>
        <footer className="mt-8 text-gray-500">
          <div className="social-links mt-4">
            <a href="https://www.facebook.com/9apinan" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i> Facebook
            </a> ·
            <a href="https://www.youtube.com/iamapinan" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i> YouTube
            </a> ·
            <a href="https://github.com/iamapinan" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i> GitHub
            </a> ·
            <a href="mailto:iamapinan@example.com">
              <i className="fas fa-envelope"></i> Email
            </a>
          </div>
          <p>© 2024 iamapinan. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
};

export default HomePage;
