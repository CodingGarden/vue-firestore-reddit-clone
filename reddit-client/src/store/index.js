/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';

import auth from './auth';
import post from './post';
import subreddits from './subreddits';
import subreddit from './subreddit';
import users from './users';
import profile from './profile';

Vue.use(Vuex);

export default new Vuex.Store({
    mutations: vuexfireMutations,
    modules: {
        auth,
        post,
        profile,
        subreddits,
        subreddit,
        users,
    },
});