import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { createRoot } from "react-dom/client";
import HomePage from "./pages/HomePage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticlePage from "./pages/ArticlePage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage"; // Import AdminPage component
import CookieConsent from "./components/CookieConsent";
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
      <div>
        <CookieConsent />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminPage />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
