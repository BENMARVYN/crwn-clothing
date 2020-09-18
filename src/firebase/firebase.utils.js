import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAZ-x-A4IoJnqqNkVx_BDrc7Rf1DXfiEE8",
  authDomain: "crwn-db-a0b8f.firebaseapp.com",
  databaseURL: "https://crwn-db-a0b8f.firebaseio.com",
  projectId: "crwn-db-a0b8f",
  storageBucket: "crwn-db-a0b8f.appspot.com",
  messagingSenderId: "726659120283",
  appId: "1:726659120283:web:0b9b9468381f11f0dcda3e",
  measurementId: "G-R1WD96JL32"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;