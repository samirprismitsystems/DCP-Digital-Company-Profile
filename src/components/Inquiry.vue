<template>
    <div class="row mt-5 justify-content-center">
    
          <div class="col-md-8 col-sm-8 col-lg-8 col-8 mt-5">
            
              
            <table class="table table-hover" v-if="getpageinfo == 'Inquiry'">
                <thead>
                <tr>
                    <th>Client Name</th>
                    <th>Client Email</th>
                    <th>Phone Number</th>
                    <th>Message</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody v-if="getpagerequest == 1">

                <tr v-for="(inquiry,index) in getpagedata" :key="index">
                    <td> {{inquiry.client_name}} </td>
                    <td> {{inquiry.email_address}} </td>
                    <td> {{inquiry.phone_number}} </td>
                    <td> {{inquiry.message}} </td>
                    <td>
                        <router-link :to="'/dashboard/inquiry/editinquiry/'+inquiry.inquiry_id"><i class="fa fa-edit fa-lg"></i></router-link>
                        <a class="ml-2" @click="deleteinquiry(inquiry.inquiry_id)"><i class="fa fa-trash fa-lg"></i></a>
                    </td>
                </tr>

                </tbody>
            </table>

            <div v-else>
                <router-view></router-view>
            </div>
            
          
          </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Testimonial',
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
          return this.$store.getters.getinquirypagerequest;
        },
        getpagedata(){
          return this.$store.getters.getinquirydata;
        },
    },

    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        if(this.getpagerequest == 0){
            this.$store.dispatch('setinquiryData',{id:15} );
        }
    },

    watch:{
        $route(){
            this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        }
    },

    methods:{
        deleteinquiry(tid){
            this.$confirm("Are you sure you want to delete?").then(() => {
                axios.get('inquiry/deleteinquiry/'+tid).then((result) => {
                    this.$store.dispatch('setinquiryData',{id:15} );
                });
            }).catch(()=>{
            });
        }
    }

}
</script>