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

                <router-link v-if="getsettingpagereq == 1 && getusertype == 1" to="/admindashboard" class="navbar-brand"><h1> {{getsettingpagedata[1].setting_value}} </h1></router-link>
                <router-link v-if="getsettingpagereq == 1 && getusertype == 2" to="/dashboard" class="navbar-brand"><h1> {{getsettingpagedata[1].setting_value}} </h1></router-link>
                <router-link v-if="getsettingpagereq == 1 &&  getusertype == null && getusertype == ''" to="/" class="navbar-brand" ><h1> {{getsettingpagedata[1].setting_value}} </h1></router-link>

                <button class="navbar-toggler" type="button" data-trigger="#main_nav"><i class="fas fa-bars"></i></button>
                <div class="navbar-collapse" id="main_nav">
                
                    
                <div class="offcanvas-header mt-3">
                    <button class="btn  btn-close float-right"><i class="fas fa-times"></i></button>
                </div>
    
                <ul class="navbar-nav ml-auto " id="">
                    <li class="nav-item active mr-3" v-if="getcompanypagedata != null && getcompanypagedata != '' && getcompanyreq == 1 && getuseremail != '' && getuseremail != null && getcompanypagedata.newuser != 1" ><router-link target="_blank" class="nav-link " :to="'/'+getcompanypagedata.company[0].company_slug">Visit Site</router-link></li>
                    <li class="nav-item active" v-if="getuseremail != '' && getuseremail != null"> <router-link class="nav-link " :to="'/dashboard/profile'">Hi, {{getname}}</router-link> </li>
                    <li class="nav-item active" v-else> <router-link class="nav-link " target="_blank" :to="'/'">Home</router-link> </li>
                </ul>
                </div>
                <ul>
                    <li v-if=" getuseremail == '' || getuseremail == null " class="nav-item aplycolor"> <router-link to="/login"  class="login_btn btn_100">login</router-link>  </li>
                    <li v-else class="nav-item aplycolor" > <a @click="logout()" class="login_btn btn_100">Logout</a> </li>
                </ul>
        
            </div>
        </nav>


    </div>
</template>

<script>
export default {
    name:'DashboardHeader',
    data(){
        return{
            // user:this.$session.get('userdataemail')
        }
    },
    
    computed:{

        getuserdataemail(){
            return this.$store.getters.getuserdataemail;
        },
        getpagerequest(){
          return this.$store.getters.getcompanypagerequest;
        },
        getuseremail(){
            return this.$store.getters.getuseremail;
        },
        getname(){
            return this.$store.getters.getfirstname;
        },
        getuserid(){
            return this.$store.getters.getuserid;
        },
        getusertype(){
            return this.$store.getters.getusertype;
        },

        getcompanyreq(){
          return this.$store.getters.getcompanypagerequest;
        },

        getcompanypagedata(){
            return this.$store.getters.getcompanydata;
        },


        getsettingpagereq(){
            return this.$store.getters.getsettingrequest;
        },
        getsettingpagedata(){
            return  this.$store.getters.getsettingdata;
        },

    },

    created(){
        // if(getsettingpagereq == 0){
        //     this.$store.dispatch('setsettingdata');
        // }
        this.$store.dispatch('setsettingdata');
        let custom = document.createElement('script')
        custom.setAttribute('src', '/src/assets/js/custom.js')
        document.head.appendChild(custom);
    },

    methods:{

        logout(){
            this.$session.destroy();
            localStorage.removeItem('useremail');
            // localStorage.removeItem('companyid');
            localStorage.removeItem('usertype');
            localStorage.removeItem('userid');
            localStorage.removeItem('first_name');
            localStorage.removeItem('admin_id');
            localStorage.removeItem('userdataemail');

            this.$store.dispatch('setuserdataemail',{userdataemail:''});
            
            this.$store.dispatch('setuseremail',{emailid:''});
            this.$store.dispatch('setuserid',{userid:''});
            this.$store.dispatch('setadminid',{admin_id:''});
            // this.$store.dispatch('setcompanyid',{companyid:''});
            this.$store.dispatch('setcompanydashreq',{status:0});
            this.$store.dispatch('setadmindashreq',{status:0});
            this.$store.dispatch('setuserpagereq',{status:0});
            this.$store.dispatch('setclientrequest',{status:0});
            this.$store.dispatch('setcompanyrequest',{status:0});
            this.$store.dispatch('setinquiryrequest',{status:0});
            this.$store.dispatch('setportfoliorequest',{status:0});
            this.$store.dispatch('setproductrequest',{status:0});
            this.$store.dispatch('setservicerequest',{status:0});
            this.$store.dispatch('settestimonialrequest',{status:0});

            this.$router.push('/login');

        }
    }
}
</script>

<style scoped>
    .aplycolor{
        color: white;
    }
</style>