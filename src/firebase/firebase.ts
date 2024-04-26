import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCB3m8Njvc3cSsVs8vwzWr4-0sjShEwAJM",
  authDomain: "codenet-c7715.firebaseapp.com",
  projectId: "codenet-c7715",
  storageBucket: "codenet-c7715.appspot.com",
  messagingSenderId: "839424448204",
  appId: "1:839424448204:web:45589e7994843170ea5469",
  measurementId: "G-SCWDZDFBKW",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, app, storage };
