import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
const firebaseConfig = {
  apiKey: "AIzaSyDaB3mWLfJuUmyJCD2BeBK977aue_ntpTk",
  authDomain: "signup-4df65.firebaseapp.com",
  projectId: "signup-4df65",
  storageBucket: "signup-4df65.appspot.com",
  messagingSenderId: "8025717378",
  appId: "1:8025717378:web:6cdd0ab5aae55f9703d29b",
  measurementId: "G-S30381606E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth };