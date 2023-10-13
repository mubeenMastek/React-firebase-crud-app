import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import "firebase/compat/database"

const firebaseConfig = {
    apiKey: "AIzaSyCKM8GdvxD_OSjYhXdC1SoRtyxaO1UHmic",
    authDomain: "react-contact-2c9ae.firebaseapp.com",
    projectId: "react-contact-2c9ae",
    storageBucket: "react-contact-2c9ae.appspot.com",
    messagingSenderId: "410098744655",
    appId: "1:410098744655:web:e89845f82e2b42b6da593a"
  };

  const fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();