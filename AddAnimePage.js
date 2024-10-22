// src/components/AddAnimePage.js
import React, { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue, push, update, remove } from 'firebase/database';
import '../styles/AddAnimePage.css';

const AddAnimePage = () => {
  const [animeList, setAnimeList] = useState([]);
  const [newAnime, setNewAnime] = useState({
    title: '',
    description: '',
    rating: '',
    genre: '',
    releaseYear: '',
    addedBy: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editKey, setEditKey] = useState('');

  useEffect(() => {
    const animeRef = ref(database, 'anime');
    onValue(animeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAnimeList(Object.keys(data).map((key) => ({ key, ...data[key] })));
      }
    });
  }, []);

  const handleAddAnime = () => {
    const animeRef = ref(database, 'anime');
    push(animeRef, newAnime);
    setNewAnime({ title: '', description: '', rating: '', genre: '', releaseYear: '', addedBy: '' });
  };

  const handleSort = (sortType) => {
    let sortedAnimeList = [...animeList];
    switch (sortType) {
      case 'alphabet':
        sortedAnimeList.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'latest':
        sortedAnimeList.reverse();  // Assuming data is retrieved in reverse chronological order
        break;
      case 'rating':
        sortedAnimeList.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    setAnimeList(sortedAnimeList);
  };

  return (
    <div className="add-anime-page">
      <h2>Add New Anime</h2>
      <form>
        <input
          type="text"
          placeholder="Title"
          value={newAnime.title}
          onChange={(e) => setNewAnime({ ...newAnime, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newAnime.description}
          onChange={(e) => setNewAnime({ ...newAnime, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Rating"
          value={newAnime.rating}
          onChange={(e) => setNewAnime({ ...newAnime, rating: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre"
          value={newAnime.genre}
          onChange={(e) => setNewAnime({ ...newAnime, genre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Release Year"
          value={newAnime.releaseYear}
          onChange={(e) => setNewAnime({ ...newAnime, releaseYear: e.target.value })}
        />
        <input
          type="text"
          placeholder="Added By"
          value={newAnime.addedBy}
          onChange={(e) => setNewAnime({ ...newAnime, addedBy: e.target.value })}
        />
        <button type="button" onClick={handleAddAnime}>Add Anime</button>
      </form>

      <div className="sort-buttons">
        <button onClick={() => handleSort('alphabet')}>Sort by Alphabet</button>
        <button onClick={() => handleSort('latest')}>Sort by Latest</button>
        <button onClick={() => handleSort('rating')}>Sort by Rating</button>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Genre</th>
            <th>Release Year</th>
            <th>Added By</th>
          </tr>
        </thead>
        <tbody>
          {animeList.map((anime) => (
            <tr key={anime.key}>
              <td>{anime.title}</td>
              <td>{anime.description}</td>
              <td>{anime.rating}</td>
              <td>{anime.genre}</td>
              <td>{anime.releaseYear}</td>
              <td>{anime.addedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddAnimePage;
