import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlesPage from './pages/ArticlesPage';
import ArticlePage from './pages/ArticlePage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage'; // Import AdminPage component
import CookieConsent from './components/CookieConsent';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={HomePage} />
        <Route path="/articles" component={ArticlesPage} />
        <Route path="/article/:id" component={ArticlePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/admin" component={AdminPage} /> // Add route for AdminPage
        <CookieConsent />
      </Routes>
    </Router>
  );
};

export default App;