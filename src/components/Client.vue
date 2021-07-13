<template>
    
    <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<DashData />

		<div class=" right_sidebar_content" v-if="getpagerequest == 1 && getcompanyid != ''">
			<div class="tabs-stage">


            <div id="tab-3" class="expand_tabs">
			    	<router-link to="/dashboard/service" class="btnBack site_btn btn_000 btncol"><i class="fas fa-arrow-left"></i>Back</router-link>
			      	<div class="tab_title">
				        <div class="h2">Add Company Clients</div>
				        <div class="h4">Add Clients</div>
			    	</div>
			    	<form id="" @submit.prevent="saveclient()"  class="client_form company_items form_shadow">
			    		<div class="row" id="divdata">
			    		
                        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 item_col " v-for="(client,index) in getpagedata" :key="index">
			    			<div class="item_no">
			    				<h5>client #<span class="count"> {{index+1}} </span></h5> <a @click="deleteclient(client.client_id)" type="button" class="dismiss-btn fas fa-trash-alt"></a>
			    			</div>
			    			<div class="item_div">
			    				<div class="item_img">
			    					<img :src="imgsrcclient[index]" alt="client" title="" class="img-fit">
			    				</div>
			    				<div>
			    					<div class="upload_btn btn_100 site_btn mb-0 w-100">
			    					<input type="file" name="client_image" @change="changepic(index,$event)" class="choose">
			    					Upload client image
			    					</div>
			    					<input type="text" name="client-name" v-model="oldclient[index].client_name" class="item-input" placeholder="Enter client Name">
			    				</div>	
			    			</div>
			    		</div>

                        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 item_col " v-for="(nclient,nindex) in newclient" :key="nindex+'new'">
			    			<div class="item_no">
			    				<h5>Add New client <span class="count"> {{nindex+1}} </span></h5> <a @click="deletbox(nindex)" type="button" class="dismiss-btn fas fa-trash-alt"></a>
			    			</div>
			    			<div class="item_div">
			    				<div class="item_img">
			    					<img :src="newimgsrc[nindex]" alt="client" title="" class="img-fit">
			    				</div>
			    				<div>
			    					<div class="upload_btn btn_100 site_btn mb-0 w-100">
			    					<!-- @change="changepic(index,$event)" -->
                                    <input type="file" @change="changenewpic(nindex,$event)"  class="choose">
			    					Upload client image
			    					</div>
                                    
			    					<input type="text" name="client-name" v-model="nclient.client_name" class="item-input" placeholder="Enter client Name">
			    				</div>	
			    			</div>
			    		</div>
			    		
			    		</div>
			    		<a @click="adddiv" type="button" class=" site_btn add-more-btn">Add More</a>

						<div class="form_btn_field">
							<button type="submit" class=" form_btn btn_200  ">Save Changes  <i v-if="isloading" class="fas fa-spinner fa-pulse"></i></button>
							<router-link to="/dashboard/portfolio"  class=" btnNext form_btn btn_100 btncol ">Next</router-link>
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
    name:'Client',
    data(){
        return{
            oldclient:[],
            newclient:[],
            oldimages:[],
            newimages:[],
            imgsrcclient:[],
            newimgsrc:[],
            imgpath:this.$imgpath,
            ischangepic:false,
            newdataindex:0,
            isimgchange:false,
            isloading:false,
        }
    },

    components:{
        DashData
    },

    computed:{
        getuserdataemail(){
            return this.$store.getters.getuserdataemail;
        },
        getpageinfo(){
          return this.$store.getters.getsitetitle;
        },
        getcompanyid(){
          return this.$store.getters.getcompanyid;
        },
        getpagerequest(){
          return this.$store.getters.getclientpagerequest;
        },
        getpagedata(){
          let data =  this.$store.getters.getclientdata;
            this.oldclient = [];
            if(data.length != 0 && this.getcompanyid != ''){
                let i = 0;
            data.forEach( element => {
                this.oldclient.push(element);
                if(this.isimgchange == true){
                    let blb = this.imgsrcclient[i].substr(0,4);
                    if(blb != 'blob'){
                        this.imgsrcclient[i] = this.$imgpath+this.getcompanyid+'/client/'+element.client_logo;
                    }
                }
                else{
                    this.imgsrcclient[i] = this.$imgpath+this.getcompanyid+'/client/'+element.client_logo;
                }
                i++;
            });
                this.oldclient = [ ...new Set(this.oldclient) ];
            }
            return data;
        },
        getuserid(){
            return this.$store.getters.getuserid;
        }
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
            this.imgsrcclient[index] = URL.createObjectURL(event.target.files[0]);
            // this.oldclient[index].client_logo = URL.createObjectURL(event.target.files[0]);
            this.oldclient = [ ...new Set(this.oldclient) ];
        },

        changenewpic(index,event){
            this.newimages[index] = event.target.files[0];
            this.newimgsrc[index] = URL.createObjectURL(event.target.files[0]);
            this.newclient[index].client_logo = URL.createObjectURL(event.target.files[0]);
            this.newclient = [ ...new Set(this.newclient) ];
        },

        deletbox(index){
            this.newclient.splice(index, 1);
            this.newimgsrc[index] = '';
        },


        adddiv(){
            this.newclient.push({
                company_id:this.getcompanyid,
                client_name:'',
                client_logo:null,
            });
        },

        deleteclient(cid){
            this.$confirm("Are you sure you want to delete?").then(() => {
                axios.get('client/deleteclient/'+cid).then((res)=>{
                    this.$store.dispatch('setClientData',{id: this.getuserdataemail });
                }).catch(()=>{});
            }).catch(()=>{
            });
        },

        async saveclient(){
            this.isloading  = true;
            this.oldclient = [ ...new Set(this.oldclient) ];
            let fd = new FormData();
            fd.append('user_id',this.getuserdataemail);
            fd.append('isupdate',true);
            for (let index = 0; index < this.oldimages.length; index++) {
                fd.append('oldimages'+index,this.oldimages[index]);
            }
            fd.append('imgcount', this.oldimages.length );
            fd.append('client_data',JSON.stringify(this.oldclient));
            
            if(this.oldclient != null && this.oldclient != ''){
                await axios.post('client/createclient',fd).then((result) => {
                });
            }

            if(this.newclient != null && this.newclient != ''){
                this.newclient = [ ...new Set(this.newclient) ];
                let fd1 = new FormData();
                fd1.append('user_id',this.getuserdataemail);
                fd1.append('isupdate',false);
                for (let index = 0; index < this.newimages.length; index++) {
                    fd1.append('oldimages'+index,this.newimages[index]);
                }
                fd1.append('imgcount', this.newimages.length );
                fd1.append('client_data',JSON.stringify(this.newclient));
                
                await axios.post('client/createclient',fd1).then((result) => {
                    
                    this.$store.dispatch('setClientData',{id:this.getuserdataemail});
                    this.newclient = [];
                    this.newimages = [];
                    this.newimgsrc = [];
                    this.$swal.fire('Client Data', result.data.message , 'success');
                    this.isloading  = false;
                });
            }
            else{
                this.$swal.fire('Client Data', 'Client Data Updated' , 'success');
				this.$store.dispatch('setClientData',{id:this.getuserdataemail});
                this.isloading  = false;
            }

        }


    },

}
</script>


<style scoped>
    .btncol{
        color: white;
    }
</style>