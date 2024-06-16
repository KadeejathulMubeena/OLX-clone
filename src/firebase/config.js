import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDoV1_mc-DqnnMlfLmj1IKuu3b_sYIqvr4",
  authDomain: "olx-clone-975ef.firebaseapp.com",
  projectId: "olx-clone-975ef",
  storageBucket: "olx-clone-975ef.appspot.com",
  messagingSenderId: "952074944171",
  appId: "1:952074944171:web:ed6247949d406819df01ee",
  measurementId: "G-YLN9MDTRB7"
};


const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

export const storage = getStorage(app);


export { auth, db };