import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth,signInWithPopup,signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore,query,getDocs,collection,where,setDoc, doc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDQ2eP8JjbJqGbu70ahqpMn8irwANuSueQ",
  authDomain: "reminder-13839.firebaseapp.com",
  projectId: "reminder-13839",
  storageBucket: "reminder-13839.appspot.com",
  messagingSenderId: "595499699108",
  appId: "1:595499699108:web:19c75235468600d8374f31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



export {
  auth,
  db
};