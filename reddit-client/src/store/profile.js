import { firestoreAction } from 'vuexfire';
import firebase from '@/firebase';
import db from '@/db'
import router from '@/router';

const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

const posts = db.collection('posts');
const comments = db.collection('comments');

const state = {
    posts: [],
    comments: [],
}

const getters = {
    Post: state => (state.posts[0] ? state.posts[0] : {}),

}

const actions = {
    async deletePost(_, post_id) {

        await posts.doc(post_id).delete();
    },
    async deleteComment(_, comment_id) {
        await comments.doc(comment_id).delete();

    },
    async likePost(_, post_id) {

        await posts.doc(post_id).update({
            'likes': increment,
            liked_by: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
        })
    },
    async unlikePost(_, post_id) {
        await posts.doc(post_id).update({
            'likes': decrement,
            liked_by: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.uid)
        })
    },
    async likeComment(_, comment_id) {
        await comments.doc(comment_id).update({
            'likes': increment,
            liked_by: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
        })
    },
    async unlikeComment(_, comment_id) {
        await comments.doc(comment_id).update({
            'likes': decrement,
            liked_by: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.uid)
        })
    },
    initPosts: firestoreAction(({ bindFirestoreRef }, user_id) => {
        bindFirestoreRef('posts', posts.where('user_id', '==', user_id));
    }),
    initComments: firestoreAction(({ bindFirestoreRef }, user_id) => {
        bindFirestoreRef('comments', comments.where('user_id', '==', user_id));
    }),

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
};