import { firestoreAction } from 'vuexfire';
import firebase from '@/firebase';
import db from '@/db'


const state = {
    subreddits: [],
};

const actions = {
    init: firestoreAction(({ bindFirestoreRef }) => {
        bindFirestoreRef('subreddits', db.collection("subreddits"))
    }),
};

export default {
    namespaced: true,
    state,
    actions,
};