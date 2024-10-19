import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6w9RXd6j-Zzg03Gn2oUAyk-y6mNpKogI",
    authDomain: "week7-yuhanzhou.firebaseapp.com",
    projectId: "week7-yuhanzhou",
    storageBucket: "week7-yuhanzhou.appspot.com",
    messagingSenderId: "940710542040",
    appId: "1:940710542040:web:35411f109c89bd5b06f5ad"
  };
// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()
export default db