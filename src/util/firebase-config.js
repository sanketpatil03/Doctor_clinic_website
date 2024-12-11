// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwLfkRVI5YBwXbZLHs_EsaP0m1J5ZW048",
  authDomain: "doctorwebsite-8ac1d.firebaseapp.com",
  projectId: "doctorwebsite-8ac1d",
  storageBucket: "doctorwebsite-8ac1d.firebasestorage.app",
  messagingSenderId: "928027298369",
  appId: "1:928027298369:web:e44219141cd0b0505914c0",
  measurementId: "G-70PEGYLSK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;