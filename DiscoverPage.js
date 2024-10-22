// src/components/DiscoverPage.js
import React, { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';  // Import database from your Firebase config
import { ref, onValue, push } from 'firebase/database';
import '../styles/DiscoverPage.css';

// Initial Anime Data with genres
const initialAnimeData = {
  "Shōnen": [
    { "title": "Naruto", "year": 2002, "imdb": "https://www.imdb.com/title/tt0409591" },
    { "title": "One Piece", "year": 1999, "imdb": "https://www.imdb.com/title/tt0388629" },
    { "title": "Bleach", "year": 2004, "imdb": "https://www.imdb.com/title/tt0434665" },
    { "title": "Fullmetal Alchemist: Brotherhood", "year": 2009, "imdb": "https://www.imdb.com/title/tt1355642" },
    { "title": "Hunter X Hunter", "year": 2011, "imdb": "https://www.imdb.com/title/tt2098220" }
  ],
  "Shōjo": [
    { "title": "Sailor Moon", "year": 1992, "imdb": "https://www.imdb.com/title/tt0103369" },
    { "title": "Fruits Basket", "year": 2001, "imdb": "https://www.imdb.com/title/tt0318871" },
    { "title": "Ouran High School Host Club", "year": 2006, "imdb": "https://www.imdb.com/title/tt0756683" },
    { "title": "Cardcaptor Sakura", "year": 1998, "imdb": "https://www.imdb.com/title/tt0245759" },
    { "title": "Nana", "year": 2006, "imdb": "https://www.imdb.com/title/tt0813557" }
  ],
  "Seinen": [
    { "title": "Tokyo Ghoul", "year": 2014, "imdb": "https://www.imdb.com/title/tt3741634" },
    { "title": "Attack on Titan", "year": 2013, "imdb": "https://www.imdb.com/title/tt2560140" },
    { "title": "Berserk", "year": 1997, "imdb": "https://www.imdb.com/title/tt0318871" },
    { "title": "One Punch Man", "year": 2015, "imdb": "https://www.imdb.com/title/tt4508902" },
    { "title": "Psycho-Pass", "year": 2012, "imdb": "https://www.imdb.com/title/tt2379308" }
  ],
  "Josei": [
    { "title": "Paradise Kiss", "year": 2005, "imdb": "https://www.imdb.com/title/tt0488477" },
    { "title": "Nodame Cantabile", "year": 2007, "imdb": "https://www.imdb.com/title/tt0959394" },
    { "title": "Honey and Clover", "year": 2005, "imdb": "https://www.imdb.com/title/tt0491793" },
    { "title": "Shouwa Genroku Rakugo Shinjuu", "year": 2016, "imdb": "https://www.imdb.com/title/tt5263536" },
    { "title": "Chihayafuru", "year": 2011, "imdb": "https://www.imdb.com/title/tt2077851" }
  ],
  "Kodomomuke": [
    { "title": "Doraemon", "year": 1979, "imdb": "https://www.imdb.com/title/tt0296302" },
    { "title": "Pokemon", "year": 1997, "imdb": "https://www.imdb.com/title/tt0176385" },
    { "title": "Anpanman", "year": 1988, "imdb": "https://www.imdb.com/title/tt0237962" },
    { "title": "Hamtaro", "year": 2000, "imdb": "https://www.imdb.com/title/tt0439349" },
    { "title": "Chi's Sweet Home", "year": 2008, "imdb": "https://www.imdb.com/title/tt1210109" }
  ],
  "Action": [
    { "title": "Dragon Ball Z", "year": 1989, "imdb": "https://www.imdb.com/title/tt0214341" },
    { "title": "My Hero Academia", "year": 2016, "imdb": "https://www.imdb.com/title/tt5626028" },
    { "title": "Demon Slayer", "year": 2019, "imdb": "https://www.imdb.com/title/tt9335498" },
    { "title": "Jujutsu Kaisen", "year": 2020, "imdb": "https://www.imdb.com/title/tt12432972" },
    { "title": "Samurai Champloo", "year": 2004, "imdb": "https://www.imdb.com/title/tt0423731" }
  ],
  "Adventure": [
    { "title": "Hunter X Hunter", "year": 2011, "imdb": "https://www.imdb.com/title/tt2098220" },
    { "title": "One Piece", "year": 1999, "imdb": "https://www.imdb.com/title/tt0388629" },
    { "title": "Made in Abyss", "year": 2017, "imdb": "https://www.imdb.com/title/tt7441658" },
    { "title": "Magi: The Labyrinth of Magic", "year": 2012, "imdb": "https://www.imdb.com/title/tt2475734" },
    { "title": "Fate/Zero", "year": 2011, "imdb": "https://www.imdb.com/title/tt2051178" }
  ],
  "Comedy": [
    { "title": "Gintama", "year": 2006, "imdb": "https://www.imdb.com/title/tt0988818" },
    { "title": "Nichijou", "year": 2011, "imdb": "https://www.imdb.com/title/tt1966596" },
    { "title": "KonoSuba", "year": 2016, "imdb": "https://www.imdb.com/title/tt6203036" },
    { "title": "The Disastrous Life of Saiki K.", "year": 2016, "imdb": "https://www.imdb.com/title/tt6048266" },
    { "title": "Osomatsu-san", "year": 2015, "imdb": "https://www.imdb.com/title/tt5037964" }
  ]
};

const DiscoverPage = () => {
  const [newAnime, setNewAnime] = useState({
    genre: 'Shōnen',  // Default genre
    title: '',
    year: '',
    imdb: ''
  });
  const [allAnime, setAllAnime] = useState(initialAnimeData);
  const [loading, setLoading] = useState(true);  // Loading state

  // Fetch data from Firebase Realtime Database
  useEffect(() => {
    const animeRef = ref(database, 'discoverAnime');
    const unsubscribe = onValue(animeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAllAnime(data);  // Update local state with Firebase data
      }
      setLoading(false);  // Stop loading once data is fetched
    }, (error) => {
      console.error("Error fetching data from Firebase:", error);  // Log any errors
      setLoading(false);
    });

    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, []);

  // Handle adding a new anime
  const handleAddAnime = () => {
    if (!newAnime.title || !newAnime.year || !newAnime.imdb) {
      alert('Please fill out all fields');
      return;
    }

    const genreRef = ref(database, `discoverAnime/${newAnime.genre}`);
    const animeToAdd = {
      title: newAnime.title,
      year: parseInt(newAnime.year),
      imdb: newAnime.imdb
    };

    // Push new anime data to Firebase under the selected genre
    push(genreRef, animeToAdd)
      .then(() => {
        alert("Anime added successfully!");
      })
      .catch((error) => {
        console.error("Error adding anime:", error);
      });

    // Reset the form
    setNewAnime({ genre: 'Shōnen', title: '', year: '', imdb: '' });
  };

  // Get random anime for the marquee
  const getRandomAnime = () => {
    const genres = Object.keys(allAnime);
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
    const randomAnime = allAnime[randomGenre][Math.floor(Math.random() * allAnime[randomGenre].length)];
    return randomAnime?.title || "Anime";  // Default fallback if no anime is found
  };

  if (loading) {
    return <div>Loading...</div>;  // Display loading state
  }

  return (
    <div className="discover-page">
      <marquee className="marquee">
        New Anime this week: {getRandomAnime()}!
      </marquee>

      <h2>Discover New Anime Releases by Genre</h2>
      {Object.keys(allAnime).map((genre) => (
        <div key={genre} className="genre-section">
          <h3>{genre}</h3>
          <ul>
            {allAnime[genre].map((anime, index) => (
              <li key={index}>
                <a href={anime.imdb} target="_blank" rel="noopener noreferrer">
                  {anime.title} ({anime.year})
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Add New Anime Form */}
      <div className="add-anime-section">
        <h3>Add New Anime to a Genre</h3>
        <form>
          <label>Genre:</label>
          <select
            value={newAnime.genre}  // Correctly set value
            onChange={(e) => setNewAnime({ ...newAnime, genre: e.target.value })}  // Update genre dynamically
          >
            {Object.keys(allAnime).map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          <label>Title:</label>
          <input
            type="text"
            value={newAnime.title}
            placeholder="Enter anime title"
            onChange={(e) => setNewAnime({ ...newAnime, title: e.target.value })}
          />

          <label>Year:</label>
          <input
            type="number"
            value={newAnime.year}
            placeholder="Enter release year"
            onChange={(e) => setNewAnime({ ...newAnime, year: e.target.value })}
          />

          <label>IMDb Link:</label>
          <input
            type="text"
            value={newAnime.imdb}
            placeholder="Enter IMDb link"
            onChange={(e) => setNewAnime({ ...newAnime, imdb: e.target.value })}
          />

          <button type="button" onClick={handleAddAnime}>
            Add Anime
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiscoverPage;
