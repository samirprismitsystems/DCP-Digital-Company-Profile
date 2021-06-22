<template>

    <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

            
        <AdminDash  v-if="getusertype == 1" />
      	<DashData v-if="getusertype == 2" />

		<div class=" right_sidebar_content" v-if="getpagerequest == 1">
			<div class="tabs-stage">
                
                <div class="tab_title">
				        <div class="h2">Profile</div>
				        <div class="h4">Change Profile Details</div>
			    	</div>
                
                <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-lg-8">

                <form class="text-justify" @submit.prevent="saveprofile()">
                        
                        <!-- <div class="form-group">
                            <label>Profile Pic</label>
                            <img class="ml-3" @click="openbox" :src="imgsrc" height="100" width="100">
                            <input id="imgchange" v-show="false" type="file" @change="changepic($event)">
                        </div> -->
                        

                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form_field">
                                    <label>First Name</label>
                                    <input id="name" v-model="getdata.first_name"  ref="first_name" name="firstname" class="" value="" type="text" placeholder="Enter Your First Name" required="">
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="form_field">
                                    <label>Last Name</label>
                                    <input id="name" v-model="getdata.last_name" ref="last_name" name="lastname" class="" value="" type="text" placeholder="Enter Your Last Name" required="">
                                </div>
                            </div>
                        </div>

						<div class="form_field">
							<label class="" for="email">Email</label>
							<input id="email" v-model="getdata.email_id" ref="email_id" name="email" class="" value="" type="email" placeholder="Enter Your Email" required="">
						</div>
						<div class="form_field">
							<label class="" for="mobile">Mobile No.*</label>
							<input id="mobile" v-model="getdata.contact_no" ref="contact_no" name="phone" class="" value="" type="text" placeholder="Enter Email id or Mobile Number" required="">
						</div>
						
						<button type="submit" class="form_btn btn_100 btn-center ">Save</button>
                        
                    </form>

                    <router-link :to="'/dashboard/changepassword'" class="form_link">Change Password <i class="fas fa-angle-double-right"></i></router-link>

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
    name:'Profile',
    data(){
        return{
            changeprofile:false,
            profilepic:'',
            imgsrc:this.$imgpath+'profile_pic.png',
            alertmsg:'',
            alertshow:false,
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
            this.$store.dispatch('setuserdata',{userid: this.getuseremail });
        }
        else{
            this.$store.dispatch('setuserdata',{userid: this.getuserdataemail });
        }
        
    },

    computed:{

        getuseremail(){
            return this.$store.getters.getuseremail;
        },

        getuserdataemail(){
            return this.$store.getters.getuserdataemail;
        },
        
        getuserid(){
          return this.$store.getters.getuserid;
        },

        getpagerequest(){
            return this.$store.getters.getuserreq;
        },

        getdata(){
            let data =  this.$store.getters.getuserdata;
            if(data.profile_photo != '' && data.profile_photo != null){
                this.imgsrc = this.$imgpath+'users/'+data.profile_photo;
            }
            return data;
        },

        getusertype(){
            return this.$store.getters.getusertype;
        },
        getadminid(){
            return this.$store.getters.getadminid;
        },
    },

    methods:{

        openbox(){
            document.getElementById('imgchange').click();
        },

        changepic(event){
            this.profilepic = event.target.files[0];
            this.imgsrc = URL.createObjectURL(this.profilepic);
            this.changeprofile = true;
        },

        saveprofile(){
            let fd = new FormData();
            fd.append('user_id',this.getdata.user_id);
            fd.append('first_name',this.$refs.first_name.value);
            fd.append('last_name',this.$refs.last_name.value);
            fd.append('email_id',this.$refs.email_id.value);
            fd.append('contact_no',this.$refs.contact_no.value);
            if(this.changeprofile == true){
                fd.append('profile_photo',this.profilepic);
            }
            else{
                fd.append('profile_photo',this.getdata.profile_photo);
            }
            
            fd.append('isupdate',true);

            axios.post('user/registeruser',fd).then((result) => {
                this.alertmsg = result.data.message;
                this.alertshow = true;
                this.$store.dispatch('setfirstname',{ first_name: this.$refs.first_name.value });
                setTimeout(() => {
                    this.alertmsg = '';
                    this.alertshow = false;
                }, 2000);
            });
        }
    }
}
</script>