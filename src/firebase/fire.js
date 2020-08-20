import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRABASE_KEY,
  authDomain: process.env.REACT_APP_FIRABAS_DOMAIN,
  databaseURL: process.env.REACT_APP_FIRABASE_DATABASE,
  projectId: process.env.REACT_APP_FIRABASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIRABASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIRABASE_SENDER_ID,
  appId: process.env.REACT_APP_FIRABASE_APP_ID,
  measurementId: process.env.REACT_APP_FIRABASE_MEASUREMENT_ID,
};
const fire = firebase.initializeApp(firebaseConfig);

firebase.firestore();

export const auth = firebase.auth();
export const db = firebase.firestore();

export default fire;
