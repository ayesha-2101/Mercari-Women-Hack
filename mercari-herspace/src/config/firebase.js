// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdEsmf-A_UwV-Hzvum1yE-aaQvXxrHbJ0",
  authDomain: "shambhala-7795d.firebaseapp.com",
  projectId: "shambhala-7795d",
  storageBucket: "shambhala-7795d.appspot.com",
  messagingSenderId: "246759775369",
  appId: "1:246759775369:web:51e1a83d20efc1c3037a58",
  measurementId: "G-Y5KJL8CE0E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()