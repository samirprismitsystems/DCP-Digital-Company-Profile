<template>
    <div class="row mt-5">
    
        <div class="col-lg-4 col-md-4 col-sm-4 col-12 mt-5">
            <ul class="menulist">
              <li><router-link :to="'/dashboard/client'">Client list<i class="fa fa-list fa-lg ml-4"></i></router-link></li>
              <li><router-link :to="'/dashboard/client/addclient'">Add Client<i class="fa fa-plus fa-lg ml-4"></i></router-link></li>
            </ul>
          </div>


          <div class="col-md-8 col-sm-8 col-lg-8 col-8 mt-5">
            <div v-if="getpageinfo === 'Client'">

            <table class="table table-hover">
                <thead>
                <tr>
                    <th>Client Logo</th>
                    <th>Client Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody v-if="getpagerequest == 1">

                <tr v-for="(client,index) in getpagedata" :key="index">
                    <td> <img :src="imgpath+'15/clients/'+client.client_logo" height="100" width="100"></td>
                    <td>{{client.client_name}}</td>
                    <td>
                        <router-link :to="'/dashboard/client/editclient/'+client.client_id"><i class="fa fa-edit fa-lg"></i></router-link>
                        <a class="ml-2" @click="deleteclient(client.client_id)"><i class="fa fa-trash fa-lg"></i></a>
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
    name:'Client',
    data(){
        return{
            imgpath:this.$imgpath
        }
    },
    computed:{
        getpageinfo(){
          return this.$store.getters.getsitetitle;
        },
        getpagerequest(){
          return this.$store.getters.getclientpagerequest;
        },
        getpagedata(){
          return this.$store.getters.getclientdata;
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
            this.$store.dispatch('setClientData',{id:15} );
        }
    },

    methods:{
        deleteclient(cid){
            this.$confirm("Are you sure you want to delete?").then(() => {
                // let fd = new FormData();
                // fd.append('product_id',);
                axios.get('client/deleteclient/'+cid).then((res)=>{
                    this.$store.dispatch('setClientData',{id:15});
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