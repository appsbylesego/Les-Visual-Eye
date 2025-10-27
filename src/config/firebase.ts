import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
// TODO: Replace with your actual Firebase project credentials
// Get these from: Firebase Console > Project Settings > General > Your apps > Web app
const firebaseConfig = {
  apiKey: "AIzaSyBenEWe3yQy-UjWvAbKQzvt_joSGprhsEQ",
  authDomain: "les-visual-eye.firebaseapp.com",
  projectId: "les-visual-eye",
  storageBucket: "les-visual-eye.firebasestorage.app",
  messagingSenderId: "1048930249141",
  appId: "1:1048930249141:web:eeab3bb64d43c5d8be91fc",
  measurementId: "G-17ZM7CPRBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;
