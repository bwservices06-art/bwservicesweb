import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyArdZ0hNmy1gqNULPCJQbbGml2KXMGYU4Q",
    authDomain: "services-website-8f801.firebaseapp.com",
    databaseURL: "https://services-website-8f801-default-rtdb.firebaseio.com",
    projectId: "services-website-8f801",
    storageBucket: "services-website-8f801.firebasestorage.app",
    messagingSenderId: "358116867362",
    appId: "1:358116867362:web:cde270ec40855859cf797b",
    measurementId: "G-5SJ7MEYVNW"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
