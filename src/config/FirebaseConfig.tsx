import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBSUZ6WGliGFHlH1_xNLDW8mF48Mf_NtJE",
    authDomain: "tap-n-chat.firebaseapp.com",
    projectId: "tap-n-chat",
    storageBucket: "tap-n-chat.appspot.com",
    messagingSenderId: "1071410862740",
    appId: "1:1071410862740:web:7ed652b4da67dbcea37281",
    measurementId: "G-V7SMV3HPZJ",
    databaseURL: "https://tap-n-chat-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

/*const getFirebase = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }else {
        firebase.app(); // if already initialized, use that one
    }
    return firebase;
}*/

export const db = firebase.initializeApp(firebaseConfig);
