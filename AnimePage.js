// src/components/AnimePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // For routing
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import '../styles/AnimePage.css';

const AnimePage = () => {
  const [animeList, setAnimeList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnimeKey, setSelectedAnimeKey] = useState(null);  // For dropdown toggle

  useEffect(() => {
    const animeRef = ref(database, 'anime');
    onValue(animeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAnimeList(Object.keys(data).map((key) => ({ key, ...data[key] })));
      }
    });
  }, []);

  const handleAnimeSelect = (key) => {
    setSelectedAnimeKey(key === selectedAnimeKey ? null : key);  // Toggle the dropdown
  };

  const filteredAnime = animeList.filter((anime) =>
    anime.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="anime-page">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/discovery">Discover</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/add-anime">Add Anime</Link>
        <Link to="/manga-checkout">Manga Checkout</Link>
      </nav>

      <h2>Search Anime</h2>
      <input
        type="text"
        placeholder="Search anime..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="anime-list">
        {filteredAnime.map((anime) => (
          <div key={anime.key} className="anime-item">
            <h4 onClick={() => handleAnimeSelect(anime.key)}>{anime.title}</h4>
            {selectedAnimeKey === anime.key && (
              <div className="dropdown">
                <p><strong>Description:</strong> {anime.description}</p>
                <p><strong>Rating:</strong> {anime.rating}</p>
                <p><strong>Genre:</strong> {anime.genre}</p>
                <p><strong>Release Year:</strong> {anime.releaseYear}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimePage;
