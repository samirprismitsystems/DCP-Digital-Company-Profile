<template>
    
    <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<DashData />

		<div class=" right_sidebar_content" v-if="getpagerequest == 1 && getcompanyid != ''">
            
            <div class="tabs-stage">
            <div id="tab-3" class="expand_tabs">
			    	<router-link to="/dashboard/product" class="btnBack site_btn btn_000 btncol"><i class="fas fa-arrow-left"></i>Back</router-link>
			      	<div class="tab_title">
				        <div class="h2">Add company Services</div>
				        <div class="h4">Upload best services</div>
			    	</div>
			    	
                    <!-- <h1 class="text-center" v-if="getpagedata == ''">No Services Found</h1> -->
                    
                    <form id="" @submit.prevent="saveservice()"  class="service_form company_items form_shadow">
			    		<div class="row" id="divdata">
			    		
                        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 item_col " v-for="(service,index) in getpagedata" :key="index">
			    			<div class="item_no">
			    				<h5>Service #<span class="count"> {{index+1}} </span></h5> <a @click="deleteservice(service.service_id)" type="button" class="dismiss-btn fas fa-trash-alt"></a>
			    			</div>
			    			<div class="item_div">
			    				<div class="item_img">
			    					<img :src="imgsrcservice[index]" alt="Service" title="" class="img-fit">
                                </div>
			    				<div>
			    					<div class="upload_btn btn_100 site_btn mb-0 w-100">
			    					<input type="file" name="service_image" @change="changepic(index,$event)" class="choose">
			    					Upload Service image
			    					</div>
			    					<input type="text" name="service-name" v-model="oldservice[index].service_name" class="item-input" placeholder="Enter service Name">
			    					<input type="number" name="service-price" v-model="oldservice[index].service_price" class="item-input" placeholder="Enter service MRP">
			    					<textarea  class="item-input" maxlength="200" v-model="oldservice[index].service_desc" placeholder="Enter service Description"></textarea>
			    				</div>	
			    			</div>
			    		</div>

                        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 item_col " v-for="(nservice,nindex) in newservice" :key="nindex+'new'">
			    			<div class="item_no">
			    				<h5>Add New Service <span class="count"> {{nindex+1}} </span></h5> <a @click="deletbox(nindex)" type="button" class="dismiss-btn fas fa-trash-alt"></a>
			    			</div>
			    			<div class="item_div">
			    				<div class="item_img">
			    					<img :src="newimgsrc[nindex]" alt="Service" title="" class="img-fit">
			    				</div>
			    				<div>
			    					<div class="upload_btn btn_100 site_btn mb-0 w-100">
			    					<!-- @change="changepic(index,$event)" -->
                                    <input type="file" @change="changenewpic(nindex,$event)"  class="choose">
			    					Upload Service image
			    					</div>
                                    
			    					<input type="text" name="service-name" v-model="nservice.service_name" class="item-input" placeholder="Enter service Name">
			    					<input type="number" name="service-price" v-model="nservice.service_price" class="item-input" placeholder="Enter service MRP">
			    					<textarea  class="item-input" maxlength="200" v-model="nservice.service_desc" placeholder="Enter service Description"></textarea>
			    				</div>	
			    			</div>
			    		</div>
			    		
			    		</div>
			    		<a @click="adddiv" type="button" class=" site_btn add-more-btn">Add More</a>

						<div class="form_btn_field">
							<button type="submit" class=" form_btn btn_200  ">Save Changes <i v-if="isloading" class="fas fa-spinner fa-pulse"></i></button>
							<router-link to="/dashboard/client"  class=" btnNext form_btn btn_100 btncol ">Next</router-link>
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
    name:'Service',
    components:{
        DashData
    },
    data(){
        return{
            service:[],
            oldservice:[],
            newservice:[],
            oldimages:[],
            newimages:[],
            imgsrcservice:[],
            newimgsrc:[],
            imgpath:this.$imgpath,
            isimgchange :false,
            imgsrcset:'',
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
        getpageinfo(){
          return this.$store.getters.getsitetitle;
        },
        getcompanyid(){
          return this.$store.getters.getcompanyid;
        },
        getpagerequest(){
          return this.$store.getters.getservicepagerequest;
        },
        getpagedata(){
            let data =  this.$store.getters.getservicedata;
            this.oldservice = [];
            if(data.length != 0 && this.getcompanyid != ''){
            let i = 0;
            data.forEach( element => {
                this.oldservice.push(element);
                if(this.isimgchange == true){
                    let blb = this.imgsrcservice[i].substr(0,4);
                    if(blb != 'blob'){
                        this.imgsrcservice[i] = this.$imgpath+this.getcompanyid+'/service/'+element.service_image;
                    }
                }
                else{
                    this.imgsrcservice[i] = this.$imgpath+this.getcompanyid+'/service/'+element.service_image;
                }
                i++;
            });
                this.oldservice = [ ...new Set(this.oldservice) ];
            }
            return data;
        },
    },

    watch:{
        $route(){
            this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        }
    },

    created(){
        if(this.getcompanyid == ''){
            this.$router.push('/dashboard/company');
        }
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
    },

    methods:{
        changepic(index,event){
            this.isimgchange = true;
            this.oldimages[index] = event.target.files[0];
            this.imgsrcservice[index] = URL.createObjectURL(event.target.files[0]);
            // this.oldservice[index].service_image = URL.createObjectURL(event.target.files[0]);
            this.oldservice = [ ...new Set(this.oldservice) ];
        },

        changenewpic(index,event){
            this.newimages[index] = event.target.files[0];
            this.newimgsrc[index] = URL.createObjectURL(event.target.files[0]);
            this.newservice[index].service_image = URL.createObjectURL(event.target.files[0]);
            this.newservice = [ ...new Set(this.newservice) ];
        },

        deletbox(index){
            this.newservice.splice(index, 1);
            this.newimgsrc[index] = '';
        },

        adddiv(){
            this.newservice.push({
                company_id:this.getcompanyid,
                service_image:null,
                service_name:'',
                service_desc:'',
                service_price:'',
            });
        },

        deleteservice(pid){
            this.$confirm("Are you sure you want to delete?").then(() => {
                axios.get('service/deleteservice/'+pid).then((res)=>{
                    this.$store.dispatch('setservicedata',{id: this.getuserdataemail });
                }).catch(()=>{});
            }).catch(()=>{
            });
        },

        async saveservice(){
            this.isloading  = true;
            this.oldservice = [ ...new Set(this.oldservice) ];
            let fd = new FormData();
            fd.append('user_id',this.getuserdataemail);
            fd.append('isupdate',true);
            for (let index = 0; index < this.oldimages.length; index++) {
                fd.append('oldimages'+index,this.oldimages[index]);
            }
            fd.append('imgcount', this.oldimages.length );
            fd.append('service_data',JSON.stringify(this.oldservice));
            
            if(this.oldservice != null && this.oldservice != ''){
                await axios.post('service/createservice',fd).then((result) => {
                });
            }

            if(this.newservice != null && this.newservice != ''){
                this.newservice = [ ...new Set(this.newservice) ];
                let fd1 = new FormData();
                fd1.append('user_id',this.getuserdataemail);
                fd1.append('isupdate',false);
                for (let index = 0; index < this.newimages.length; index++) {
                    fd1.append('oldimages'+index,this.newimages[index]);
                }
                fd1.append('imgcount', this.newimages.length );
                fd1.append('service_data',JSON.stringify(this.newservice));
            
                await axios.post('service/createservice',fd1).then((result) => {
                   
                    this.$store.dispatch('setservicedata',{id:this.getuserdataemail});
                    this.newservice = [];
                    this.newimages = [];
                    this.newimgsrc = [];
                    this.$swal.fire('Service Data', result.data.message , 'success');
                    this.isloading  = false;
                });
            }
            else{
                this.$swal.fire('Service Data', 'Service Data Updated' , 'success');
				this.$store.dispatch('setservicedata',{id:this.getuserdataemail});
                this.isloading  = false;
            }

        },

    },

}
</script>

<style scoped>
.menulist li{
    font-size: 16px;
    color: #9d278f;
    font-weight: 500;
    line-height: 1.2;
    transition: all 0.5s;
    display: list-item;
    padding: 20px 20px 20px 20px;
    margin-top: 2px;
    border-left : 5px black solid;
    background-color: #ddffff;
    padding-left: 10px;
}

.btncol{
    color: white;
}

</style>