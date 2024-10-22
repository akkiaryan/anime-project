// src/components/Login.js
import React from 'react';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';  // For redirection after login
import '../styles/Login.css';

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // Handle Google login
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      console.log("Google Login Success:", result.user);
      navigate('/');  // Redirect to main page after login
    }).catch((error) => console.error("Google Login Error:", error));
  };

  // Handle GitHub login
  const handleGithubLogin = () => {
    signInWithPopup(auth, githubProvider).then((result) => {
      console.log("GitHub Login Success:", result.user);
      navigate('/');
    }).catch((error) => console.error("GitHub Login Error:", error));
  };

  return (
    <div className="login-container">
      <h2>Login or Sign Up</h2>
      <div className="login-buttons">
        <button onClick={handleGoogleLogin}>Login with Google</button>
        <button onClick={handleGithubLogin}>Login with GitHub</button>
      </div>
    </div>
  );
};

export default Login;