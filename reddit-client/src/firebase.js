import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBsaUdHrN_e2KWq0YbgDunIAJaoR8Sfwz0',
  authDomain: 'reddit-clone-c5154.firebaseapp.com',
  databaseURL: 'https://reddit-clone-c5154.firebaseio.com',
  projectId: 'reddit-clone-c5154',
  storageBucket: 'reddit-clone-c5154.appspot.com',
  messagingSenderId: '110712594228',
};

firebase.initializeApp(config);

export default firebase;
