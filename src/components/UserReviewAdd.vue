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

                    <form @submit.prevent="reviewadd()">

						<div class="form_field col-lg-10">
							<label class="" for="">User Name</label>
							<input id="username" ref="username" name="username" class="" value="" type="text" placeholder="Enter User Name" required="">
						</div>

                        <div class="form_field col-lg-10">
                            <label>User Review</label>
                            <textarea id="userreview" rows="4" name="userreview" ref="userreview" class="" value="" placeholder="Enter User Review" required=""></textarea>
                        </div>
                    	
						<button type="submit" class="form_btn btn_100 btn-left ">Save</button>
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
    name:'UserReviewAdd',
    components:{
        AdminDash
    },

    methods:{
        reviewadd(){
            let fd = new FormData();
            fd.append('user_name',this.$refs.username.value);
            fd.append('user_message',this.$refs.userreview.value);
            fd.append('isupdate',false);
            
            axios.post('user/addreview',fd).then((result)=>{
                this.$store.dispatch('setuserreviewdata');
                this.$swal.fire('Data Saved', result.data.message , 'success');
                this.$router.push("/admindashboard/userreview");
            });

        }
    }

}
</script>