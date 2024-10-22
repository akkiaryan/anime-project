// src/components/BlogPage.js
import React, { useState, useEffect } from 'react';
import { database, auth } from '../firebaseConfig';
import { ref, onValue, push } from 'firebase/database';
import '../styles/BlogPage.css';

const BlogPage = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }

    const commentsRef = ref(database, 'comments');
    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setComments(Object.keys(data).map((key) => ({ key, ...data[key] })));
      }
    });
  }, []);

  const handleAddComment = () => {
    const commentsRef = ref(database, 'comments');
    push(commentsRef, {
      text: newComment,
      user: userEmail,
      timestamp: new Date().toLocaleString(),
    });
    setNewComment('');
  };

  return (
    <div className="blog-page">
      <h2>Anime & Manga Discussions</h2>
      <textarea
        placeholder="Write your comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Post Comment</button>

      <ul>
        {comments.map((comment) => (
          <li key={comment.key}>
            <p><strong>{comment.user}</strong> ({comment.timestamp}): {comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
