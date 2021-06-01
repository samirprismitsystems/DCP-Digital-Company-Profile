<template>

    <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<DashData />

		<div class=" right_sidebar_content" v-if="getpagerequest == 1">
			<div class="tabs-stage">


            <div id="tab-3" class="expand_tabs">
			    	<button type="button" class="btnBack  site_btn btn_000"><i class="fas fa-arrow-left"></i>Back</button>
			      	<div class="tab_title">
				        <div class="h2">Add company products</div>
				        <div class="h4">Upload products which people can order online</div>
			    	</div>
			    	<form id="" @submit.prevent="saveproduct()" class="product_form company_items form_shadow">
			    		<div class="row">
			    		
                        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 item_col " v-for="(product,index) in getpagedata" :key="index">
			    			<div class="item_no">
			    				<h5>Product No <span class="count"> {{index+1}} </span></h5> <a @click="deleteproduct(product.product_id)" type="button" class="dismiss-btn fas fa-trash-alt"></a>
			    			</div>
			    			<div class="item_div">
			    				<div class="item_img">
			    					<img :src="imgsrc[index]" alt="" title="" class="img-fit">
			    				</div>
			    				<div>
			    					<div class="upload_btn btn_100 site_btn mb-0 w-100">
			    					<input type="file" @change="changepic(index,$event)" class="choose">
			    					Upload product image
			    					</div>
			    					<input type="text" name="product-name" v-model="oldproduct[index].product_name" class="item-input" placeholder="Enter Product Name">
			    					<input type="number" name="product-price" v-model="oldproduct[index].product_price" class="item-input" placeholder="Enter Product MRP">
			    					<textarea  class="item-input" maxlength="200" v-model="oldproduct[index].product_desc" placeholder="Enter Product Description"></textarea>
			    				</div>	
			    			</div>
			    		</div>
			    		
			    		</div>
			    		<button type="button" class=" site_btn add-more-btn">Add More</button>

						<div class="form_btn_field">
							<button type="submit" class=" form_btn btn_200  ">Save Changes</button>
							<button type="button" class=" btnNext form_btn btn_100  ">Next</button>
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
            imgsrc:[],
            imgpath:this.$imgpath,
            ischangepic:false,
        }
    },
    components:{
        DashData
    },
    computed:{
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
            let i = 0;
            data.forEach( element => {
                this.oldproduct.push(element);
                this.imgsrc[i] = this.$imgpath+this.getcompanyid+'/products/'+ element.product_image;
                i++;
            });
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
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        if(this.getpagerequest == 0){
            this.$store.dispatch('setcompanydata',{id: this.getuserid});
            this.$store.dispatch('setproductdata',{id: this.getuserid });
            this.$store.dispatch('setsocialdata',{id: this.getuserid});
            this.$store.dispatch('setcitiesdata');
            this.$store.dispatch('setservicedata',{id: this.getuserid });
            this.$store.dispatch('setClientData',{id: this.getuserid } );
            this.$store.dispatch('setportfolioData',{id: this.getuserid });
            this.$store.dispatch('settestimonialData',{id: this.getuserid } );
            this.$store.dispatch('setinquiryData',{id: this.getuserid } );
            this.$store.dispatch('setpaymentoptions',{id:this.getuserid});
        }
    },

    methods:{

        changepic(index,event){
            // this.oldproduct[index].product_image = event.target.files[0];
            let src  = event.target.files[0];
            this.imgsrc[index] = URL.createObjectURL(src);
            this.ischangepic = true;
        },

        saveproduct(){
            console.log(this.oldproduct);
        },

        deleteproduct(pid){
            this.$confirm("Are you sure you want to delete?").then(() => {
                axios.get('product/deleteproduct/'+pid).then((res)=>{
                    this.$store.dispatch('setproductdata',{id: this.getuserid });
                }).catch(()=>{});
            }).catch(()=>{
            });
        }
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
</style>