import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyBZgnDPK_5f15mZZfiVw3avFrZsEp27Otc",
  
    authDomain: "geo-waterway.firebaseapp.com",
  
    projectId: "geo-waterway",
  
    storageBucket: "geo-waterway.appspot.com",
  
    messagingSenderId: "862651867848",
  
    appId: "1:862651867848:web:45d380312a8ce3a505bbfd"
  
  };
  

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore();
