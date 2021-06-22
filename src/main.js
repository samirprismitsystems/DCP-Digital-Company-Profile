import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'

import "regenerator-runtime/runtime.js";
// Import Router from router.js
import router from './router'
import store from './store/index'

import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

import Select2 from 'v-select2-component';
Vue.component('Select2', Select2);

let sitemainpath = '/digital-company-profile/';

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
// set default config
Vue.$cookies.config(60*10,sitemainpath)


Vue.prototype.$imgpath = window.location.origin+'/control/upload/';
Vue.prototype.$linkpath = window.location.origin+'/src/assets/';



axios.defaults.baseURL = "http://localhost"+sitemainpath+"control/api/";

new Vue({
  el: '#app',
  router:router,
  store:store,
  render: h => h(App)
})
