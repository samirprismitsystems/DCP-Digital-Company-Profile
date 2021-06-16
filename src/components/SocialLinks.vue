<template>

<section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<DashData />

		<div class=" right_sidebar_content" v-if="getpagerequest == 1 && getcompanyid != ''">
			<div class="tabs-stage">

			    <div class="expand_tabs">
			    	<button type="button" class="btnBack  site_btn btn_000"><i class="fas fa-arrow-left"></i>Back</button>
			      <div class="tab_title">
				        <div class="h2">Add social media links</div>
				        <div class="h4">Please fill up the your social media links</div>
			    	</div>

			    	<form id="" @submit.prevent="savesocialdata()" class="social_media_form form_shadow">
						
						<div class=" form_field" v-for="(social,index) in getallsocialdata" :key="index">
							<label class="label_icon"><i :class="social.socialmedia_logo"></i>{{social.socialmedia_name}}</label>
							<input v-if="index < socialdata.length" name="" class="" v-model="socialdata[index].link"  type="text" :placeholder="'Add '+social.socialmedia_name" >
							<input v-else name="" class="" v-model="newsocial[index - socialdata.length].link"  type="text" :placeholder="'Add '+social.socialmedia_name" >
							<!-- {{index - socialdata.length}} -->
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
			newsocial:[],
			msg:'',
			msgshow:false,
			isupdate:false
		}
	},

	computed:{
		

		getuserid(){
            return this.$store.getters.getuserid;
        },
		getcompanyid(){
          return this.$store.getters.getcompanyid;
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
			if(allsocial.length != 0 && data.length != 0){
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
		if(this.getcompanyid == ''){
            this.$router.push('/dashboard/company');
        }
		this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
		if(this.getpagerequest == 0){
            this.$store.dispatch('setcompanydata',{id: this.getuserid});
			this.$store.dispatch('setallsocialdata');
            this.$store.dispatch('setsocialdata',{id: this.getuserid});
            this.$store.dispatch('setcitiesdata');
            this.$store.dispatch('setproductdata',{id: this.getuserid });
            this.$store.dispatch('setservicedata',{id: this.getuserid });
            this.$store.dispatch('setClientData',{id: this.getuserid } );
            this.$store.dispatch('setportfolioData',{id: this.getuserid });
            this.$store.dispatch('settestimonialData',{id: this.getuserid } );
            this.$store.dispatch('setinquiryData',{id: this.getuserid } );
            this.$store.dispatch('setpaymentoptions',{id:this.getuserid});
        }
	},

	methods:{
		async savesocialdata(){
			
			let fd = new FormData();
			
			fd.append('socialdata',JSON.stringify(this.socialdata));
			fd.append('user_id',this.getuserid);
			fd.append('isupdate',true);
			await axios.post('company/savesocial',fd).then((result)=>{
				// this.msgshow = true;
				// this.msg = result.data.message;
				// this.$store.dispatch('setsocialdata',{id: this.getuserid});
				// setTimeout(() => {
				// 	this.msgshow = false;
				// 	this.msg = '';
				// }, 3000);

				// this.$swal.fire('Data Updated', result.data.message, 'success');

			});

			if(this.newsocial.length != 0 ){
				this.newsocial = [ ...new Set(this.newsocial) ];
				// console.log(this.newsocial);

				let fd1 = new FormData();
				console.log(this.newsocial);
				fd1.append('socialdata',JSON.stringify(this.newsocial));
				fd1.append('user_id',this.getuserid);
				fd1.append('isupdate',false);
				await axios.post('company/savesocial',fd1).then((result)=>{
				this.msgshow = true;
				this.msg = result.data.message;
				this.$store.dispatch('setsocialdata',{id: this.getuserid});
				setTimeout(() => {
					this.msgshow = false;
					this.msg = '';
				}, 3000);
			});
			}


		}
	}

}
</script>