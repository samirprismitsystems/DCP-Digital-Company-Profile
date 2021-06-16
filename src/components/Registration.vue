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

			 	<div class="form-center_main  new_account_form text-justify">
					<div class="form-heading">
					<div class="h2 mt-2">Create An Account</div>
					<p class="text">Create an account with your email id and password </p> <br> to create your<strong > Digital Business Card</strong>
					</div>
					<form @submit.prevent="userregister()">

						<!-- <div class="form_field">
							<label class="" for="name">Full Name</label>
							<input id="name" name="user_id" class="" value="" type="text" placeholder="Enter Your Full Name" required="">
						</div> -->
                        <!-- <div class="form-group">
                                <label>Profile Pic</label>
                                <img class="ml-3" @click="openbox" :src="imgsrc" height="100" width="100">
                                <input id="imgchange" v-show="false" type="file" @change="changepic($event)">
                            </div> -->

                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form_field">
                                    <label>First Name</label>
                                    <input id="name" name="first_name" ref="first_name" class="" value="" type="text" placeholder="Enter Your First Name" required="">
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="form_field">
                                    <label>Last Name</label>
                                    <input id="name" name="last_name" ref="last_name" class="" value="" type="text" placeholder="Enter Your Last Name" required="">
                                </div>
                            </div>
                        </div>

                        <!-- <div class="form_field">
							<label class="" for="name">Full Name</label>
							<input id="name" name="first_name" ref="first_name" class="" value="" type="text" placeholder="Enter Your Full Name" required="">
						</div> -->

						<div class="form_field">
							<label class="" for="email">Email</label>
							<input id="email" ref="email_id" name="email" class="" value="" type="email" placeholder="Enter Your Email" required="">
						</div>
						<div class="form_field">
							<label class="" for="mobile">Mobile No.*</label>
							<input id="mobile" ref="contact_no" name="phone" class="" value="" type="text" placeholder="Enter Email id or Mobile Number" required="">
						</div>
						<div class="form_field">
							<label class="" for="password">Creact Your Password*</label>
							<input id="password" ref="password"  v-on:keyup="checkpassword()" name="password"  class="" value="" type="password" placeholder="Enter 6 Digit Password" required="">
						</div>
                        
                        <div class="form_field">
							<label class="" for="password">Confirm Your Password*</label>
							<input id="password" ref="cnfpassword"  v-on:keyup="checkpassword()" name="cnfpassword" class="" value="" type="password" placeholder="Enter 6 Digit Password" required="">
						</div>

                        <p class="text-danger" v-if="showpassmsg">* Password Not Matched</p>
						
						<button type="submit" class="form_btn btn_100 btn-center ">Sign Up</button>
					</form>

                     <div class="alert alert-success mt-2" v-if="showmsg">{{msg}}</div>

					<div class="form_link_group">
						<router-link :to="'/login'" class="form_link  go_back mb-4"> <i class="fas fa-angle-double-left"></i>Go Back to Login</router-link>
					</div>

				</div> 

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
            showpassmsg:false,
            msg:'',
            showmsg:false
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

        checkpassword(){
            let pass = this.$refs.password.value;
            let cnfpass = this.$refs.cnfpassword.value;
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

                this.msg = result.data.message;
                this.showmsg = true;

                setTimeout(() => {
                    this.msg = '';
                    this.showmsg = false;
                }, 5000);

                // console.log(result.data);
                // let userdata = result.data.userdata;

                // let userdata = result.data.userdata;

                // localStorage.setItem('useremail',userdata.email_id);
                // localStorage.setItem('userid',userdata.user_id);
                // localStorage.setItem('first_name',userdata.first_name);
                // localStorage.setItem('companyid',userdata.company_id);

                // this.$store.dispatch('setuseremail',{emailid:userdata.email_id});
                // this.$store.dispatch('setuserid',{userid:userdata.user_id});
                // this.$store.dispatch('setfirstname',{first_name:userdata.first_name});
                // this.$store.dispatch('setcompanyid',{companyid:userdata.company_id});

                // this.$router.push('/dashboard/');

            });
        }
    }
}
</script>