<template>
    <div>
        <h3 class="mt-5">Home Page</h3>
    </div>
</template>

<script>

export default {
    name:'Home',
    data () {
    return {
        
    }
  },

  created(){
    this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
  },
}
</script>