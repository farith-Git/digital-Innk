import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA06j1X6DKXT7f_K-9dgsEWRtQOlrkEO_4",
  authDomain: "ecommerce-1c668.firebaseapp.com",
  projectId: "ecommerce-1c668",
  storageBucket: "ecommerce-1c668.firebasestorage.app",
  messagingSenderId: "604617152809",
  appId: "1:604617152809:web:b91492f1a8d3b4aa883f38",
  measurementId: "G-BSJCJ35BKE"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);