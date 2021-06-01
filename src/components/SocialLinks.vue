<template>

<section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<DashData />

		<div class=" right_sidebar_content" v-if="getpagerequest == 1">
			<div class="tabs-stage">

			    <div class="expand_tabs">
			    	<button type="button" class="btnBack  site_btn btn_000"><i class="fas fa-arrow-left"></i>Back</button>
			      <div class="tab_title">
				        <div class="h2">Add social media links</div>
				        <div class="h4">Please fill up the your social media links</div>
			    	</div>

			    	<form id="" @submit.prevent="savesocialdata()" class="social_media_form form_shadow">
						
						<div class=" form_field" v-for="(social,index) in getsocialdata" :key="index">
							<label class="label_icon"><i :class="social.socialmedia_logo"></i>{{social.socialmedia_name}}</label>
							<input name="" class="" v-model="socialdata[index].link"  type="text" :placeholder="'Add '+social.socialmedia_name" >
							<!-- :ref="social.socialmedia_name" :value="social.link" -->
						</div>
						
						<div class="form_btn_field">
							<button type="submit" class=" form_btn btn_200  ">Save Changes</button>
							<button type="button" class=" btnNext form_btn btn_100  ">Next</button>
						</div>
			    	</form>
			</div>

			<!-- {{isupdate}} -->

			<div class="alert alert-info" v-if="msgshow">{{msg}}</div>

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
			msg:'',
			msgshow:false,
			isupdate:false
		}
	},

	computed:{
		getuserid(){
            return this.$store.getters.getuserid;
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

		getsocialdata(){
			let companydata = this.getcompanydata;

          	let data =  this.$store.getters.getsocialdata;
			if(data.length != 0 ){
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
            this.$store.dispatch('setcompanydata',{id: this.getuserid});
			this.$store.dispatch('setsocialdata',{id: this.getuserid});
			this.$store.dispatch('setcitiesdata');
            this.$store.dispatch('setproductdata',{id: this.getuserid });
            this.$store.dispatch('setservicedata',{id: this.getuserid });
            this.$store.dispatch('setClientData',{id: this.getuserid } );
            this.$store.dispatch('setportfolioData',{id: this.getuserid });
            this.$store.dispatch('settestimonialData',{id: this.getuserid } );
            this.$store.dispatch('setinquiryData',{id: this.getuserid } );
        }
	},

	methods:{
		savesocialdata(){
			let fd = new FormData();

			console.log(this.socialdata);
			
			fd.append('socialdata',JSON.stringify(this.socialdata));
			fd.append('user_id',this.getuserid);
			fd.append('isupdate',this.isupdate);

			axios.post('company/savesocial',fd).then((result)=>{
				// console.log(result);
				this.msgshow = true;
				this.msg = result.data.message;

				setTimeout(() => {
					this.msgshow = false;
					this.msg = '';
				}, 3000);
			});


		}
	}

}
</script>