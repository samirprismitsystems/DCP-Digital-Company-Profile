<template>
    <div>
        <h3 class="mt-5">Home Page</h3>
        Hi, {{getuser}}    </div>
</template>

<script>

export default {
    name:'Home',
    data () {
    return {
    }
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
      this.$store.dispatch('setcompanydata',{id: this.getuserid});
      this.$store.dispatch('setportfolioData',{id: this.getuserid });
      this.$store.dispatch('setinquiryData',{id: this.getuserid } );
      this.$store.dispatch('setproductdata',{id: this.getuserid });
      this.$store.dispatch('setservicedata',{id: this.getuserid });
      this.$store.dispatch('settestimonialData',{id: this.getuserid } );
    // }
  
  },
}
</script>