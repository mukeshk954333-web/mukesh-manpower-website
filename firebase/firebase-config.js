/* ==========================================
   MUKESH MANPOWER - FIREBASE CONFIGURATION
   File: firebase/firebase-config.js
   ========================================== */

// Firebase SDK Import (CDN via ES Modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase Project Credentials
// (नोट: जब आप Firebase Console से नया प्रोजेक्ट जोड़ेंगे, तब क्रेडेंशियल्स यहाँ अपडेट कर सकते हैं)
const firebaseConfig = {
    apiKey: "AIzaSyYOUR_API_KEY_HERE",
    authDomain: "mukesh-manpower.firebaseapp.com",
    projectId: "mukesh-manpower",
    storageBucket: "mukesh-manpower.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };

