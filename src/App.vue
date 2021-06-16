<template>
  <div id="app">
    <DashboardHeader v-if="$route.meta.isfront != true && $route.meta.islanding != true" />
    <!-- <AdminDashBoard v-if="$route.meta.isadmindash == true"/> -->
    <!-- <SecHeader  v-if="$route.meta.isfront != true && $route.meta.islanding != true" /> -->
    
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
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
} */
</style>
