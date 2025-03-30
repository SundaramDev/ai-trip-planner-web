// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBPS6759fiHJuuJtMFNeXbK3hkwn_zQRJo",
    authDomain: "ai-travel-planner-45cd7.firebaseapp.com",
    projectId: "ai-travel-planner-45cd7",
    storageBucket: "ai-travel-planner-45cd7.appspot.com", // ✅ Corrected
    messagingSenderId: "761484881825",
    appId: "1:761484881825:web:7e016b3790ab20468965e0",
    measurementId: "G-N9W4S0WVSV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);
