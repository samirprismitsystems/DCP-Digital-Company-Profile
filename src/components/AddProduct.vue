<template>
    <div class="row justify-content-center mt-5">

        <div class="col-lg-8">
            
        <form @submit.prevent="addproductdata()" enctype="multipart/form-data" class="text-justify col-lg-10">
            
            <div class="form-group">
                <label>Product Image</label>
                <input id="imgchange" type="file" @change="changepic($event)">
                <img class="ml-3" v-show="showimg" :src="imgsrc" height="100" width="100">
            </div>
            
            <div class="form-group">
                <label>Product Name</label>
                <input type="text" name="cname" v-model="productdata.pname" class="form-control" placeholder="Enter Product name">
            </div>

            <div class="form-group">
                <label>Product Description</label>
                <textarea class="form-control" v-model="productdata.pdesc" name="cdesc" rows="4" cols="100" placeholder="Enter Product Description"></textarea>
            </div>

            <div class="form-group">
                <label>Product Price</label>
                <input type="number" name="cwhours" v-model="productdata.pprice" class="form-control" placeholder="Enter Product Price">
            </div>
            
            <button type="submit" class="btn btn-primary mb-4">Submit</button>
        </form>

            <div v-show="showalert" class="alert alert-success">{{alertmsg}}</div>


        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'AddProduct',
    data(){
        return{
            company_id:0,
            showimg:false,
            imgsrc:'',
            showalert:false,
            alertmsg:'',
            productdata:{
                pimage:'',
                pname:'',
                pdesc:'',
                pprice:''
            }
        }
    },

    created(){
        // this.$store.dispatch('setcompanydata',{id:1});
        // this.company_id = this.getcompanypagedata.company[0].company_id;
    },

    computed:{
        getpageinfo(){
          return this.$store.getters.getsitetitle;
        },
        getcompanypagerequest(){
          return this.$store.getters.getcompanypagerequest;
        },
        getcompanypagedata(){
          return this.$store.getters.getcompanydata;
        },
    },

    // watch:{
    //     getcompanypagedata(){
    //         this.company_id = this.getcompanypagedata.company[0].company_id;
    //     }
    // },

    methods:{
        
        changepic(event){
            this.productdata.pimage = event.target.files[0];
            this.imgsrc = URL.createObjectURL(this.productdata.pimage);
            this.showimg = true;
        },

        addproductdata(){
            let fd = new FormData();
            fd.append('product_name',this.productdata.pname);
            fd.append('product_desc',this.productdata.pdesc);
            fd.append('product_price',this.productdata.pprice);
            fd.append('product_image',this.productdata.pimage);
            fd.append('user_id',1);
            fd.append('isupdate',false);
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
        },

    }
}
</script>