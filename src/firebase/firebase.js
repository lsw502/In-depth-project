// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBB_BdeWibV4J3pFyHV0SeU-LZk95S2U_M",
    authDomain: "fir-test-35377.firebaseapp.com",
    projectId: "fir-test-35377",
    storageBucket: "fir-test-35377.appspot.com",
    messagingSenderId: "88826988360",
    appId: "1:88826988360:web:5da1ff1a3383c89c0ad57d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
