import { firestoreAction } from 'vuexfire';
import firebase from '@/firebase';
import db from '@/db'
import router from '@/router';
import { ToastProgrammatic as Toast } from 'buefy'

const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

const posts = db.collection('posts');
const comments = db.collection('comments');

const state = {
    post: [],
    comments: [],
}

const getters = {
    Post: state => (state.post[0] ? state.post[0] : {}),

}

const actions = {
    async createComment({ getters }, comment) {
        const result = comments.doc();
        comment.id = result.id;
        comment.author = firebase.auth().currentUser.providerData;
        comment.post_id = getters.Post.id;
        comment.likes = 0;
        comment.user_id = firebase.auth().currentUser.uid;
        comment.created_at = firebase.firestore.FieldValue.serverTimestamp();
        comment.updated_at = firebase.firestore.FieldValue.serverTimestamp();
        try {
            await comments.doc(comment.id).set(comment);
            Toast.open('Comment Created!')
        } catch (error) {
            console.error(error);
        }

    },
    async deletePost(_, post_id) {
        Toast.open('Post Deleted!')
        await posts.doc(post_id).delete();
        router.push('/subreddits');
    },
    async deleteComment(_, comment_id) {
        await comments.doc(comment_id).delete();
        Toast.open('Comment Deleted!')
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
    initPost: firestoreAction(({ bindFirestoreRef }, post_id) => {
        bindFirestoreRef('post', posts.where('id', '==', post_id));
    }),
    initComments: firestoreAction(({ bindFirestoreRef }, post_id) => {
        bindFirestoreRef('comments', comments.where('post_id', '==', post_id));
    }),
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
};