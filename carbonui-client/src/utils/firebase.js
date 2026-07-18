import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "carbonui.firebaseapp.com",
  projectId: "carbonui",
  storageBucket: "carbonui.firebasestorage.app",
  messagingSenderId: "468746200587",
  appId: "1:468746200587:web:bf0147794d8e8c4354490e"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth,provider};