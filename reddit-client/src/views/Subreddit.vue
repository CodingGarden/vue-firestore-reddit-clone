<template>
  <section>
      <button
        v-if="isLoggedIn"
        @click="showForm = !showForm"
        class="button is-primary">
        Toggle Form
      </button>
      <form
        v-if="showForm && isLoggedIn"
        @submit.prevent="onCreatePost()">
          <b-field label="Title">
              <b-input
                v-model="post.title"
                required>
              </b-input>
          </b-field>
          <b-field label="Description">
              <b-input type="textarea"
                  v-model="post.description"></b-input>
          </b-field>
          <b-field label="URL">
              <b-input v-model="post.URL"
                  type="url"></b-input>
          </b-field>
          <button class="button is-success">Add Post</button>
      </form>
      <form class="search-form">
          <b-field label="Search">
              <b-input v-model="searchTerm"></b-input>
          </b-field>
      </form>
    <br>
      <div class="posts columns is-multiline is-4">
        <p class="is-size-1 is-center" v-if="filteredPosts.length == 0">There are no Posts</p>
          <div class="column is-4"
              v-for="post in filteredPosts"
              :key="post.id">
              <div class="card">
                     <div class="media">
                          <div class="media-left">
                            <figure class="image is-48x48">
                                  <img :src="post.author[0].photoURL"> 
                              </figure>
                               Posted by <strong class="is-size-5">{{post.author[0].displayName}}</strong>  
                        <time class="is-size-6"> {{ post.created_at.seconds |  moment("from", "now", true) }} ago <b-icon
                pack="fas"
                icon="clock"
                size="is-small">
            </b-icon></time>
                          </div>
                      </div>
                    <div class="media-content">
                              <p class="title is-3"
                                  v-if="!post.URL">{{post.title}}</p>
                              <p class="title is-4"
                                  v-if="post.URL">
                                  <a :href="post.URL"
                                      target="_blank">{{post.title}}</a>
                              </p>
                          </div>
                          <br>
                  <div class="card-image" v-if="post.URL && isImage(post.URL)">
                      <figure class="image is-2by1">
                          <img :src="post.URL"
                              alt="Placeholder image">
                      </figure>
               
                  </div>
                  <div class="card-content">
                      <div class="content is-size-3" v-if="post.description">
                          {{post.description.substring(0,50)+".."}}
                          <br>
                           </div>
                          <br>
                          <span class="tag is-dark is-medium">
                      <h5 class="is-size-5" v-if="post.likes == 1">{{post.likes}} like</h5>
                             <h5 class="is-size-5" v-else>{{post.likes}} likes</h5>
                 </span>
                          <hr>
                          &nbsp;&nbsp;
                           <button v-if="isLoggedIn && !alreadyLiked(post.liked_by,user.id)"
                            @click="likePost(post.id)"
                            class="button is-primary">
                            Like 👍
                          </button>
                           <button v-if="isLoggedIn && alreadyLiked(post.liked_by,user.id)"
                            @click="unlikePost(post.id)"
                            class="button is-primary ">
                            Unlike 👎
                          </button>
                          <br>
                          <br>
                          <router-link
                            :to="{
                              name: 'post',
                              params: {
                          
                                name: $route.params.name,
                                post_id: post.id
                              }
                            }"
                            class="button is-primary">View Post</router-link> 
                            &nbsp;&nbsp;
                            <button @click="deletePost(post.id)" class="button is-danger"
                            v-if="user && user.id == post.user_id">Delete Post
                            </button>
                  </div>
              </div>
          </div>
      </div>
  </section>
</template>
<script>
import TimeAgo from 'vue2-timeago'

import {
  mapState,
  mapGetters,
  mapActions,
} from 'vuex';


export default {
    components: {
    TimeAgo,
  },
  data: () => ({
    showForm: false,
    searchTerm: '',
    sortRule: '',
    post: {
      title: '',
      description: '',
      URL: '',
    },
  }),
  mounted() {
    this.initUsers();
    this.initSubreddit(this.$route.params.name);
    
  },
  watch: {
    '$route.params.name': function () {
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
    ...mapState('auth', ['isLoggedIn', 'user']),
    ...mapGetters({
      subreddit: 'subreddit/subreddit',
    }),
    loadedUsersById() {
      return this.posts.reduce((byId, post) => {
        byId[post.user_id] = this.usersById[post.user_id] || {
          name: 'Loading...',
          image: 'https://bulma.io/images/placeholders/48x48.png',
        };
        return byId;
      }, {});
    },
    filteredPosts() {
      if (this.searchTerm) {
        const regexp = new RegExp(this.searchTerm, 'gi');
        return this.posts.filter(post =>
          (post.title + post.description).match(regexp));
      }
      return this.posts;
    },

  },
  methods: {
    isImage(url) {
      return url.match(/(png|jpg|jpeg|gif)$/);
    },
      alreadyLiked(arr, id){
      const found = arr.find(element => element == id)
      
      if(found){
      
        return true;
        } 
      else return false;
    },
    ...mapActions('subreddit', ['createPost', 'initSubreddit', 'initPosts','deletePost']),
    ...mapActions('post',['likePost','unlikePost']),
    ...mapActions('users', {
      initUsers: 'init',
    }),
    async onCreatePost() {
      if (this.post.title && (this.post.description || this.post.URL)) {
        this.createPost(this.post);
        this.post = {
          title: '',
          description: '',
          URL: '',
        };
        this.showForm = false;
      }
    },
  },
};
</script>

<style>
    .search-form {
        margin-top: 2em;
    }
    .posts {
        margin-top: 2em;
    }
    .card {
        height: 100%;
        margin: 1%;
        border-radius: 5px;
    }
     
</style>

