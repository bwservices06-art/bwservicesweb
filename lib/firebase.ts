import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyASi4OTWMi523hdCJC9Cv1kssh00T0FQSI",
    authDomain: "bw-services-d32d2.firebaseapp.com",
    projectId: "bw-services-d32d2",
    storageBucket: "bw-services-d32d2.firebasestorage.app",
    messagingSenderId: "1048638410252",
    appId: "1:1048638410252:web:64d7db6aff812ceccd6829",
    measurementId: "G-9GTHWEFL6S"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
