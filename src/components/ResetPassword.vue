<template>

<div class="container mt-5">
   <div class="row justify-content-center">
    <div class="col-lg-6">

        <h3 class="mb-4">Reset Password</h3>

    <form class="text-justify" @submit.prevent="changepass()">

        <div class="form-group">
            <label>New Password</label>
            <input type="password" v-on:keyup="checkpassword()" class="form-control" ref="npass" name="npass" placeholder="New Password">
        </div>

        <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" v-on:keyup="checkpassword()" class="form-control" ref="cnpass" name="cnpass" placeholder="Confirm Password">
        </div>

        <p class="text-danger" v-if="showpassmsg">* Password Not Matched</p>

        <button type="submit" class="btn btn-primary">Update</button>
    </form>

    <div class="alert alert-success mt-4" v-if="alertshow">{{alertmsg}}</div>

    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios'
export default {
    name:'ResetPassword',
    data(){
        return{
            alertmsg:'',
            alertshow:false,
            showpassmsg:false,
            email_id:this.$route.params.email,
        }
    },

    methods:{

        checkpassword(){
            let pass = this.$refs.npass.value;
            let cnfpass = this.$refs.cnpass.value;
            
            if(pass != ''  && cnfpass != ''){
                if( pass != cnfpass ){
                    this.showpassmsg = true;
                }
                else{
                    this.showpassmsg = false;
                }
            }
            else{
                this.showpassmsg = false;
            }
        },

        changepass(){
            
            let fd = new FormData();
            fd.append('email_id',this.email_id);
            fd.append('password',this.$refs.npass.value);

            axios.post('user/resetpass',fd).then((result) => {
                this.alertmsg = result.data.message;
                this.alertshow = true;
                setTimeout(() => {
                    this.alertmsg = '';
                    this.alertshow = false;
                    this.$router.push('/dashboard/login');
                }, 2000);
            });
        }
    }
}
</script>