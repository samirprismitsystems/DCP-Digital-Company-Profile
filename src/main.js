import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'

import "regenerator-runtime/runtime.js";
// Import Router from router.js
import router from './router'
import store from './store/index'

import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);


Vue.prototype.$imgpath = window.location.origin+'/control/upload/';

Vue.prototype.$linkpath = window.location.origin+'/src/assets/';

let sitemainpath = '/digital-company-profile/';

axios.defaults.baseURL = "http://localhost"+sitemainpath+"control/api/";

new Vue({
  el: '#app',
  router:router,
  store:store,
  render: h => h(App)
})
