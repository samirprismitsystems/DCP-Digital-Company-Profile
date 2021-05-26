<template>
    <div class="row mt-5">
        
        <div class="col-lg-4 col-md-4 col-sm-4 col-12 mt-5">
            <ul class="menulist">
              <li><router-link :to="'/dashboard/product'">Product list<i class="fa fa-list fa-lg ml-4"></i></router-link></li>
              <li><router-link :to="'/dashboard/product/addproduct'">Add Product<i class="fa fa-plus fa-lg ml-4"></i></router-link></li>
            </ul>
          </div>


          <div class="col-md-8 col-sm-8 col-lg-8 col-8 mt-5">
            <div v-if="getpageinfo === 'Product'">
            
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Product Description</th>
                    <th>Product Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody v-if="getpagerequest == 1">              
                <tr v-for="(product,index) in getpagedata" :key="index">
                    <td> <img :src="imgpath+'15/products/'+product.product_image" height="100" width="100"></td>
                    <td>{{product.product_name}}</td>
                    <td>{{product.product_desc}}</td>
                    <td>{{product.product_price}}</td>
                    <td>
                        <router-link :to="'/dashboard/product/editproduct/'+product.product_id"><i class="fa fa-edit fa-lg"></i></router-link>
                        <a class="ml-2" @click="deleteproduct(product.product_id)"><i class="fa fa-trash fa-lg"></i></a>
                    </td>

                </tr>
                </tbody>
            </table>
            </div>

            <div v-else>
                <router-view></router-view>
            </div>
          
          </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Product',
    data(){
        return{
            product:[],
            imgpath:this.$imgpath
        }
    },
    computed:{
        getuserid(){
          return this.$store.getters.getuserid;
        },
        getpageinfo(){
          return this.$store.getters.getsitetitle;
        },
        getpagerequest(){
          return this.$store.getters.getproductpagerequest;
        },
        getpagedata(){
          return this.$store.getters.getproductdata;
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
            this.$store.dispatch('setproductdata',{id: this.getuserid });
        }
    },

    methods:{
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