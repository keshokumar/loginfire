import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // Import for Realtime Database
import { getPerformance } from "firebase/performance"; // Import for Performance Monitoring

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqY7qHvs7HDZAhUWG7t8EJoylOH7Jry0I",
  authDomain: "login-auth-8e1ca.firebaseapp.com",
  projectId: "login-auth-8e1ca",
  storageBucket: "login-auth-8e1ca.appspot.com",
  messagingSenderId: "741115544565",
  appId: "1:741115544565:web:a28a23b29242807c17d6bc",
  databaseURL: "https://login-auth-8e1ca-default-rtdb.firebaseio.com/" // Add Realtime Database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app); // Initialize Realtime Database
export const performance = getPerformance(app); // Initialize Performance Monitoring
export default app;
