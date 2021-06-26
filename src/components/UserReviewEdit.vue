<template>

    <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<AdminDash />

		<div class=" right_sidebar_content">
			<div class="tabs-stage">
                <div class="expand_tabs">
                        
			        <router-link to="/admindashboard/userreview" class="btnBack site_btn btn_000 btncol"><i class="fas fa-arrow-left"></i>Back</router-link>
                    <div class="tab_title">
				        <div class="h2">Add User Review</div>
			    	</div>

                <div class="row mt-5 justify-content-center">
                    
                    <form @submit.prevent="reviewupdate()">

						<div class="form_field col-lg-10">
							<label class="" for="">User Name</label>
							<input id="username" v-model="getpagedata.user_name" ref="username" name="username" class="" value="" type="text" placeholder="Enter User Name" required="">
						</div>

                        <div class="form_field col-lg-10">
                            <label>User Review</label>
                            <textarea id="userreview" v-model="getpagedata.user_message" rows="4" name="userreview" ref="userreview" class="" value="" placeholder="Enter User Review" required=""></textarea>
                        </div>
                    	
						<button type="submit" class="form_btn btn_100 btn-left ">Save <i v-if="isloading" class="fas fa-spinner fa-pulse"></i></button>
					</form>

                    
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
    name:'UserReviewEdit',
    components:{
        AdminDash
    },
    data(){
        return{
            rid:this.$route.params.rid,
            isloading:false,
        }
    },
    computed:{
        getpagerequest(){
            return this.$store.getters.getuserreviewrequest;
        },
        getpagedata(){
            return this.$store.getters.getsinglereview(this.rid);
        }
    },

    methods:{
        reviewupdate(){
            this.isloading  = false;
            let fd = new FormData();
            fd.append('user_name',this.$refs.username.value);
            fd.append('user_message',this.$refs.userreview.value);
            fd.append('review_id',this.getpagedata.review_id);
            fd.append('isupdate',true);

            axios.post('user/addreview',fd).then((result)=>{
                this.$store.dispatch('setuserreviewdata');
                this.$swal.fire('Data Updated', result.data.message , 'success');
                this.isloading  = false;
                this.$router.push("/admindashboard/userreview");
            });
        }
    }


}
</script>