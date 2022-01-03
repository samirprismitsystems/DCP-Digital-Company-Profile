<template>

<section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<DashData />

		<div class=" right_sidebar_content" v-if="getpagerequest == 1 && getcompanyid != ''">
			<div class="tabs-stage">

			    <div class="expand_tabs">
			    <router-link to="/dashboard/company" type="button" class="btnBack site_btn btn_000 btncol"><i class="fas fa-arrow-left"></i>Back</router-link>
			      <div class="tab_title">
				        <div class="h2">Add social media links</div>
				        <div class="h4">Please fill up the your social media links</div>
			    	</div>

			    	<form id="" @submit.prevent="savesocialdata()" class="social_media_form form_shadow">
						
						<div class=" form_field" v-for="(social,index) in getallsocialdata" :key="index">
							<label class="label_icon"><i :class="social.socialmedia_logo"></i>{{social.socialmedia_name}}</label>
							<input v-if="index < socialdata.length" name="" class="" v-model="socialdata[index].link"  type="text" :placeholder="'Add '+social.socialmedia_name" >
							<input v-else name="" class="" v-model="newsocial[index - socialdata.length].link"  type="text" :placeholder="'Add '+social.socialmedia_name" >
						</div>

						<div class="form_btn_field">
							<button type="submit" class=" form_btn btn_200  ">Save Changes  <i v-if="isloading" class="fas fa-spinner fa-pulse"></i> </button>
							<router-link to="/dashboard/product"  class=" btnNext form_btn btn_100 btncol ">Next</router-link>
						</div>

			    	</form>
			</div>

		
		</div>


        </div>
</div>
	</div> 
</section>

    
</template>

<script>
import axios from 'axios'
import DashData from './DashData'
export default {
    name:'SocialLinks',
	components:{
		DashData
	},
	data(){
		return{
			socialdata:[],
			newsocial:[],
			isupdate:false,
			isloading:false,
		}
	},

	computed:{
		getuserdataemail(){
            return this.$store.getters.getuserdataemail;
        },

		getuserid(){
            return this.$store.getters.getuserid;
        },
		getcompanyid(){
          	let cid = this.$store.getters.getcompanyid;
			// console.log(cid);
			return cid;
		},

		getcompanydata(){
			let data =  this.$store.getters.getcompanydata;
            if(data.length != 0){
				// console.log(data.social);
                if(data.social.length != 0){
					this.isupdate = true;
				}
			}
			return data;
		},
        
		getpagerequest(){
          return this.$store.getters.getcompanypagerequest;
        },
		

		getallsocialdata(){
			this.socialdata = [];
			this.newsocial = [];

			let allsocial =  this.$store.getters.getallsocialdata;
			let data = this.getsocialdata;
			
			if(allsocial.length != 0){
				let index = 0;
				allsocial.forEach( element => {
				index++;
				if(index > data.length){
					// console.log(index + ' ' + data.length);
					this.newsocial.push(element);
				}
			});
			this.newsocial = [ ...new Set(this.newsocial) ];
			}
			return allsocial;
		},

		getsocialdata(){
			// let companydata = this.getcompanydata;
          	let data =  this.$store.getters.getsocialdata;
			if(data.length != 0 && this.getcompanyid != ''){
				if(data != null){
					// this.isupdate = true;
					let i = 0;
					data.forEach(element => {
						this.socialdata.push(element);
					});
				}
			}
			return data;
		},

	},

	created(){
		this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
		if(this.getpagerequest == 0){
            this.$store.dispatch('setcompanydata',{id: this.getuserdataemail});
            this.$store.dispatch('setallsocialdata');
            this.$store.dispatch('setsocialdata',{id: this.getuserdataemail});
            this.$store.dispatch('setproductdata',{id: this.getuserdataemail });
            this.$store.dispatch('setservicedata',{id: this.getuserdataemail });
            this.$store.dispatch('setClientData',{id: this.getuserdataemail } );
            this.$store.dispatch('setportfolioData',{id: this.getuserdataemail });
            this.$store.dispatch('settestimonialData',{id: this.getuserdataemail } );
            this.$store.dispatch('setinquiryData',{id: this.getuserdataemail } );
            this.$store.dispatch('setpaymentoptions',{id:this.getuserdataemail});
		}
		if(this.getcompanyid == '' ){
            this.$router.push('/dashboard/company');
        }
	},

	methods:{
		async savesocialdata(){
			this.isloading  = true;

			let fd = new FormData();
			
			fd.append('socialdata',JSON.stringify(this.socialdata));
			fd.append('user_id',this.getuserdataemail);
			fd.append('isupdate',true);

			if(this.socialdata != null && this.socialdata != ''){
				await axios.post('company/savesocial',fd).then((result)=>{
				});
			}

			if(this.newsocial.length != 0 ){
				this.newsocial = [ ...new Set(this.newsocial) ];
				console.log(this.newsocial);
				let fd1 = new FormData();
					fd1.append('socialdata',JSON.stringify(this.newsocial));
					fd1.append('user_id',this.getuserdataemail);
					fd1.append('isupdate',false);
					await axios.post('company/savesocial',fd1).then((result)=>{
						this.$store.dispatch('setsocialdata',{id: this.getuserdataemail});
						this.$swal.fire('Social Data', result.data.message , 'success');
						this.isloading  = false;
					});
			}
			else{
				this.$swal.fire('Social Data', 'Social Data Updated' , 'success');
				this.$store.dispatch('setsocialdata',{id: this.getuserdataemail});
				this.isloading  = false;
			}


		}
	}

}
</script>


<style scoped>
    .btncol{
        color: white;
    }
</style>