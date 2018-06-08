<template>
  <section>
    <button @click="showForm = !showForm" class="button is-primary">Toggle Form</button>
    <form v-if="showForm" @submit.prevent="onCreatePost()">
      <b-field label="Title">
        <b-input v-model="post.title" required></b-input>
      </b-field>
      <b-field label="Description">
        <b-input type="textarea" v-model="post.description"></b-input>
      </b-field>
      <b-field label="URL">
        <b-input v-model="post.URL" type="url"></b-input>
      </b-field>
      <button class="button is-success">Add Post</button>
    </form>
    <div class="posts columns">
      <div class="card column is-4" v-for="post in posts" :key="post.id">
        <div class="card-image" v-if="isImage(post.URL)">
          <figure class="image">
            <img :src="post.URL" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4" v-if="!post.URL">{{post.title}}</p>
              <p class="title is-4" v-if="post.URL"><a :href="post.URL" target="_blank">{{post.title}}</a></p>
              <p class="subtitle is-6">@johnsmith</p>
            </div>
          </div>

          <div class="content">
            {{post.description}}
            <br>
            <time datetime="2016-1-1">{{post.created_at}}</time>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
    showForm: false,
    post: {
      title: '',
      description: '',
      URL: '',
    }
  }),
  mounted() {
    this.initSubreddit(this.$route.params.name);
  },
  watch: {
    '$route.params.name'() {
      this.initSubreddit(this.$route.params.name);
    },
    subreddit() {
      if (this.subreddit.id) {
        this.initPosts(this.subreddit.id);
      }
    },
  },
  computed: {
    ...mapState('subreddit', ['posts']),
    ...mapGetters('subreddit', ['subreddit'])
  },
  methods: {
    isImage(url) {
      return url.match(/(png|jpg|jpeg|gif)$/)
    },
    ...mapActions('subreddit', ['createPost', 'initSubreddit', 'initPosts']),
    async onCreatePost() {
      if (this.post.title && (this.post.description || this.post.URL)) {
        await this.createPost(this.post);
      }
    }
  },
};
</script>

<style>
.posts {
  margin-top: 2em;
}
</style>
