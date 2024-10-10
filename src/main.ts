import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYP4DIsA3m95DICavdGnW77yRxWN12bDs",
  authDomain: "tsshop-7a9e2.firebaseapp.com",
  projectId: "tsshop-7a9e2",
  storageBucket: "tsshop-7a9e2.appspot.com",
  messagingSenderId: "315004616840",
  appId: "1:315004616840:web:1a3c956fa610d39e4b1f3d",
  measurementId: "G-R8B98QZ56B",
  databaseURL: 'https://tsshop-7a9e2-default-rtdb.firebaseio.com/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
