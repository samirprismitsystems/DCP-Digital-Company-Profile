<template>
  <div id="app">
    <DashboardHeader v-if="$route.meta.title != 'Front' && $route.meta.title != 'Login' && $route.meta.title != 'Registration' " />
    <router-view></router-view>
    <!-- <DashboardFooter /> -->
  </div>
</template>

<script>
import DashboardHeader from './components/DashboardHeader'
// import DashboardFooter from './components/DashboardFooter'
export default {
  name: 'app',
  components:{
    DashboardHeader,
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
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
}
</style>
