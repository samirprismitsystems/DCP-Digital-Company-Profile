<template>

    <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<DashData />

		<div class=" right_sidebar_content">
			<div class="tabs-stage">
			    
        <!-- <Compay /> -->
        <!-- <SocialLinks /> -->
      <!-- <router-view></router-view> -->

		</div>
	</div>
</div>
	</div> 
</section>

<!-- content --> 



</template>

<script>
import DashData from './DashData'
// import Front from './Front'
import Compay from './Company'
import SocialLinks from './SocialLinks'

export default {
    name:'Home',
    data () {
    return {
    }
  },

  components:{
    DashData,
    Compay,
	SocialLinks
  },

  computed:{
    getuser(){
      return this.$store.getters.getfirstname;
    },
    getuserid(){
      return this.$store.getters.getuserid;
    },
    getcompanypagerequest(){
      return this.$store.getters.getcompanypagerequest;
    },
  },

  created(){
    this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
    // if(getcompanypagerequest == 0){
      // this.$store.dispatch('setcompanydata',{id: this.getuserid});
      // this.$store.dispatch('setportfolioData',{id: this.getuserid });
      // this.$store.dispatch('setinquiryData',{id: this.getuserid } );
      // this.$store.dispatch('setproductdata',{id: this.getuserid });
      // this.$store.dispatch('setservicedata',{id: this.getuserid });
      // this.$store.dispatch('settestimonialData',{id: this.getuserid } );
    // }
  
  },
}
</script>