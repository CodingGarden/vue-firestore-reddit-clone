<template>
  <aside class="menu">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li v-for="subreddit in subreddits" :key="subreddit.id">
        <router-link
          :to="{ name: 'subreddit', params: { name: subreddit.name } }">
          {{subreddit.name}}
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  mounted() {
    this.init();
  },
  computed: mapState('subreddits', ['subreddits']),
  methods: mapActions('subreddits', ['init']),
};
</script>

