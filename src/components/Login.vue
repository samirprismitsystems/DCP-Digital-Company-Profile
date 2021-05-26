<template>

<div class="container mt-5">
   <div class="row justify-content-center">
    <div class="col-lg-6">
    
    <h3 class="mb-2 mt-2">Digital Company Profile</h3>

   <form class="text-justify mt-4" @submit.prevent="userlogin()">
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" ref="email" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>

        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" ref="password" name="password" id="exampleInputPassword1" placeholder="Password">
        </div>

        <button type="submit" class="btn btn-primary">Login</button>
    </form>
    
    <router-link class="mt-4 mb-4 float-left" :to="'/dashboard/registration'">Don't have Account? Register Your self.</router-link>

    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios'
export default {
    name:'Login',
    data(){
        return{
        }
    },

    created(){
        if(localStorage.getItem('useremail') != null){
            this.$router.push('/dashboard/');
        }
    },

    computed:{
        getuser(){
            return this.$store.getters.getuseremail;
        }
    },

    methods:{
        userlogin(){
            let fd = new FormData();
            fd.append('email',this.$refs.email.value);
            fd.append('password',this.$refs.password.value);
            axios.post('user/loginuser',fd).then((result) => {
                console.log(result.data);
                let userdata = result.data.userdata;

                localStorage.setItem('useremail',userdata.email_id);
                localStorage.setItem('userid',userdata.user_id);
                localStorage.setItem('first_name',userdata.first_name);
                // localStorage.setItem('companyid',userdata.company_id);

                this.$store.dispatch('setuseremail',{emailid:userdata.email_id});
                this.$store.dispatch('setuserid',{userid:userdata.user_id});
                this.$store.dispatch('setfirstname',{first_name:userdata.first_name});
                // this.$store.dispatch('setcompanyid',{companyid:userdata.company_id});

                this.$router.push('/dashboard/');

            });
        }
    }
}
</script>