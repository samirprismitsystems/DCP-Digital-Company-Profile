<template>

<div class="container mt-5">
   <div class="row justify-content-center">
    <div class="col-lg-6">

   <form class="text-justify" @submit.prevent="userlogin()">
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
                localStorage.setItem('companyid',userdata.company_id);

            });
        }
    }
}
</script>