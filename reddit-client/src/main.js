import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

/* eslint-disable */
import firebase from './firebase';
import auth from './auth';
/* eslint-enable */
import App from './App.vue';
import router from './router';
import store from './store/index';

Vue.config.productionTip = false;

Vue.use(Buefy);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
