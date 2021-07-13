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
			    			<div class="col-xl-6  col-lg-6 col-md-7  col-sm-12 form-col">
				    			<div class="form_field">
									<label class="" >Full Name / Business Name / Company Name *</label>
									<input name="cname" ref="cname" class="" v-model="getpagedata.company[0].company_name" type="text" placeholder="Enter Your Full Name / Business Name /Company Name" required>
								</div>
								<div class="form_field">
									<label class="" >Business Type / Description *</label>
									<input name="bsegment" ref="bsegment" class="" v-model="getpagedata.company[0].business_segment" type="text" placeholder="Business Type / Description" required>
								</div>
								<div class="row">
									<div class="col-sm-6 col-12">
									<div class=" form_field">
										<label class="" >Phone No. (WhatsApp No) *</label>
										<input name="cnumber" ref="cnumber" class="" v-model="getpagedata.company[0].company_contact" type="text" placeholder="Enter Your WhatsApp No" required>
									</div>
									</div>
									<div class="col-sm-6 col-12">
									<div class=" form_field">
										<label class="" >Alternet Phone No. (Optional)</label>
										<input name="canumber" ref="canumber" class="" v-model="getpagedata.company[0].company_alternate_contact" type="text" placeholder="Enter Your Alternet Phone No" required >
									</div>
									</div>
									
								</div>
								<div class="form_field">
									<label class="">Email Id *</label>
									<input name="cemail" ref="cemail" class="" v-model="getpagedata.company[0].company_email" type="email" placeholder="Enter Your Emial" required>
								</div>
			    			</div>

                            <!-- LOGO  -->
                            <div class="col-xl-3 col-lg-3 col-md-5 col-sm-5 col-10 logo-col private_img_col">
			    				<div class="upload_private_img_box logo_img_box">
			    					<div v-if="imgsrc == ''" class="upload_here">
			    						<img id="get_img" class="upload_img" src="" alt="logo image" style="display: none;" />
			    						<div class="placeholder_tex">
			    							<h3>Please Upload Here Your Company</h3>
			    							<h2>LOGO</h2>
			    						</div>
			    					</div>

                                    <div v-else class="upload_here">
			    						<img id="get_img" class="upload_img" :src="imgsrc" alt="logo image" />
			    					</div>

			    					<p class="red" >Image Required* 250KB max size</p>
			    					<div class="upload_btn btn_100 site_btn mb-0 w-100">
			    						<input type='file' @change="changepic" class="choose" />
			    					Upload logo file
			    					</div>
			    				</div>
							</div>

                            <!-- BANNER -->
			    			<div class="col-xl-3 col-lg-3 col-md-5 col-sm-5 col-10 logo-col private_img_col">
			    				<div class="upload_private_img_box logo_img_box">
			    					<div v-if="imgbannersrc == ''" class="upload_here">
			    						<img id="get_img" class="upload_img" src="" alt="banner image" style="display: none;" />
			    						<div class="placeholder_tex">
			    							<h3>Please Upload Company Background</h3>
			    							<h2>BANNER</h2>
			    						</div>
			    					</div>

                                    <div v-else class="upload_here">
			    						<img id="get_img" class="upload_img" :src="imgbannersrc" alt="banner image" />
			    					</div>

			    					<p class="red" >Image Required* 250KB max size</p>
			    					<div class="upload_btn btn_100 site_btn mb-0 w-100">
			    						<input type='file' @change="changebannerpic" class="choose" />
			    					Upload Banner Iamge
			    					</div>
			    				</div>
							</div>

                            

			    		</div>
                        
			    		<div class="row">
							<div class="col-lg-3 col-md-3 col-sm-12 col-12">
                                <div class=" form_field">
                                    <label class="" >House No, Street, Area *</label>
                                    <input name="area" ref="area" class="" v-model="getpagedata.company[0].area" type="text" placeholder="Enter House No , Street (Area)" required>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-12 col-12">
                                <div class=" form_field">
                                    <label class="" >Country *</label>
                                    <select name="country" v-model="country" @input="getstates(country)" disabled required>
                                        <option v-for="(country,index) in getareadata.data.country" :key="index" :value="country.sortname">{{country.name}}</option>
                                    </select>
                                    <!-- <input name="country" ref="country" class="" v-model="getpagedata.company[0].country" type="text" placeholder="Enter Country" required> -->
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-12 col-12">
                                <div class=" form_field">
                                    <label class="" >State *</label>
                                    <v-select :options="getstatesdata" v-model="state" @input="getcities(state)" required></v-select>
                                    <!-- <select name="state" v-model="state" @change="getcities(state)" required>
                                        <option v-for="(state,index) in stateslist" :key="index" :value="state.name">{{state.name}}</option>
                                    </select> -->
                                    <!-- <input name="state" ref="state" class="" v-model="getpagedata.company[0].state" type="text" placeholder="Enter State" required> -->
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-2 col-sm-12 col-12">
                                <div class=" form_field">
                                    <label class="" >City *</label>
                                    <v-select :options="citylist" v-model="city" required></v-select>
                                    <!-- <select name="city" v-model="city" id="citylist" required>
                                        <option v-for="(citydata,index) in citylist" :key="index" :value="citydata.name">{{citydata.name}}</option>
                                    </select> -->
                                    <!-- <input name="city" ref="city" class="" v-model="getpagedata.company[0].city" type="text" placeholder="Enter City" required> -->
                                
                                </div>
                            </div>

                            <div class="col-lg-2 col-md-2 col-sm-12 col-12">
                                <div class=" form_field">
                                    <label class="" >Postal Code *</label>
                                    <input name="postcode" ref="postcode" class="" v-model="getpagedata.company[0].post_code" type="text" placeholder="Enter Postcode" required>
                                </div>
                            </div>
                            
						</div>
                        
						<div class=" form_field">
							<label class="" >Company Est Date</label>
							<input name="esdate" ref="esdate" class="" v-model="getpagedata.company[0].established_in" type="date" placeholder="When your comp. was started?" >
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
                        
                        <div class="form_field">
						<label class="" >Map Address</label>
                        <div class="row">
                            <input class="col-lg-10 col-md-10" type="text" name="mapaddress" ref="mapaddress" v-model="mapaddress" placeholder="Enter Map Address  Eg. Area,city ">
                            <a class="col-lg-2 col-md-2 form_btn btn_200" @click="getmarkerdata">Get Location</a>
                        </div>
						
						</div>

                        <div class="form_field">
                            <label class="">Map</label>
                            <l-map :zoom="17" :center="[osmdata.lat,osmdata.lon ]" style="height: 400px; width:100%">
                                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                                <l-marker @dragend="changemarker($event)" :lat-lng="getmarker(osmdata.lat,osmdata.lon)" :draggable=true>
                                    <l-popup :content="osmdata.displayname"></l-popup>
                                </l-marker>
                            </l-map>
                        </div>

						<div class="form_btn_field">
							<button type="submit" class="form_btn btn_200"> Save Changes  <i v-if="isloading" class="fas fa-spinner fa-pulse"></i> </button>
							<router-link :to="'/dashboard/sociallinks'" tag="button" :disabled="isnext" type="button" class="btnNext  form_btn btn_100  ">Next</router-link>
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
import Vue from "vue";
import vSelect from "vue-select";
Vue.component("v-select", vSelect);
import "vue-select/dist/vue-select.css";

import axios from 'axios'
import DashData from './DashData'
import L from 'leaflet';
import { LMap, LTileLayer, LMarker,LPopup } from 'vue2-leaflet';

export default {
    name:'AddCompany',
    components:{
        DashData,
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
    },
    data(){
        return{
            isloading:false,
            workingdays:'',
            isnext:true,
            path:'',
            cities:[],
            allindia:false,
            social:[],
            
            ischangepic:false,
            // imgsrc:require('../assets/img/logo.jpg'),
            imgsrc:'',
            ischangebannerpic:false,
            imgbannersrc:'',


            isupdate:false,
            company_id:null,
            logo:'',

            companydata:{
                logo:null,
                banner:null,
                socialnames:[],
                sociallinks:[],
                cities:[],
            },

            osmdata:{
                lat:'21.1875694',
                lon:'72.8147383',
                displayname:''
            },
            // Map Data  
            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',      
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            marker: null,
            ismapdata:0,
            mapaddress:'',

            citylist:[],
            stateslist:[],
            country:'IN',
            state:'',
            city:'',
            isnewuser:0,
            
        }
    },

    computed:{

        getstatesreq(){
            return this.$store.getters.getstatesreq;
        },

        getstatesdata(){
            return this.$store.getters.getstatesdata;
        },

        getuserdataemail(){
            return this.$store.getters.getuserdataemail;
        },

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

                this.isupdate = true;
                this.company_id = data.company[0].company_id;
                this.logo = data.company[0].company_logo;
                this.banner = data.company[0].company_banner;
                this.country = data.company[0].country;
                this.state = data.company[0].state;
                this.city = data.company[0].city;

                if(this.getstatesreq == 0){
                    this.getstates(data.company[0].country);
                    this.getcities(data.company[0].state);
                }
                

                // console.log(data.company[0].company_logo);
                this.path = this.$imgpath+data.company[0].company_id+'/logo/'+data.company[0].company_logo;
                this.imgsrc = this.path;

                let bannerpath = this.$imgpath+data.company[0].company_id+'/banner/'+data.company[0].company_banner;
                this.imgbannersrc = bannerpath;


                this.workingdays = data.company[0].working_hours_day;
                this.osmdata.lat = data.company[0].map_lat;
                this.osmdata.lon = data.company[0].map_lng;
                this.osmdata.displayname = data.company[0].area +', '+ data.company[0].city +', '+ data.company[0].state +', '+ data.company[0].country +', '+ data.company[0].post_code;
                this.isnext = false;

                }
                else{
                    if(data.newuser == 1){
                        this.isnewuser = 1;
                        if(this.getstatesreq == 0){
                            this.getstates(this.country);
                        }
                        data.company[0] = {
                        };
                    }
                }
            }
            return data;
        },

        getareadata(){
            return this.$store.getters.getareadata;
        }

    },

    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        if(this.getpagerequest == 0){
            this.$store.dispatch('setcompanydata',{id: this.getuserdataemail});
            this.$store.dispatch('setallsocialdata');
            this.$store.dispatch('setsocialdata',{id: this.getuserdataemail});
            // this.$store.dispatch('setcitiesdata');
            this.$store.dispatch('setproductdata',{id: this.getuserdataemail });
            this.$store.dispatch('setservicedata',{id: this.getuserdataemail });
            this.$store.dispatch('setClientData',{id: this.getuserdataemail } );
            this.$store.dispatch('setportfolioData',{id: this.getuserdataemail });
            this.$store.dispatch('settestimonialData',{id: this.getuserdataemail } );
            this.$store.dispatch('setinquiryData',{id: this.getuserdataemail } );
            this.$store.dispatch('setpaymentoptions',{id:this.getuserdataemail});
        }
    },

    methods:{

        getcities(state){
            axios.get('company/getcitiesdata/'+state).then((result)=>{
                // console.log(result);
                result.data.cities.forEach(element => {
                    this.citylist.push(element.name);
                });
            });
        },

        getstates(country){
            axios.get('company/getstatesdata/'+country).then((result)=>{
                // console.log(result);
                result.data.states.forEach(element => {
                    this.stateslist.push(element.name);
                });

                this.$store.dispatch('setstatesdata',{states:this.stateslist});

            });
        },

        changemarker(event){
            this.osmdata.lat = event.target._latlng.lat;
            this.osmdata.lon = event.target._latlng.lng;
            this.osmdata.displayname = this.mapaddress;
        },

        getmarkerdata(){
            axios.get('https://nominatim.openstreetmap.org/search?q='+this.mapaddress+'&limit=2&format=json').then((response)=>{
                if(response.data.length == 0){
                    this.$swal.fire('No Data Found', 'No Address Found Try Area and City name To Get Map' , 'error');
                }
                else{
                    this.osmdata.lat = response.data[0].lat;
                    this.osmdata.lon = response.data[0].lon;
                    this.osmdata.displayname = response.data[0].display_name;
                }
            });
        },

        getmarker(lat,lng){
            return L.latLng([lat,lng])
        },

        openbox(){
            document.getElementById('imgchange').click();
        },

        changepic(event){
            this.companydata.logo = event.target.files[0];
            this.imgsrc = URL.createObjectURL(this.companydata.logo);
            this.ischangepic = true;
        },

        changebannerpic(event){
            this.companydata.banner = event.target.files[0];
            this.imgbannersrc = URL.createObjectURL(this.companydata.banner);
            this.ischangebannerpic = true;
        },

        addcompanydata(){
            
            this.isloading  = true;
            let isimages = 0;
            let isaddress = 0;
            
            if(this.isnewuser == 1 ){
                if(this.companydata.logo == null && this.companydata.banner == null){
                    isimages = 1;
                }
            }

            if(this.state == null || this.state == ''  && this.city == null || this.city == ''){
                isaddress = 1;
            }

        if(isimages == 0){

            if(isaddress == 0){

                let fd = new FormData();
                let slug = this.$refs.cname.value.replace(/[^a-zA-Z ]/g, "");
                let company_slug = slug.replace(" ","-").replace(/\s+/g, '').toLowerCase();

                fd.append('user_id',this.getuserdataemail);
                fd.append('company_name',this.$refs.cname.value);
                fd.append('company_slug',company_slug);
                fd.append('company_desc',this.$refs.cdesc.value);
                fd.append('established_in',this.$refs.esdate.value);
                fd.append('business_segment',this.$refs.bsegment.value);
                // fd.append('address',this.$refs.address.value);
                fd.append('area',this.$refs.area.value);
                fd.append('city',this.city);
                fd.append('state',this.state);
                fd.append('country',this.country);
                fd.append('post_code',this.$refs.postcode.value);
                fd.append('company_email',this.$refs.cemail.value);
                fd.append('company_contact',this.$refs.cnumber.value);
                fd.append('company_alternate_contact',this.$refs.canumber.value);
                fd.append('working_hours_day',this.workingdays);
                fd.append('working_hours_from',this.$refs.fromtime.value);
                fd.append('working_hours_to',this.$refs.totime.value);
                fd.append('map_lat',this.osmdata.lat);
                fd.append('map_lng',this.osmdata.lon);
                fd.append('isupdate',false);

                if(this.ischangepic == true){
                fd.append('company_logo',this.companydata.logo);
                this.ischangepic = false;
                }

                if(this.ischangebannerpic == true){
                fd.append('company_banner',this.companydata.banner);
                this.ischangepic = false;
                }


                if(this.isupdate == true){
                    fd.append('company_id',this.company_id);
                    fd.append('logo',this.logo);
                    fd.append('banner',this.banner);
                    fd.append('isupdate',true);
                }

                axios.post('company/createcompany',fd).then((response)=>{
                        // console.log(response.data);
                        this.alertmsg = response.data.message;
                        this.showalert =  !this.showalert;
                        if(this.isupdate == false){
                            this.$store.dispatch('setcompanydata',{id: this.getuserdataemail});
                            this.$store.dispatch('setallsocialdata');
                            this.isloading  = false;
                        }
                        else{
                            this.$store.dispatch('setcompanydata',{id: this.getuserdataemail});
                            this.isloading  = false;
                        }
                    this.$swal.fire('Company Data', response.data.message , 'success');
                });
            }
            else{
                this.$swal.fire('Please Select Mandatory fields', '* Indicates Mandatory fields' , 'error');
                this.isloading  = false;
            }
        }
        else{
            this.$swal.fire('Please Select Logo and Banner Image', '* Indicates Mandatory fields' , 'error');
            this.isloading  = false;
        }
            

        },

    }

}
</script>