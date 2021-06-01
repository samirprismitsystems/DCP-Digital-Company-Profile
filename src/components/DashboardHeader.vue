<template>
    <div>

        <!--icon-->
      <link rel="icon" href="#" />
  <!--	  fonts-->
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap"
        media="print"
        onload="this.media='all'"
      />
      <noscript>
        <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap"
        />
      </noscript>

      <link href="/src/assets/fonts/font.css" rel="stylesheet" defer>
      <link rel="preload" href="/src/assets/webfonts/fa-brands-400.woff" as="font">
      <link rel="preload"  href="/src/assets/webfonts/fa-brands-400.woff" as="font" type="font/woff" crossorigin="anonymous">
      <link rel="preload"  href="/src/assets/webfonts/fa-brands-400.woff2" as="font" type="font/woff2" crossorigin="anonymous">
      <link rel="preload"  href="/src/assets/webfonts/fa-solid-900.woff" as="font" type="font/woff" crossorigin="anonymous">
      <link rel="preload"  href="/src/assets/webfonts/fa-solid-900.woff2" as="font" type="font/woff2" crossorigin="anonymous"> 
    <!--	  theme-->
      <link href="/src/assets/theme/media-query.css" rel="stylesheet" defer>
      <link href="/src/assets/theme/navbar.css" rel="stylesheet" defer>
      <link href="/src/assets/theme/icon.css" rel="stylesheet" defer>
    <!--	  style-->
      <link href="/src/assets/css/style.css" rel="stylesheet" defer>
      <link href="/src/assets/css/responsive.css" rel="stylesheet" defer>

        
        

        <nav class="navbar navbar-expand-lg " id="">
            <div class="container custom_container">
                <a class="navbar-brand " href="index.html"><h1>DCP</h1></a>
                <button class="navbar-toggler" type="button" data-trigger="#main_nav"><i class="fas fa-bars"></i></button>
                <div class="navbar-collapse" id="main_nav">
                <div class="offcanvas-header mt-3">
                    <button class="btn  btn-close float-right"><i class="fas fa-times"></i></button>
                </div>
                <ul class="navbar-nav ml-auto " id="">
                    <li class="nav-item active"> <a class="nav-link " href="index.html">Home</a> </li>
                </ul>
                </div>
                
                <ul> 
                    <li class="nav-item aplycolor" v-if="getuseremail == null"> <router-link to="/dashboard/login"  class="login_btn btn_100">login {{getuseremail}}</router-link>  </li>
                    <!-- <li class="nav-item " v-if="getuseremail != null"> <a href="login.html" target="_blank" class="login_btn btn_100">Profile</a> </li> -->
                    <li class="nav-item aplycolor" v-else> <a @click="logout()" class="login_btn btn_100">Logout</a> </li>
                </ul>
            </div>
        </nav>

    </div>
</template>

<script>
export default {
    name:'DashboardHeader',
    computed:{
        getuseremail(){
            return this.$store.getters.getuseremail;
        },
        getname(){
            return this.$store.getters.getfirstname;
        },
        getuserid(){
            return this.$store.getters.getuserid;
        }
    },

    created(){
        if(this.getuseremail == null){
            this.$router.push('/dashboard/login');
        }
    },

    methods:{
        logout(){
            localStorage.removeItem('useremail');
            localStorage.removeItem('userid');
            localStorage.removeItem('companyid');
            
            this.$store.dispatch('setuseremail',{emailid:''});
            this.$store.dispatch('setuserid',{userid:''});
            // this.$store.dispatch('setcompanyid',{companyid:''});
            this.$store.dispatch('setclientrequest',{status:0});
            this.$store.dispatch('setcompanyrequest',{status:0});
            this.$store.dispatch('setinquiryrequest',{status:0});
            this.$store.dispatch('setportfoliorequest',{status:0});
            this.$store.dispatch('setproductrequest',{status:0});
            this.$store.dispatch('setservicerequest',{status:0});
            this.$store.dispatch('settestimonialrequest',{status:0});

            this.$router.push('/dashboard/login');

        }
    }
}
</script>

<style scoped>
    .aplycolor{
        color: white;
    }
</style>