import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDoWUz8bc2LysuKqqnyKqt8TkJx0FxhzGU",
  authDomain: "fixian-a8068.firebaseapp.com",
  databaseURL: "https://fixian-a8068.firebaseio.com",
  projectId: "fixian-a8068",
  storageBucket: "fixian-a8068.appspot.com",
  messagingSenderId: "36705796368",
  appId: "1:36705796368:web:f7bf01386951818426e595",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase, storage as default };
