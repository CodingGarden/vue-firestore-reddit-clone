import firebase from '@/firebase';

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true,
});

export default db;
