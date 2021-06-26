<template>
    <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<DashData />

		<div class=" right_sidebar_content" v-if="getpagerequest == 1 && getcompanyid != ''">
			<div class="tabs-stage">

            <div id="tab-3" class="expand_tabs">
			    	<router-link to="/dashboard/client" class="btnBack site_btn btn_000 btncol"><i class="fas fa-arrow-left"></i>Back</router-link>
			      	<div class="tab_title">
				        <div class="h2">Add company portfolios</div>
				        <div class="h4">Upload up to 10 Images</div>
			    	</div>
			    	<form id="" @submit.prevent="saveportfolio()"  class="portfolio_form company_items form_shadow">
			    		<div class="row" id="divdata">
			    		
                        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 item_col " v-for="(portfolio,index) in getpagedata" :key="index">
			    			<div class="item_no">
			    				<h5>portfolio #<span class="count"> {{index+1}} </span></h5> <a @click="deleteportfolio(portfolio.portfolio_id)" type="button" class="dismiss-btn fas fa-trash-alt"></a>
			    			</div>
			    			<div class="item_div">
			    				<div class="item_img">
			    					<img :src="imgsrcport[index]" alt="" title="" class="img-fit">
			    				</div>
			    				<div>
			    					<div class="upload_btn btn_100 site_btn mb-0 w-100">
			    					<input type="file" name="portfolio_image" @change="changepic(index,$event)" class="choose">
			    					Upload portfolio image
			    					</div>
			    					<input type="text" name="portfolio-name" v-model="oldportfolio[index].portfolio_name" class="item-input" placeholder="Enter portfolio Name">
			    					<textarea  class="item-input" maxlength="200" v-model="oldportfolio[index].portfolio_desc" placeholder="Enter portfolio Description"></textarea>
			    				</div>	
			    			</div>
			    		</div>

                        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 item_col " v-for="(nportfolio,nindex) in newportfolio" :key="nindex+'new'">
			    			<div class="item_no">
			    				<h5>Add New portfolio <span class="count"> {{nindex+1}} </span></h5> <a @click="deletbox(nindex)" type="button" class="dismiss-btn fas fa-trash-alt"></a>
			    			</div>
			    			<div class="item_div">
			    				<div class="item_img">
			    					<img :src="newimgsrc[nindex]" alt="" title="" class="img-fit">
			    				</div>
			    				<div>
			    					<div class="upload_btn btn_100 site_btn mb-0 w-100">
			    					<!-- @change="changepic(index,$event)" -->
                                    <input type="file" @change="changenewpic(nindex,$event)"  class="choose">
			    					Upload portfolio image
			    					</div>
                                    
			    					<input type="text" name="portfolio-name" v-model="nportfolio.portfolio_name" class="item-input" placeholder="Enter portfolio Name">
			    					<textarea  class="item-input" maxlength="200" v-model="nportfolio.portfolio_desc" placeholder="Enter portfolio Description"></textarea>
			    				</div>	
			    			</div>
			    		</div>
			    		
			    		</div>
			    		<a @click="adddiv" type="button" class=" site_btn add-more-btn">Add More</a>

						<div class="form_btn_field">
							<button type="submit" class=" form_btn btn_200  ">Save Changes <i v-if="isloading" class="fas fa-spinner fa-pulse"></i></button>
							<router-link to="/dashboard/testimonial"  class=" btnNext form_btn btn_100 btncol">Next</router-link>
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
    name:'Portfolio',
    data(){
        return{
            portfolio:[],
            oldportfolio:[],
            newportfolio:[],
            oldimages:[],
            newimages:[],
            imgsrcport:[],
            newimgsrc:[],
            imgpath:this.$imgpath,
            isimgchange :false,
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
        getuserid(){
          return this.$store.getters.getuserid;
        },
        getpageinfo(){
          return this.$store.getters.getsitetitle;
        },
        getpagerequest(){
          return this.$store.getters.getportfoliopagerequest;
        },
        getcompanyid(){
          return this.$store.getters.getcompanyid;
        },
        getpagedata(){
          let data =  this.$store.getters.getportfoliodata;
            this.oldportfolio = [];
            if(data.length != 0 && this.getcompanyid != ''){
            let i = 0;
            data.forEach( element => {
                this.oldportfolio.push(element);
                if(this.isimgchange == true){
                    let blb = this.imgsrcport[i].substr(0,4);
                    if(blb != 'blob'){
                        this.imgsrcport[i] = this.$imgpath+this.getcompanyid+'/portfolio/'+element.portfolio_image;
                    }
                }
                else{
                    this.imgsrcport[i] = this.$imgpath+this.getcompanyid+'/portfolio/'+element.portfolio_image;
                }
                i++;
            });
                this.oldportfolio = [ ...new Set(this.oldportfolio) ];
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
            this.isimgchange = true;
            this.oldimages[index] = event.target.files[0];
            this.imgsrcport[index] = URL.createObjectURL(event.target.files[0]);
            // this.oldportfolio[index].portfolio_image = URL.createObjectURL(event.target.files[0]);
            this.oldportfolio = [ ...new Set(this.oldportfolio) ];
        },

        changenewpic(index,event){
            this.newimages[index] = event.target.files[0];
            this.newimgsrc[index] = URL.createObjectURL(event.target.files[0]);
            this.newportfolio[index].portfolio_image = URL.createObjectURL(event.target.files[0]);
            this.newportfolio = [ ...new Set(this.newportfolio) ];
        },

        deletbox(index){
            this.newportfolio.splice(index, 1);
            this.newimgsrc[index] = '';
        },

        adddiv(){
            this.newportfolio.push({
                company_id:this.getcompanyid,
                portfolio_image:null,
                portfolio_name:'',
                portfolio_desc:'',
            });
        },

        deleteportfolio(pid){
            this.$confirm("Are you sure you want to delete?").then(() => {
                axios.get('portfolio/deleteportfolio/'+pid).then((res)=>{
                    this.$store.dispatch('setportfolioData',{id: this.getuserdataemail });
                }).catch(()=>{});
            }).catch(()=>{
            });
        },

        async saveportfolio(){
            this.isloading  = true;
            this.oldportfolio = [ ...new Set(this.oldportfolio) ];
            let fd = new FormData();
            fd.append('user_id',this.getuserdataemail);
            fd.append('isupdate',true);
            for (let index = 0; index < this.oldimages.length; index++) {
                fd.append('oldimages'+index,this.oldimages[index]);
            }
            fd.append('imgcount', this.oldimages.length );
            fd.append('portfolio_data',JSON.stringify(this.oldportfolio));

            if(this.oldportfolio != null && this.oldportfolio != ''){
                await axios.post('portfolio/createportfolio',fd).then((result) => {
                });
            }

            if(this.newportfolio != null && this.newportfolio != ''){
                this.newportfolio = [ ...new Set(this.newportfolio) ];
                let fd1 = new FormData();
                fd1.append('user_id',this.getuserdataemail);
                fd1.append('isupdate',false);
                for (let index = 0; index < this.newimages.length; index++) {
                    fd1.append('oldimages'+index,this.newimages[index]);
                }
                fd1.append('imgcount', this.newimages.length );
                fd1.append('portfolio_data',JSON.stringify(this.newportfolio));
            
                await axios.post('portfolio/createportfolio',fd1).then((result) => {
                    this.$store.dispatch('setportfolioData',{id:this.getuserdataemail});
                    this.newportfolio = [];
                    this.newimages = [];
                    this.newimgsrc = [];
                    this.$swal.fire('Portfolio Data', result.data.message , 'success');
                    this.isloading  = false;
                });
            }
            else{
                this.$swal.fire('Portfolio Data', 'Portfolio Data Updated' , 'success');
				this.$store.dispatch('setportfolioData',{id:this.getuserdataemail});
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