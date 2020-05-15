<template>
    <div>
      <section class="hero is-small is-dark">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
       Subreddits
      </h1>
    </div>
  </div>
</section>
   <ul class="menu-list">
     <li v-for="subreddit in subreddits" :key="subreddit.id">
        <router-link
          :to="{ name: 'subreddit', params: { name: subreddit.name } }">
          {{subreddit.name.charAt(0).toUpperCase() + subreddit.name.slice(1)}}
        </router-link>
      </li>
    </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  mounted() {
    this.init();
  },
  computed: mapState("subreddits", ["subreddits"]),
  methods: mapActions("subreddits", ["init"])
};
</script>

