<template>
    <div class="row justify-content-center mt-5">

        <div class="col-lg-8" v-if="getproductpagerequest == 1">
      
       <form @submit.prevent="editproductdata()" enctype="multipart/form-data" class="text-justify col-lg-10">
            
            <div class="form-group">
                <label>Product Image</label>
                <input id="imgchange" v-show="false" type="file" @change="changepic($event)">
                Change Image
                <img @click="openbox" class="ml-3" :src="imgsrc" height="100" width="100">
            </div>
            
            <div class="form-group">
                <label>Product Name</label>
                <input type="text" name="cname" v-model="getpagedata.product_name" ref="product_name" class="form-control" placeholder="Enter Product name">
            </div>

            <div class="form-group">
                <label>Product Description</label>
                <textarea class="form-control" v-model="getpagedata.product_desc" ref="product_desc" name="cdesc" rows="4" cols="100" placeholder="Enter Product Description"></textarea>
            </div>

            <div class="form-group">
                <label>Product Price</label>
                <input type="number" name="cwhours" v-model="getpagedata.product_price" ref="product_price" class="form-control" placeholder="Enter Product Price">
            </div>
            
            <button type="submit" class="btn btn-primary mb-2">Submit</button>
        </form>

            <div v-show="showalert" class="alert alert-success">{{alertmsg}}</div>


        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'EditProduct',

    components:{
        
    },

    data(){
        return{
            isLoading:false,
            product_id:this.$route.params.pid,
            imgpath:this.$imgpath,
            company_id:0,
            showimg:false,
            imgsrc:'',
            showalert:false,
            alertmsg:'',
            pimage:'',
            // productdata:{
            //     pimage:'',
            //     pname:'',
            //     pdesc:'',
            //     pprice:''
            // }
        }
    },

    created(){
        if(this.getproductpagerequest == 0){
            this.$store.dispatch('setproductdata',{id:15});
        }
        // this.$store.dispatch('setcompanydata',{id:1});
        // this.company_id = this.getcompanypagedata.company[0].company_id;
    },

    computed:{
        getpageinfo(){
          return this.$store.getters.getsitetitle;
        },
        getproductpagerequest(){
          return this.$store.getters.getproductpagerequest;
        },
        // getproductpagedata(){
        //   return this.$store.getters.getproductdata;
        // },

        getpagedata(){
            let data =  this.$store.getters.getsingleproductdata(this.product_id);
            this.imgsrc = this.$imgpath+'/15/products/'+data.product_image;
            return data;
        }

    },

    methods:{

        openbox(){
            document.getElementById('imgchange').click();
        },
        
        changepic(event){
            this.pimage = event.target.files[0];
            this.imgsrc = URL.createObjectURL(this.pimage);
            this.showimg = true;
        },

        editproductdata(){
            let fd = new FormData();
            fd.append('user_id',1);
            fd.append('product_id', this.getpagedata.product_id );
            fd.append('product_name', this.$refs.product_name.value);
            fd.append('product_desc',this.$refs.product_desc.value);
            fd.append('product_price',this.$refs.product_price.value);
            fd.append('isupdate',true);

            if(this.pimage == ''){
                fd.append('product_image',this.getpagedata.product_image);
            }
            else{
                fd.append('product_image',this.pimage);
            }
            fd.append('user_id',1);
            // console.log(this.productdata);
            axios.post('product/createproduct',fd).then((result) => {
                console.log(result.data);
                this.alertmsg = result.data.message;
                this.showalert = true;
                this.$store.dispatch('setproductdata',{id:15});
                setTimeout(() => {
                    this.clear();
                }, 3000);
            });
        },
        
        clear(){
            this.alertmsg = '';
            this.showalert = false;
            this.$router.push('/dashboard/product').catch(()=>{});
        },

    }
}
</script>