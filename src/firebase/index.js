import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDP1KDkxJnZ30mPG_2cQ4sQLwSyEPMms1Q",
  authDomain: "socialmediafilestorage.firebaseapp.com",
  projectId: "socialmediafilestorage",
  storageBucket: "socialmediafilestorage.appspot.com",
  messagingSenderId: "1068752331478",
  appId: "1:1068752331478:web:46818136e06d5efecd5f77",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export { storage, firebase as default };
