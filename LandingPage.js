// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to the Anime Fan Page</h1>
      <nav>
        <Link to="/discovery">Discover</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/add-anime">Add Anime</Link>
        <Link to="/manga-checkout">Manga Checkout</Link>
      </nav>
    </div>
  );
};

export default LandingPage;
