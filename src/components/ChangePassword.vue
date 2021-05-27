<template>

<div class="container mt-5">
   <div class="row justify-content-center">
    <div class="col-lg-6">

        <h3 class="mb-4">Change Password</h3>

    <form class="text-justify" @submit.prevent="changepass()">
        
        <div class="form-group">
            <label>Email address</label>
            <input type="email" class="form-control" v-model="getdata.email_id" ref="email_id" name="email" placeholder="Email Address">
        </div>

        <div class="form-group">
            <label>Currunt Password</label>
            <input type="password" class="form-control" ref="cpass" name="cpass" placeholder="Current Password">
        </div>

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

    <router-link :to="'/dashboard/profile'" class="btn btn-success mt-3 float-left"> &laquo; Back to profile</router-link>
    
    <div class="alert alert-success mt-4" v-if="alertshow">{{alertmsg}}</div>

    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios'
export default {
    name:'ChangePassword',
    data(){
        return{
            alertmsg:'',
            alertshow:false,
            showpassmsg:false
        }
    },

    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        this.$store.dispatch('setuserdata',{userid: this.getuserid });
    },

    computed:{
        getpageinfo(){
          return this.$store.getters.getsitetitle;
        },
        getuserid(){
          return this.$store.getters.getuserid;
        },
        getdata(){
            return this.$store.getters.getuserdata;
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
            fd.append('email_id',this.$refs.email_id.value);
            fd.append('cpass',this.$refs.cpass.value);
            fd.append('npass',this.$refs.npass.value);

            axios.post('user/changepassword',fd).then((result) => {
                this.alertmsg = result.data.message;
                this.alertshow = true;
                setTimeout(() => {
                    this.alertmsg = '';
                    this.alertshow = false;
                }, 2000);
            });
        }
    }
}
</script>