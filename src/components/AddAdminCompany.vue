<template>
     <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<AdminDash />

		<div class=" right_sidebar_content">
			<div class="tabs-stage">
                <div class="expand_tabs">

			    <div class="tab_title">
				    <div class="h2">Company</div>
				    <div class="h4">Add User Data</div>
			    </div>
                
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                    <form @submit.prevent="userregister()">

                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form_field">
                                    <label>First Name *</label>
                                    <input id="name" name="first_name" ref="first_name" class="" value="" type="text" placeholder="Enter Your First Name" required="">
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="form_field">
                                    <label>Last Name *</label>
                                    <input id="name" name="last_name" ref="last_name" class="" value="" type="text" placeholder="Enter Your Last Name" required="">
                                </div>
                            </div>
                        </div>

						<div class="form_field">
							<label class="" for="email">Email *</label>
							<input id="email" ref="email_id" name="email" class="" value="" type="email" placeholder="Enter Your Email" required="">
						</div>
						<div class="form_field">
							<label class="" for="mobile">Mobile No. *</label>
							<input id="mobile" ref="contact_no" name="phone" class="" value="" type="text" placeholder="Enter Email id or Mobile Number" required="">
						</div>
						<div class="form_field">
							<label class="" for="password">Creact Your Password *</label>
							<input id="password" ref="password"  v-on:keyup="checkpassword()" name="password"  class="" value="" type="password" placeholder="Enter 6 Digit Password" required="">
						</div>
                        
                        <div class="form_field">
							<label class="" for="password">Confirm Your Password *</label>
							<input id="password" ref="cnfpassword"  v-on:keyup="checkpassword()" name="cnfpassword" class="" value="" type="password" placeholder="Enter 6 Digit Password" required="">
						</div>

                        <p class="text-danger" v-if="showpassmsg">* Password Not Matched</p>

						<button type="submit" class="form_btn btn_100 btn-center ">Save Details <i v-if="isloading" class="fas fa-spinner fa-pulse"></i></button>
                        
					</form>
                </div>
                </div>
                </div>

            </div>
        </div>
        </div>
    </div>
    </section>
</template>

<script>
import axios from 'axios'
import AdminDash from './AdminDash'
export default {
    name:'AddAdminCompany',
    data(){
        return{
            showpassmsg:false,
            isloading:false,
        }
    },

    components:{
        AdminDash
    },

    created(){
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

        userregister(){
            this.isloading = true;
            let fd = new FormData();
            fd.append('first_name',this.$refs.first_name.value);
            fd.append('last_name',this.$refs.last_name.value);
            fd.append('email_id',this.$refs.email_id.value);
            fd.append('password',this.$refs.password.value);
            fd.append('contact_no',this.$refs.contact_no.value);
            fd.append('status',1);
            fd.append('isupdate',false);

            axios.post('user/registeruseradmin',fd).then((result) => {
                let userdata = result.data.userid;

                // localStorage.setItem('userid',userdata.user_id);
                // this.$store.dispatch('setuserid',{userid:userdata.user_id});

                localStorage.setItem('userdataemail',userdata.email_id);
                this.$store.dispatch('setuserdataemail',{userdataemail:userdata.email_id});
                
                this.$router.push('/dashboard/company');
            });
        }
    }

}
</script>