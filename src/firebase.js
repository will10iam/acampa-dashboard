
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyD97XVkBhe7L00-t-WZId9bcLW2y3DdZhc",
    authDomain: "site-inscricoes.firebaseapp.com",
    projectId: "site-inscricoes",
    storageBucket: "site-inscricoes.appspot.com",
    messagingSenderId: "997353542183",
    appId: "1:997353542183:web:080711f6942b9b90247402",
    measurementId: "G-SRGZXCBWDJ"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log('Persistência definida para localStorage');
    })
    .catch((error) => {
        console.error('Erro ao definir persistência', error)
    });

const db = getFirestore(app);


export { auth, db };