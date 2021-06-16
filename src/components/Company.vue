<template> 

<section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<DashData />

		<div class=" right_sidebar_content" v-if="getpagerequest == 1">
			<div class="tabs-stage">
 
            <div class="expand_tabs text-justify">
			    	<div class="tab_title">
				        <div class="h2"> Make Your Business Profile</div>
				        <div class="h4">Please fill up the detail to create your profile</div>
			    	</div>
			    	<form id="" @submit.prevent="addcompanydata()" class="digital_profile_form form_shadow">
			    		<div class="row">
			    			<div class="col-xl-9  col-lg-8 col-md-7  col-sm-12 form-col">
				    			<div class="form_field">
									<label class="" >Full Name / Business Name / Company Name*</label>
									<input name="cname" ref="cname" class="" v-model="getpagedata.company[0].company_name" type="text" placeholder="Enter Your Full Name / Business Name /Company Name" >
								</div>
								<div class="form_field">
									<label class="" >Business Type / Description*</label>
									<input name="bsegment" ref="bsegment" class="" v-model="getpagedata.company[0].business_segment" type="text" placeholder="Business Type / Description" >
								</div>
								<div class="row ">
									<div class="col-sm-6 col-12">
									<div class=" form_field">
										<label class="" >Phone No. (WhatsApp No)</label>
										<input name="cnumber" ref="cnumber" class="" v-model="getpagedata.company[0].company_contact" type="text" placeholder="Enter Your WhatsApp No" >
									</div>
									</div>
									<div class="col-sm-6 col-12">
									<div class=" form_field">
										<label class="" >Alternet Phone No. (Optional)</label>
										<input name="canumber" ref="canumber" class="" v-model="getpagedata.company[0].company_alternate_contact" type="text" placeholder="Enter Your Alternet Phone No" >
									</div>
									</div>
									
								</div>
								<div class="form_field">
									<label class="" >Email Id*</label>
									<input name="cemail" ref="cemail" class="" v-model="getpagedata.company[0].company_email" type="email" placeholder="Enter Your Emial" >
								</div>
			    			</div>
			    			
			    			<div class="col-xl-3 col-lg-4 col-md-5 col-sm-5 col-10 logo-col private_img_col">
			    				<div class="upload_private_img_box logo_img_box">
			    					<div v-if="imgsrc == ''" class="upload_here">
			    						<img id="get_img" class="upload_img" src="" alt="image" style="display: none;" />
			    						<div class="placeholder_tex">
			    							<h3>Please Upload Here Your Company</h3>
			    							<h2>LOGO</h2>
			    						</div>
			    					</div>

                                    <div v-else class="upload_here">
			    						<img id="get_img" class="upload_img" :src="imgsrc" alt="image" />
			    					</div>

			    					<p class="red" >Image Required* 250KB max size</p>
			    					<div class="upload_btn btn_100 site_btn mb-0 w-100">
			    						<input type='file' @change="changepic" class="choose" />
			    					Upload logo file
			    					</div>
			    				</div>
							</div>

			    		</div>
			    		<div class=" form_field">
							<label class="" >Address</label>
							<input name="Address" ref="address" class="" v-model="getpagedata.company[0].address" type="text" placeholder="Enter Your Full Address" >
						</div>
						<div class=" form_field">
							<label class="" >Company Est Date</label>
							<input name="esdate" ref="esdate" class="" v-model="getpagedata.company[0].established_in" type="text" placeholder="When your comp. was started?" >
						</div>
						<div class=" form_field">
							<label class="" >Working Hours</label>
							<div class="select_working_hours m-0">
								<div class="days_select"><span>Day</span> 
                                    <select  placeholder="select working days" v-model="workingdays">
										<option value="all" selected="">All</option>
										<option value="mtf">Mon to Fri</option>
										<option value="mts">Mon to Sat</option>
									</select>
								</div>
								<div class="time_select"><input type="time" ref="fromtime" v-model="getpagedata.company[0].working_hours_from"  placeholder=""></div>
								<span>TO</span>
								<div class="time_select"><input type="time" ref="totime" v-model="getpagedata.company[0].working_hours_to" placeholder=""></div>
							</div>
						</div>
						<div class="form_field">
							<label class="" >About Company</label>
							<textarea name="cdesc"  rows="8" ref="cdesc" v-model="getpagedata.company[0].company_desc" placeholder="Add Business / Company Description"> </textarea> 
						</div>
						<div class="form_btn_field">
							<button type="submit" class="form_btn btn_200  ">Save Changes</button>
							<router-link :to="'/dashboard/sociallinks'" tag="button" :disabled="isnext" type="button" class="btnNext  form_btn btn_100  ">Next</router-link>
						</div>
			    	</form>

                    <div class="alert alert-info" v-if="showalert">{{alertmsg}}</div>

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
    name:'AddCompany',
    components:{
       DashData
    },
    data(){
        return{
            workingdays:'',
            isnext:true,
            path:'',
            cities:[],
            allindia:false,
            social:[],
            showalert:false,
            alertmsg:'',
            ischangepic:false,
            imgsrc:require('../assets/img/logo.jpg'),
            isupdate:false,
            company_id:null,
            logo:'',

            companydata:{
                logo:null,
                socialnames:[],
                sociallinks:[],
                cities:[],
            },
            
        }
    },

    computed:{
        getuserid(){
            return this.$store.getters.getuserid;
        },
        getpagerequest(){
          return this.$store.getters.getcompanypagerequest;
        },

        getcompanyid(){
          return this.$store.getters.getcompanyid;
        },

        // getsocialdata(){
        //   return this.$store.getters.getsocialdata;
        // },

        // getcitiesdata(){
        //   return this.$store.getters.getcitydata;
        // },

        getpagedata(){
            let data =  this.$store.getters.getcompanydata;
            if(data.length != 0){
                if(data.company[0] != null && this.getcompanyid != ''){
                    console.log('incompany');
                this.isupdate = true;
                this.company_id = data.company[0].company_id;
                this.logo = data.company[0].company_logo;
                // console.log(data.company[0].company_logo);
                this.path = this.$imgpath+data.company[0].company_id+'/logo/'+data.company[0].company_logo;
                this.imgsrc = this.path;
                this.workingdays = data.company[0].working_hours_day;
                this.isnext = false;

                }
                else{
                    if(data.newuser == 1){
                        data.company[0] = {
                        };
                    }
                }
            }
            return data;
        },

    },

    created(){
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

        openbox(){
            document.getElementById('imgchange').click();
        },

        changepic(event){
            this.companydata.logo = event.target.files[0];
            this.imgsrc = URL.createObjectURL(this.companydata.logo);
            this.ischangepic = true;
        },

        addcompanydata(){
            
            let fd = new FormData();
            fd.append('user_id',this.getuserid);
            // fd.append('company_id',0);
            fd.append('company_name',this.$refs.cname.value);
            fd.append('company_desc',this.$refs.cdesc.value);
            fd.append('established_in',this.$refs.esdate.value);
            fd.append('business_segment',this.$refs.bsegment.value);
            fd.append('address',this.$refs.address.value);
            fd.append('company_email',this.$refs.cemail.value);
            fd.append('company_contact',this.$refs.cnumber.value);
            fd.append('company_alternate_contact',this.$refs.canumber.value);
            fd.append('working_hours_day',this.workingdays);
            fd.append('working_hours_from',this.$refs.fromtime.value);
            fd.append('working_hours_to',this.$refs.totime.value);
            fd.append('isupdate',false);

            if(this.ischangepic == true){
               fd.append('company_logo',this.companydata.logo);
               this.ischangepic = false;
            }

            if(this.isupdate == true){
                fd.append('company_id',this.company_id);
                fd.append('logo',this.logo);
                fd.append('isupdate',true);
            }

            axios.post('company/createcompany',fd).then((response)=>{
                    // console.log(response.data);
                    this.alertmsg = response.data.message;
                    this.showalert =  !this.showalert;
                    if(this.isupdate == false){
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
                    else{
                        this.$store.dispatch('setcompanydata',{id: this.getuserid});
                    }
                    
                    setTimeout(() => {
                        this.clear();
                    }, 3000);
            });

        },

        clear(){
            this.showalert = false;
            this.alertmsg = '';
        },

        

    }

}
</script>