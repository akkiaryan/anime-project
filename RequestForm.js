import React, { useState } from 'react';
import { database } from '../firebaseConfig';
import { ref, push } from 'firebase/database';
import '../styles/RequestForm.css'; // Importing CSS for the request form

const RequestForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    const requestRef = ref(database, 'requests');
    push(requestRef, {
      title,
      description,
      user: "UserEmail@example.com",
    });
    setTitle('');
    setDescription('');
    alert('Request submitted');
  };

  return (
    <div className="request-form">
      <h2>Request a New Anime</h2>
      <input
        type="text"
        placeholder="Anime Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit Request</button>
    </div>
  );
};

export default RequestForm;
