import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUWX6Z4ctHd1_K0THqktO17M0btB_PQLk",
  authDomain: "kltn-b2af4.firebaseapp.com",
  projectId: "kltn-b2af4",
  storageBucket: "kltn-b2af4.appspot.com",
  messagingSenderId: "1041237220576",
  appId: "1:1041237220576:web:bd000247f00ab6abfd8485",
  measurementId: "G-D3VGELT3T7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
