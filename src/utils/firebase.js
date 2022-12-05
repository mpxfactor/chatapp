import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB0Hk9kBBCwb0TP8ZuY1eW_sN4hbUVKB0Y",

    authDomain: "chatapp-cab90.firebaseapp.com",

    projectId: "chatapp-cab90",

    storageBucket: "chatapp-cab90.appspot.com",

    messagingSenderId: "1094004838784",

    appId: "1:1094004838784:web:709531edaecfad5256b165",

    measurementId: "G-FN4BF3NL7J",
};

export const app = initializeApp(firebaseConfig);
export const authentication = getAuth();
export const database = getFirestore();
export const storage = getStorage();
