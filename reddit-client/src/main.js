import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

import firebase from './firebase';
import auth from './auth';
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
