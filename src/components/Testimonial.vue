<template>
    <div class="row mt-5 justify-content-center">
    
          <div class="col-md-8 col-sm-8 col-lg-8 col-8 mt-5">
            
              
            <table class="table table-hover" v-if="getpageinfo == 'Testimonial'">
                <thead>
                <tr>
                    <th>Client Name</th>
                    <th>Client Email</th>
                    <th>Comment</th>
                    <th>Ratting</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody v-if="getpagerequest == 1">

                <tr v-for="(testimonial,index) in getpagedata" :key="index">
                    <td> {{testimonial.client_name}} </td>
                    <td> {{testimonial.email_address}} </td>
                    <td> {{testimonial.comment}} </td>
                    <td> {{testimonial.ratting}} </td>
                    <td>
                        <router-link :to="'/dashboard/testimonial/edittestimonial/'+testimonial.testimonial_id"><i class="fa fa-edit fa-lg"></i></router-link>
                        <a class="ml-2" @click="deletetestimonial(testimonial.testimonial_id)"><i class="fa fa-trash fa-lg"></i></a>
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
          return this.$store.getters.gettestimonialpagerequest;
        },
        getpagedata(){
          return this.$store.getters.gettestimonialdata;
        },
    },

    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        if(this.getpagerequest == 0){
            this.$store.dispatch('settestimonialData',{id:15} );
        }
    },

    watch:{
        $route(){
            this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        }
    },


    methods:{
        deletetestimonial(tid){
            this.$confirm("Are you sure you want to delete?").then(() => {
                axios.get('testimonial/deletetestimonial/'+tid).then((result) => {
                    this.$store.dispatch('settestimonialData',{id:15} );
                });
            }).catch(()=>{
            });
        }
    }

}
</script>