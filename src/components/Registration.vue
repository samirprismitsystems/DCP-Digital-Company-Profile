<template>

<div class="container mt-5">
   <div class="row justify-content-center">
    <div class="col-lg-6">
    <h3>Digital Company Profile</h3>
   <form class="text-justify" @submit.prevent="userregister()">
        
        <div class="form-group">
            <label>Profile Pic</label>
            <img class="ml-3" @click="openbox" :src="imgsrc" height="100" width="100">
            <input id="imgchange" v-show="false" type="file" @change="changepic($event)">
        </div>

        <div class="row">
            <div class="col-lg-6">
                <div class="form-group">
                <label>First Name</label>
                <input type="text" class="form-control" ref="first_name" name="firstname" placeholder="First Name">
        </div>
            </div>

            <div class="col-lg-6">
                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control" ref="last_name" name="lastname" placeholder="Last Name">
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" ref="email_id" name="email" placeholder="Email Address">
        </div>

        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" ref="password" name="password" id="exampleInputPassword1" placeholder="Password">
        </div>

        <div class="form-group">
            <label>Contact Number</label>
            <input type="text" class="form-control" ref="contact_no" name="phone" placeholder="Contact Number">
        </div>


        <button type="submit" class="btn btn-primary">Register</button>
    </form>
    
    <router-link class="mt-4 mb-4 float-left" :to="'/dashboard/login'">Already have an Account? Please Login.</router-link>

    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios'
export default {
    name:'Registration',
    data(){
        return{
            profilepic:'',
            imgsrc:this.$imgpath+'profile_pic.png',
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

        openbox(){
            document.getElementById('imgchange').click();
        },

        changepic(event){
            this.profilepic = event.target.files[0];
            this.imgsrc = URL.createObjectURL(this.profilepic);
            // console.log(this.imgsrc);
        },

        userregister(){

            let fd = new FormData();
            fd.append('first_name',this.$refs.first_name.value);
            fd.append('last_name',this.$refs.last_name.value);
            fd.append('email_id',this.$refs.email_id.value);
            fd.append('password',this.$refs.password.value);
            fd.append('contact_no',this.$refs.contact_no.value);
            fd.append('profile_photo',this.profilepic);
            fd.append('isupdate',false);

            axios.post('user/registeruser',fd).then((result) => {
                // console.log(result.data);
                // let userdata = result.data.userdata;

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