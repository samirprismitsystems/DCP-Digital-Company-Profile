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

				<div class="form-center_main  forgot_password_form text-justify">
					<div class="form-heading">
					<div class="h2 ">Forgot Password?</div>
					<p class="text">Mention Email id, you will receive an email with password.</p>
					</div>
					<form  @submit.prevent="sendforgetpassword()">
						<div class="form_field">
							<label class="" for="user_id">User ID</label>
							<input id="email" ref="email" name="email" class="" value="" type="Email" placeholder="Enter Email Id or Mobile Number" required="">
						</div>
						
						<button type="submit" class="form_btn btn_100 btn-center ">Send Password</button>
					</form>
					<div class="form_link_group">
						<router-link :to="'/login'" class="form_link  go_back"> <i class="fas fa-angle-double-left"></i>Go Back to Login</router-link>
						<router-link :to="'/registration'" class="form_link ">New User? Create An Account <i class="fas fa-angle-double-right"></i></router-link>
					</div>
				</div> 

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