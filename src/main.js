import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import * as firebase from 'firebase'
import App from './App.vue'
import Routes from './routes'

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.prototype.$firebase = firebase;

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
    })
  }
})
