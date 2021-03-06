import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import moment from 'moment'
import * as firebase from 'firebase'
import App from './App.vue'
import Routes from './routes'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'

Vue.use(VueResource);
Vue.prototype.$moment = moment;
Vue.use(VueRouter);
Vue.prototype.$firebase = firebase;
Vue.use(VueLodash, lodash);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDhdEhcLPfGqo5_msnhVKWH9BkZNOc6RYw',
      authDomain: 'nots-76611.firebaseapp.com',
      databaseURL: 'https://nots-76611.firebaseio.com',
      projectId: 'nots-76611',
      storageBucket: 'gs://nots-76611.appspot.com'
    });
  }
})
