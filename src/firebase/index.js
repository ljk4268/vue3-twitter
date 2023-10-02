// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDg4vVqRA0EfKnN7py8tFlGRJJ108B9iM",
  authDomain: "twitter-clone-inflearn-198e2.firebaseapp.com",
  projectId: "twitter-clone-inflearn-198e2",
  storageBucket: "twitter-clone-inflearn-198e2.appspot.com",
  messagingSenderId: "808722563182",
  appId: "1:808722563182:web:722909574fad4fa4b8267f",
  measurementId: "G-NMWSNJF5LV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);




