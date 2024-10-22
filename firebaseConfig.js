// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHgLdtVeZCOxbDsvkk1-uMZJSS9ZmmXQ0",
  authDomain: "anime-web-project-5c8d7.firebaseapp.com",
  projectId: "anime-web-project-5c8d7",
  storageBucket: "anime-web-project-5c8d7.appspot.com",
  messagingSenderId: "520455111148",
  appId: "1:520455111148:web:80718b2a05074ec516c0c9",
  measurementId: "G-DHQ0KJ3XG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
