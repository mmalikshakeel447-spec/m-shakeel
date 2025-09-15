// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYwWi-NkvNpSuKCs67nHoctkbhBWJpgzc",
  authDomain: "smart-e32f6.firebaseapp.com",
  databaseURL: "https://smart-e32f6-default-rtdb.firebaseio.com",
  projectId: "smart-e32f6",
  storageBucket: "smart-e32f6.firebasestorage.app",
  messagingSenderId: "772280639786",
  appId: "1:772280639786:web:f1b2c69396d8fb6f78fe53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const db = getDatabase(app);
