import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Subreddits from './views/Subreddits.vue';
import Subreddit from './views/Subreddit.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/subreddits',
      name: 'subreddits',
      component: Subreddits,
    },
    {
      path: '/r/:name',
      name: 'subreddit',
      component: Subreddit,
    },
  ],
});
