// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain:process.env.FIREBASE_AUTH_DOM ,
  projectId: "spotifyclone-d7d1f",
  storageBucket: "spotifyclone-d7d1f.appspot.com",
  messagingSenderId: "569855898270",
  appId: "1:569855898270:web:c5472f6fa7674dfc44018f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)


export default storage