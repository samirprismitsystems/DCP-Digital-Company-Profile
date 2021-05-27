<template>
    <div class="center">
        <p>{{verify}}</p> 
        <router-link v-if="verified" :to="'/dashboard/login'">Click Here to Login</router-link>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Verify',
    data(){
        return{
            emailid : this.$route.params.emailid,
            userpass : this.$route.params.userpass,
            verify:'',
            verified:false
        }
    },

    created(){
        let fd = new FormData();
        fd.append('email_id',this.$route.params.emailid );
        fd.append('password',this.$route.params.userpass );

        axios.post('user/verifyuser',fd).then((result) => {
            this.verify = result.data.message;
            this.verified = true;
        }).catch((err) => {
            
        });;
    }
}
</script>

<style scoped>
.center{
    margin-top: 200px;
}

.center p{
    font-size: 30px;
}
</style>