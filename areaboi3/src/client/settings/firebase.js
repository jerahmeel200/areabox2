import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage, ref as refS } from 'firebase/storage';

const firebase_config = {
  apiKey: 'AIzaSyD62f6UAhPWZArs9Nn37Vpz81I6y-NARyo',
  authDomain: 'areabox-chat.firebaseapp.com',
  databaseURL: 'https://areabox-chat.firebaseio.com',
  projectId: 'areabox-chat',
  storageBucket: 'areabox-chat.appspot.com',
  messagingSenderId: '654163414128',
  appId: '1:654163414128:web:02f7dadfca8e08214e38b5'
};

export const app = !getApps().length
  ? initializeApp(firebase_config)
  : getApp();

export const auth = getAuth(app);
export const firedbStore = getFirestore(app);
export const FirebaseDatabase = getDatabase(app);
export const firebaseStorage = getStorage(app);

export default FirebaseDatabase;
