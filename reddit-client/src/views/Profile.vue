<template>
<section>
  <div class="container">
       <span class="avatar">
                <figure class="image is-48x48">
                  <img :src="user.image">
                </figure>
                <strong>{{user.name}}</strong>
              </span>
    <form class="search-form">
          <b-field label="Search">
              <b-input v-model="searchTerm"></b-input>
          </b-field>
      </form>
      <hr>
    <h1 class="title">
      <b class="is-size-2">Your Posts ({{filteredPosts.length}})</b>
      </h1>
          <div class="card" v-for="p in filteredPosts" v-bind:key="p.id">
                  <div class="card-content">
                      <div class="media">
                          <div class="media-content">

                         
                        <time class="is-size-6"> {{p.created_at.seconds |  moment("from", "now", true) }} ago  <b-icon
                pack="fas"
                icon="clock"
                size="is-small">
            </b-icon></time>
                            <hr>
                              <p class="title is-size-2"
                                  v-if="!p.URL">{{p.title}}</p>
                              <p class="title is-size-2"
                                  v-if="p.URL">
                                  <a :href="p.URL"
                                      target="_blank">{{p.title}} </a>
                              </p>
                          </div>
                      </div>
                               <div class="content is-size-3" v-if="p.description">
                          {{p.description}}
                             </div>
                      <div class="card-image">
                      <figure>
                          <img :src="p.URL"
                              v-if="p.URL && isImage(p.URL)">
                      </figure>
                  </div>
                    <span class="tag is-dark is-medium">
                      <h5 class="is-size-5" v-if="p.likes == 1">{{p.likes}} like</h5>
                             <h5 class="is-size-5" v-else>{{p.likes}} likes</h5>
                 </span>
                          <br>
                          <hr>
                           <button v-if="isLoggedIn && !alreadyLiked(p.liked_by,user.id)"
                            @click="likePost(p.id)"
                            class="button is-primary">
                            Like 👍
                          </button>
                           <button v-if="isLoggedIn && alreadyLiked(p.liked_by,user.id)"
                            @click="unlikePost(p.id)"
                            class="button is-primary">
                            Unlike 👎
                          </button>
                          <br>
                          <br>
                           <button @click="deletePost(p.id)" class="button is-danger"
                          >Delete Post
                            </button>
                             <router-link
                            :to="{
                              name: 'post',
                              params: {
                          
                                post_id: p.id
                              }
                            }"
                            class="button is-primary">Go to post</router-link> 
                  </div>
              </div>
          </div>
          <hr>

      <hr>
      <b class="is-size-2">Your Comments ({{filteredComments.length}})</b>
    <br>
    
    <br>
          <article class="card" v-for="comment in filteredComments" :key="comment.id">
  <figure class="media-left">
    <p class="image is-64x64">
          <img :src="comment.author[0].photoURL"
        alt="Placeholder image">
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong class="is-size-5">{{comment.author[0].displayName}}</strong><small class="is-size-5"> {{comment.created_at.seconds |  moment("from", "now", true) }} ago</small>
        <br>
          <h5 class="is-size-5">{{comment.content}}</h5>
        <br>
        <p class="title is-4"
                                  v-if="comment.URL && !isImage(comment.URL)">
                                  <a :href="comment.URL"
                                      target="_blank">{{comment.URL}}</a>
                              </p>
    </div>
     <div class="comment-img">
                      <figure class="image">
                          <img :src="comment.URL"
                              v-if="comment.URL && isImage(comment.URL)" >
                      </figure>
                  </div>
                  <!--
     <h5 class="is-size-6" v-if="comment.likes == 1">{{comment.likes}} like</h5>
                          <h5 class="is-size-6" v-else>{{comment.likes}} likes</h5>
                           <button v-if="isLoggedIn && !alreadyLiked(comment.liked_by,user.id)"
                            @click="likeComment(comment.id)"
                            class="button is-primary">
                            Like 👍
                          </button>
                           <button v-if="isLoggedIn && alreadyLiked(comment.liked_by,user.id)"
                            @click="unlikeComment(comment.id)"
                            class="button is-primary">
                            Unlike 👎
                          </button>
                          -->
                           <button
                            @click="deleteComment(comment.id)"
                          
                            class="button is-danger">
                            Delete Comment
                          </button>     
                           <router-link
                            :to="{
                              name: 'post',
                              params: {
                          
                                post_id: comment.post_id
                              }
                            }"
                            class="button is-primary">Go to post</router-link> 
                            &nbsp;&nbsp;
      </div>
    </article>
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
    showCommentForm: false,
 
    searchTerm: '',
 
  }),
  mounted() {
    this.initUsers();
    this.initPosts(this.user.id);
    this.initComments(this.user.id);
    console.log(this.user.id);
  },

  computed: {
    ...mapState('profile', ['posts','comments']),
    ...mapState('auth', ['isLoggedIn', 'user']),

       filteredPosts() {
      if (this.searchTerm) {
        const regexp = new RegExp(this.searchTerm, 'gi');
        return this.posts.filter(post =>
          (post.title + post.description).match(regexp));
      }

      return this.posts;

    },
     filteredComments() {
      if (this.searchTerm) {
        const regexp = new RegExp(this.searchTerm, 'gi');
        return this.comments.filter(comment =>
          (comment.content).match(regexp));
      }

      return this.comments;

    },
  },
  methods: {
    isImage(url) {
      return url.match(/(png|jpg|jpeg|gif)$/);
    },
    alreadyLiked(arr, id){
      const found = arr.find(element => element == id)
      console.log(found);
      if(found) return true;
      else return false;
    },
    ...mapActions('profile', ['initPosts','initComments', 'deletePost',
    'deleteComment','likePost','unlikePost',
    'likeComment','unlikeComment']),
    ...mapActions('users', {
      initUsers: 'init',
    }),

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
        padding:1%;
        height: 100%;
        margin: 1%;
        border-radius: 6px;
    }
    
    .card img {
        border-radius: 5px;
        width:70%;
    }
    .comment-img img{
      width:20%;
    }
    .media-content {
    overflow-x: visible; 
}
</style>

