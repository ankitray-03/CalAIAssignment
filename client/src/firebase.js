// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// set your own firebase api key in env file in client directory
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "calaiassignment.firebaseapp.com",
  projectId: "calaiassignment",
  storageBucket: "calaiassignment.appspot.com",
  messagingSenderId: "910766848702",
  appId: "1:910766848702:web:d188da6d559cc3f4f87cef",
  measurementId: "G-8D00J954TD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
