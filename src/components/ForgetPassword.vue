<template>

<div class="container mt-5">
   <div class="row justify-content-center">
    <div class="col-lg-6">
    
    <h3 class="mb-2 mt-2">Forget Password</h3>

   <form class="text-justify mt-4" @submit.prevent="sendforgetpassword()">
        <div class="form-group">
            <label for="exampleInputEmail1">Email Address</label>
            <input type="email" class="form-control" ref="email" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <button type="submit" class="btn btn-primary">Send</button>
    </form>
    <router-link class="mt-4 mb-4 float-left" :to="'/dashboard/login'"> &laquo; Back to login.</router-link>

    <div class="alert alert-success" v-if="showmsg">{{msg}}</div>

    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios'
export default {
    name:'ForgetPassword',
    data(){
        return{
            msg:'',
            showmsg:false
        }
    },

    computed:{
        getuser(){
            return this.$store.getters.getuseremail;
        }
    },

    methods:{
        sendforgetpassword(){
            let fd = new FormData();
            fd.append('email',this.$refs.email.value);

            axios.post('user/forgetpassword',fd).then((result) => {
                // console.log(result.data);
                this.msg = result.data.message;
                this.showmsg = true;
                setTimeout(() => {
                    this.msg = '';
                    this.showmsg = false;
                    this.$router.push('/dashboard/login');
                }, 2000);
            });
        }
    }
}
</script>