import { firebaseAction } from 'vuexfire';
import db from '@/db';

const state = {
  subreddits: [],
};

const actions = {
  init: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('subreddits', db.collection('subreddits'));
  }),
};

export default {
  namespaced: true,
  state,
  actions,
};

