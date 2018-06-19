import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Subreddits from './views/Subreddits.vue';
import Subreddit from './views/Subreddit.vue';
import Post from './views/Post.vue';

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
    {
      path: '/r/:name/:post_id',
      name: 'post',
      component: Post,
    },
  ],
});
