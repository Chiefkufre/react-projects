// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjmG8Lj3g4qSM-AksklxySCgviLkCFH60",
  authDomain: "realtor-clone-react-9aec8.firebaseapp.com",
  projectId: "realtor-clone-react-9aec8",
  storageBucket: "realtor-clone-react-9aec8.appspot.com",
  messagingSenderId: "553739087594",
  appId: "1:553739087594:web:72a2b0c8107cee0af83193"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();