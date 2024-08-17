import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore,collection, addDoc, onSnapshot} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBEzzZbHeKNA0Iycj616-kCm-aj__9dfGk",
    authDomain: "chat-7281b.firebaseapp.com",
    projectId: "chat-7281b",
    storageBucket: "chat-7281b.appspot.com",
    messagingSenderId: "1070254669",
    appId: "1:1070254669:web:0c60151bc077d92e2aea04",
    measurementId: "G-FTSC605W0R"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { app,auth,db, collection, addDoc, onSnapshot };
// export {app,auth,collection}