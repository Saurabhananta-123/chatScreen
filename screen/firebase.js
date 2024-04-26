// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm-bkEqqgruEcJVrwV0X6GhFEmHKz8or0",
  authDomain: "yourprojectname-2c212.firebaseapp.com",
  projectId: "yourprojectname-2c212",
  storageBucket: "yourprojectname-2c212.appspot.com",
  messagingSenderId: "956587016011",
  appId: "1:956587016011:web:4a78f91e00d68fc16bb2ce",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
