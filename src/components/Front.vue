<template>
    <div>
        Front {{companyid}}

        


    </div>
</template>

<script>
export default {
    name:'Front',
    data(){
        return{
            companyid:this.$route.params.companyid
        }
    },
    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
    }
}
</script>