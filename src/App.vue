<template>
  <div id="app">
    <DashboardHeader v-if="$route.meta.isfront != true && $route.meta.islanding != true && $route.meta.ispage != true" />
    <!-- <AdminDashBoard v-if="$route.meta.isadmindash == true"/> -->
    <SecHeader  v-if="$route.meta.ispage == true" />
    
    <router-view></router-view>
    
    <DashboardFooter v-if="$route.meta.isfront != true && $route.meta.islanding != true" />
    <!-- <SecFooter v-if="$route.meta.isfront != true && $route.meta.islanding != true"/> -->
  </div>
</template>

<script>
import DashboardHeader from './components/DashboardHeader'
import DashboardFooter from './components/DashboardFooter'
import SecHeader from './components/SecHeader'
import SecFooter from './components/SecFooter'
import AdminDash from './components/AdminDash'
// import DashboardFooter from './components/DashboardFooter'
export default {
  name: 'app',
  components:{
    DashboardHeader,
    DashboardFooter,
    SecHeader,
    SecFooter,
    AdminDash
    // DashboardFooter
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
