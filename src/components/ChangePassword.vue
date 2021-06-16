<template>

    <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<AdminDash  v-if="getusertype == 1" />
      	<DashData v-if="getusertype == 2" />

		<div class=" right_sidebar_content" v-if="getpagerequest == 1">
			<div class="tabs-stage">
                
                <div class="tab_title">
				        <div class="h2">Change Password</div>
			    	</div>

                    <div class="container mt-5">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">

                        <form class="text-justify" @submit.prevent="changepass()">
                            
                           <div class="form_field">
                                <label class="" for="email">Email</label>
                                <input id="email" v-model="getdata.email_id" ref="email_id" name="email" class="" value="" type="email" placeholder="Enter Your Email" required="">
						    </div>

                            <div class="form_field">
                                <label class="" for="cpass">Currunt Password</label>
                                <input id="" ref="cpass" name="cpass" placeholder="Current Password" class="" value="" type="password" required="">
						    </div>

                            <div class="form_field">
                                <label>New Password</label>
                                <input type="password" v-on:keyup="checkpassword()" ref="npass" name="npass" placeholder="New Password">
						    </div>

                            <div class="form_field">
                                <label>Confirm Password</label>
                                <input type="password" v-on:keyup="checkpassword()" ref="cnpass" name="cnpass" placeholder="Confirm Password">
						    </div>

                            <p class="text-danger" v-if="showpassmsg">* Password Not Matched</p>

                            <button type="submit" class="form_btn btn_100 btn-center ">Update</button>
                        </form>

                        <router-link :to="'/dashboard/profile'" class="form_link"> &laquo; Back to profile</router-link>
                        
                        <div class="alert alert-success mt-4" v-if="alertshow">{{alertmsg}}</div>

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
import DashData from './DashData.vue'
import AdminDash from './AdminDash.vue'
export default {
    name:'ChangePassword',
    data(){
        return{
            alertmsg:'',
            alertshow:false,
            showpassmsg:false,
            usertype:0
        }
    },

    components:{
        DashData,
        AdminDash
    },

    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        if(this.getusertype == 1){
            this.$store.dispatch('setuserdata',{userid: this.getadminid });
        }
        else{
            this.$store.dispatch('setuserdata',{userid: this.getuserid });
        }
    },

    computed:{
        getpageinfo(){
          return this.$store.getters.getsitetitle;
        },
        getuserid(){
          return this.$store.getters.getuserid;
        },
        getpagerequest(){
            return this.$store.getters.getuserreq;
        },
        getdata(){
            return this.$store.getters.getuserdata;
        },
        getusertype(){
            return this.$store.getters.getusertype;
        },
        getadminid(){
            return this.$store.getters.getadminid;
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