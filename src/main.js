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

import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
delete Icon.Default.prototype._getIconUrl;
Icon.Default.imagePath = '.';
Icon.Default.mergeOptions({
  iconRetinaUrl: '/src/frontassets/img/marker-icon-2x.png',
  iconUrl: '/src/frontassets/img/marker-icon.png',
  shadowUrl: '/src/frontassets/img/marker-shadow.png'
});

Vue.prototype.$imgpath = window.location.origin+'/control/upload/';
Vue.prototype.$linkpath = window.location.origin+'/src/assets/';



axios.defaults.baseURL = window.location.protocol+"//"+window.location.hostname+sitemainpath+"control/api/";

new Vue({
  el: '#app',
  router:router,
  store:store,
  render: h => h(App)
})
