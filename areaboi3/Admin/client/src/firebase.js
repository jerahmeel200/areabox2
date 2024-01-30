import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, serverTimestamp } from 'firebase/database';
import { getAuth } from 'firebase/auth';
// const {firebase} = require("firebase/app");
// import "firebase/firestore";
// require("firebase/auth");
// require("firebase/database");

const config = {
  apiKey: 'AIzaSyD62f6UAhPWZArs9Nn37Vpz81I6y-NARyo',
  authDomain: 'areabox-chat.firebaseapp.com',
  databaseURL: 'https://areabox-chat.firebaseio.com',
  projectId: 'areabox-chat'
};

export function getFirebaseApp() {
  // if (firebase.apps.length > 0) return firebase.app();

  return initializeApp(config); //return firebase.initializeApp(config)
}

const initFirebase = getFirebaseApp();
const firestore = getFirestore(initFirebase); //initFirebase.firestore();
const database = getDatabase(initFirebase); //initFirebase.database();
const auth = getAuth(initFirebase); //initFirebase.auth();
const authInit = getAuth(); //firebase.auth;
const timestamp = serverTimestamp(); //firebase.database.ServerValue.TIMESTAMP;
const firebaseApiKey = config.apiKey;

export {
  //   firebase,
  auth,
  authInit,
  firestore,
  database,
  timestamp,
  firebaseApiKey as default
};
