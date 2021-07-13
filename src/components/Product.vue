<template>

    <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<DashData />

		<div class=" right_sidebar_content" v-if="getpagerequest == 1 && getcompanyid != ''">
			<div class="tabs-stage">


            <div id="tab-3" class="expand_tabs">
			    	<router-link to="/dashboard/sociallinks" type="button" class="btnBack site_btn btn_000 btncol"><i class="fas fa-arrow-left"></i>Back</router-link>
			      	<div class="tab_title">
				        <div class="h2">Add company products</div>
				        <div class="h4">Upload products which people can order online</div>
			    	</div>

                    <!-- <h1 class="text-center" v-if="getpagedata == ''">No Services Found</h1> -->

			    	<form id="" @submit.prevent="saveproduct()"  class="product_form company_items form_shadow">
			    		<div class="row" id="divdata">
			    		
                        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 item_col " v-for="(product,index) in getpagedata" :key="index">
			    			<div class="item_no">
			    				<h5>Product #<span class="count"> {{index+1}} </span></h5> <a @click="deleteproduct(product.product_id)" type="button" class="dismiss-btn fas fa-trash-alt"></a>
			    			</div>
			    			<div class="item_div">
			    				<div class="item_img">
			    					<img :src="imgsrcprod[index]" alt="Products" title="" class="img-fit">
			    				</div>
			    				<div>
			    					<div class="upload_btn btn_100 site_btn mb-0 w-100">
			    					<input type="file" name="product_image" @change="changepic(index,$event)" class="choose">
			    					Upload product image
			    					</div>
			    					<input type="text" name="product-name" v-model="oldproduct[index].product_name" class="item-input" placeholder="Enter Product Name">
			    					<input type="number" name="product-price" v-model="oldproduct[index].product_price" class="item-input" placeholder="Enter Product MRP">
			    					<textarea  class="item-input" maxlength="200" v-model="oldproduct[index].product_desc" placeholder="Enter Product Description"></textarea>
			    				</div>	
			    			</div>
			    		</div>

                        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 item_col " v-for="(nproduct,nindex) in newproduct" :key="nindex+'new'">
			    			<div class="item_no">
			    				<h5>Add New Product <span class="count"> {{nindex+1}} </span></h5> <a @click="deletbox(nindex)" type="button" class="dismiss-btn fas fa-trash-alt"></a>
			    			</div>
			    			<div class="item_div">
			    				<div class="item_img">
			    					<img :src="newimgsrc[nindex]" alt="Products" title="" class="img-fit">
			    				</div>
			    				<div>
			    					<div class="upload_btn btn_100 site_btn mb-0 w-100">
			    					<!-- @change="changepic(index,$event)" -->
                                    <input type="file" @change="changenewpic(nindex,$event)"  class="choose">
			    					Upload product image
			    					</div>
                                    
			    					<input type="text" name="product-name" v-model="nproduct.product_name" class="item-input" placeholder="Enter Product Name">
			    					<input type="number" name="product-price" v-model="nproduct.product_price" class="item-input" placeholder="Enter Product MRP">
			    					<textarea  class="item-input" maxlength="200" v-model="nproduct.product_desc" placeholder="Enter Product Description"></textarea>
			    				</div>	
			    			</div>
			    		</div>
			    		
			    		</div>
			    		<a @click="adddiv" type="button" class=" site_btn add-more-btn">Add More</a>

						<div class="form_btn_field">
							<button type="submit" class=" form_btn btn_200  ">Save Changes <i v-if="isloading" class="fas fa-spinner fa-pulse"></i></button>
							<router-link to="/dashboard/service"  class=" btnNext form_btn btn_100 btncol ">Next</router-link>
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
    name:'Product',
    data(){
        return{
            oldproduct:[],
            newproduct:[],
            oldimages:[],
            newimages:[],
            imgsrcprod:[],
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
        getuserid(){
          return this.$store.getters.getuserid;
        },
        getcompanyid(){
          return this.$store.getters.getcompanyid;
        },
        getpageinfo(){
          return this.$store.getters.getsitetitle;
        },
        getpagerequest(){
          return this.$store.getters.getproductpagerequest;
        },
        getpagedata(){
            let data =  this.$store.getters.getproductdata;
            this.oldproduct = [];
            if(data.length != 0 && this.getcompanyid != ''){
            let i = 0;
            data.forEach( element => {
                this.oldproduct.push(element);
                if(this.isimgchange == true){
                    let blb = this.imgsrcprod[i].substr(0,4);
                    if(blb != 'blob'){
                        this.imgsrcprod[i] = this.$imgpath+this.getcompanyid+'/product/'+element.product_image;
                    }
                }
                else{
                    this.imgsrcprod[i] = this.$imgpath+this.getcompanyid+'/product/'+element.product_image;
                }
                i++;
            });
                this.oldproduct = [ ...new Set(this.oldproduct) ];
            }
            // console.log(this.oldproduct);
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
            this.imgsrcprod[index] = URL.createObjectURL(event.target.files[0]);
            // console.log(this.imgsrc[index]);
            // this.oldproduct[index].product_image = URL.createObjectURL(event.target.files[0]);
            this.imgsrcprod = [ ...new Set(this.imgsrcprod) ];
            this.oldproduct = [ ...new Set(this.oldproduct) ];
        },

        changenewpic(index,event){
            this.newimages[index] = event.target.files[0];
            this.newimgsrc[index] = URL.createObjectURL(event.target.files[0]);
            this.newproduct[index].product_image = URL.createObjectURL(event.target.files[0]);
            this.newproduct = [ ...new Set(this.newproduct) ];
        },

        deletbox(index){
            this.newproduct.splice(index, 1);
            this.newimgsrc[index] = null;
        },


        adddiv(){
            this.newproduct.push({
                company_id:this.getcompanyid,
                product_image:null,
                product_name:'',
                product_desc:'',
                product_price:'',
            });
        },

        async saveproduct(){
            this.isloading  = true;

            this.oldproduct = [ ...new Set(this.oldproduct) ];
            
            let fd = new FormData();
            fd.append('user_id',this.getuserdataemail);
            fd.append('isupdate',true);
            for (let index = 0; index < this.oldimages.length; index++) {
                fd.append('oldimages'+index,this.oldimages[index]);
            }
            fd.append('imgcount', this.oldimages.length );
            fd.append('product_data',JSON.stringify(this.oldproduct));
            
            if(this.oldproduct != null && this.oldproduct != ''){
                await axios.post('product/createproduct',fd).then((result) => {
                });
            }

            if(this.newproduct != null && this.newproduct != ''){
                this.newproduct = [ ...new Set(this.newproduct) ];
                let fd1 = new FormData();
                fd1.append('user_id',this.getuserdataemail);
                fd1.append('isupdate',false);
                for (let index = 0; index < this.newimages.length; index++) {
                    fd1.append('oldimages'+index,this.newimages[index]);
                }
                fd1.append('imgcount', this.newimages.length );
                fd1.append('product_data',JSON.stringify(this.newproduct));
                
                await axios.post('product/createproduct',fd1).then((result) => {
                    this.$store.dispatch('setproductdata',{id:this.getuserdataemail});
                    this.newproduct = [];
                    this.newimages = [];
                    this.newimgsrc = [];
                    this.$swal.fire('Product Data', result.data.message , 'success');
                    this.isloading  = false;
                });
            }
            else{
				this.$swal.fire('Product Data', 'Product Data Updated' , 'success');
				this.$store.dispatch('setproductdata',{id: this.getuserdataemail});
                this.isloading  = false;
			}
        },

        deleteproduct(pid){
            this.$confirm("Are you sure you want to delete?").then(() => {
                axios.get('product/deleteproduct/'+pid).then((res)=>{
                    this.$store.dispatch('setproductdata',{id: this.getuserdataemail });
                }).catch(()=>{});
            }).catch(()=>{
            });
        }
    },

}
</script>



<style scoped>
    .btncol{
        color: white;
    }
</style>