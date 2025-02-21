import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCqjBhxDR201kBhmsOCGQK0mOcwJ0Ev1SY",
  authDomain: "taskmanagement-8ad05.firebaseapp.com",
  projectId: "taskmanagement-8ad05",
  storageBucket: "taskmanagement-8ad05.firebasestorage.app",
  messagingSenderId: "32166147584",
  appId: "1:32166147584:web:bcde78d4f3a37c0f69cae5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth