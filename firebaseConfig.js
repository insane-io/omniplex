import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCh4l6v0ZOXmSP7kIFghPbMTtdXTh0-dY8",
  authDomain: "test1-ae136.firebaseapp.com",
  projectId: "test1-ae136",
  storageBucket: "test1-ae136.firebasestorage.app",
  messagingSenderId: "854662364603",
  appId: "1:854662364603:web:a0de0876bbf33c0ef8589e",
  measurementId: "G-HQD5HEGQH5"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

export const initializeFirebase = () => {
  return app;
};
