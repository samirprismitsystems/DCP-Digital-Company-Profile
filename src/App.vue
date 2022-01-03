<template>
  <div id="app">
    <DashboardHeader v-if="$route.meta.isfront != true && $route.meta.islanding != true && $route.meta.ispage != true" />
    <SecHeader  v-if="$route.meta.ispage == true" />
    <router-view></router-view>
    <DashboardFooter v-if="$route.meta.isfront != true && $route.meta.islanding != true" />
   </div>
</template>

<script>
import DashboardHeader from './components/DashboardHeader'
import DashboardFooter from './components/DashboardFooter'
import SecHeader from './components/SecHeader'

export default {
  name: 'app',
  metaInfo() {
        return { 
            title: "Digital Company Profile",
            meta: [
                { vmid: 'description', name: 'description', content:  'Digital Business Card'},
                { vmid: 'og:title', property: 'og:title', content: "Digital Company Profile"},
                { vmid: 'og:site_name', property: 'og:site_name', content: 'DCP'},
                { vmid: 'og:type', property: 'og:type', content: 'website'},    
                { vmid: 'robots', name: 'robots', content: 'index,follow'}
            ]
        }
    },

  components:{
    DashboardHeader,
    DashboardFooter,
    SecHeader,
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },

}
</script>

<style>

</style>
