import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBZTpp6M5StYnAAY2MeW9X_lWqmw1asEnM",
  authDomain: "ux-jobs-4e6ee.firebaseapp.com",
  projectId: "ux-jobs-4e6ee",
  storageBucket: "ux-jobs-4e6ee.firebasestorage.app",
  messagingSenderId: "5734498973",
  appId: "1:5734498973:web:be825c655452197d708a74",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
