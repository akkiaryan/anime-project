// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimePage from './components/AnimePage';         // Main Anime Page
import DiscoverPage from './components/DiscoverPage';   // Discover Page
import BlogPage from './components/BlogPage';           // Blog Page
import AddAnimePage from './components/AddAnimePage';   // Add Anime Page
import MangaCheckoutPage from './components/MangaCheckoutPage';  // Manga Checkout
import LandingPage from './components/LandingPage';     // Home Page
import './App.css';                                     // Global styles

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/anime" element={<AnimePage />} />
          <Route path="/discovery" element={<DiscoverPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/add-anime" element={<AddAnimePage />} />
          <Route path="/manga-checkout" element={<MangaCheckoutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
