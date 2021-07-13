<template>

    <div class="container-fluid  full_section login_page">
		<div class="row ">
			
			<div class="col-xl-6 col-lg-12 p-0 full-height left_col">

				<!-- <img src="assets/img/login_img.png" width="962" height="881" alt="Digital Company Profile" title="Digital Company Profile" class="img-fit"> -->

			<picture class="d-block  h-100">
			  <source srcset="/src/assets/img/login_img_400.png" media="(max-width:767px)" type="image/png">
			  <source srcset="/src/assets/img/login_img_800.png" media="(max-width:1024px)" type="image/png">
			  <source srcset="/src/assets/img/login_img_1200.png" media="(min-width:1025px)" type="image/png">
			  <img data-src="/src/assets/img/login_img.png" loading="lazy"  width="962" height="881" alt="Digital Company Profile" title="Digital Company Profile" class="img-fit lazyload ">
		  </picture>
				<span class="hello_world">hello world</span>
			</div>
			
			<div class="col-xl-6 col-lg-12 full-height right_col p-0">

				<div class="form-center_main login_form text-justify">
					<h1 class="site_title">
						<span>Welcome to</span><br> Digital Company Profile
					</h1>
					<div class="form-heading">
						<div class="h2">Please Login to Continue</div>
					</div>

					<form @submit.prevent="userlogin()">
						<div class="form_field">
							<label class="" for="user_id">User ID</label>
							<input id="user_id" ref="email" name="email" class="" value="" type="Email" placeholder="Enter Email Id or Mobile Number" required="">
						</div>
						<div class="form_field">
							<label class="" for="password">Password</label>
							<input id="password" ref="password" name="password" class="" value="" type="password" placeholder="Enter 6 Digit Password" required="">
						</div>
						<div class="site_link_field">
						<router-link :to="'/forgetpassword'" class="forget_pass_link site_link">Forgot Password?</router-link>
						</div>
						<button type="submit" class="form_btn btn_100 btn-center ">Login</button>
					</form>

					<router-link :to="'/registration'" class="form_link">New User? Create An Account <i class="fas fa-angle-double-right"></i></router-link>

                    <div class="alert alert-danger mt-5" v-if="msgshow"><p>{{msg}}</p></div>

				</div>

			</div>
		</div>

</div> 
  
</template>

<script>
import axios from 'axios'
import Crypto from 'crypto-js';
export default {
    name:'Login',
    data(){
        return{
            msg:'',
            msgshow:false,
        }
    },

    created(){
        if(localStorage.getItem('userdataemail') != null || localStorage.getItem('useremail') != null || localStorage.getItem('usertype') != null){
            if(this.getusertype == 1){
                this.$router.push('/admindashboard/');
            }
            else if(this.getusertype == 2){
                this.$router.push('/dashboard/');
            }
            else{

            }
        }
        else{
            
        }
    },

    computed:{
        getuser(){
            return this.$store.getters.getuseremail;
        },
        getusertype(){
            return this.$store.getters.getusertype;
        },
    },

    methods:{
        
        userlogin(){

            let fd = new FormData();
            fd.append('email',this.$refs.email.value);
            fd.append('password',this.$refs.password.value);
            axios.post('user/loginuser',fd).then((result) => {
                // console.log(result);

                if(result.data.error == true){
                    this.msg = result.data.message;
                    this.msgshow = true;
                }
                else{
                    let userdata = result.data.userdata;
                    
                    

                    var encusertype = Crypto.AES.encrypt(userdata.type, "DIGITALCOMPANYPROFILE").toString()
                    localStorage.setItem('usertype',encusertype);
                    // localStorage.setItem('usertype',userdata.type);
                    this.$store.dispatch('setusertype',{user_type:userdata.type});
                    
                    localStorage.setItem('first_name',userdata.first_name);
                    this.$store.dispatch('setfirstname',{first_name:userdata.first_name});
                    
                    var encemail = Crypto.AES.encrypt(userdata.email_id, "DIGITALCOMPANYPROFILE").toString()
                    // localStorage.setItem('useremail',userdata.email_id);
                    localStorage.setItem('useremail',encemail);
                    this.$store.dispatch('setuseremail',{emailid:userdata.email_id});

                    if(userdata.type == 1){
                        // var encadminid = Crypto.AES.encrypt(userdata.user_id, "DIGITALCOMPANYPROFILE").toString()
                        // localStorage.setItem('admin_id',userdata.user_id);
                        // localStorage.setItem('admin_id',encadminid);
                        // this.$store.dispatch('setadminid',{admin_id:userdata.user_id});
                        this.$router.push('/admindashboard/');
                    }
                    else{
                    
                    // localStorage.setItem('userdataemail',userdata.email_id);
                    localStorage.setItem('userdataemail',encemail);
                    this.$store.dispatch('setuserdataemail',{userdataemail:userdata.email_id});

                    // localStorage.setItem('userid',userdata.user_id);
                    // this.$store.dispatch('setuserid',{userid:userdata.user_id});

                    this.$router.push('/dashboard/');
                    
                    }

                }
                
            });
        }
    }
}
</script>