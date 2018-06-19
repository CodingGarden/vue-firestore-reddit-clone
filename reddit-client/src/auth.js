import firebase from '@/firebase';
import store from '@/store';
import db from '@/db';
import router from '@/router';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.user) {
      /* eslint-disable */
      user = user.user;
      /* eslint-enable */
    }
    const setUser = {
      id: user.uid,
      name: user.displayName,
      image: user.photoURL,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    };
    db.collection('users').doc(setUser.id).set(setUser);
    store.commit('auth/setUser', setUser);
    router.push('/subreddits');
  } else {
    store.commit('auth/setUser', null);
  }
});
