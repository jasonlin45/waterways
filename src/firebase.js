import initializeApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyBZgnDPK_5f15mZZfiVw3avFrZsEp27Otc",
  
    authDomain: "geo-waterway.firebaseapp.com",
  
    projectId: "geo-waterway",
  
    storageBucket: "geo-waterway.appspot.com",
  
    messagingSenderId: "862651867848",
  
    appId: "1:862651867848:web:45d380312a8ce3a505bbfd"
  
  };
  

const app = initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();
