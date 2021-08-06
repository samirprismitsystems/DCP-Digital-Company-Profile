import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'

import "regenerator-runtime/runtime.js";

// Import Router from router.js
import router from './router'
import store from './store/index'

let sitemainpath = '/digital-company-profile/';
// let sitemainpath = '/';


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
  render: h => h(App),
  // mounted () {
  //   document.dispatchEvent(new Event('render-event'))
  // }
})
