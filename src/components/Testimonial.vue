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
                    <th>Status</th>
                </tr>
                </thead>
                <tbody v-if="getpagerequest == 1">

                <tr v-for="(testimonial,index) in getpagedata" :key="index">
                    <td> {{testimonial.client_name}} </td>
                    <td> {{testimonial.email_address}} </td>
                    <td> {{testimonial.comment}} </td>
                    <td> {{testimonial.ratting}} </td>
                    <td>
                        <label class="switch">
                            <input id="testimonialstatus" type="checkbox" :value="testimonial.status" :checked="checkchecked(testimonial.status)" @change="changestatus(testimonial.testimonial_id,testimonial.status)">
                            <span class="slider"></span>
                        </label>
                        <!-- <router-link :to="'/dashboard/testimonial/edittestimonial/'+testimonial.testimonial_id"><i class="fa fa-edit fa-lg"></i></router-link>
                        <a class="ml-2" @click="deletetestimonial(testimonial.testimonial_id)"><i class="fa fa-trash fa-lg"></i></a> -->
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
            imgpath:this.$imgpath,
            status:0,
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
        return this.$store.getters.gettestimonialpagerequest;
      },
      getpagedata(){
        return this.$store.getters.gettestimonialdata;
      },
    },

    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        if(this.getpagerequest == 0){
          this.$store.dispatch('settestimonialData',{id: this.getuserid } );
        }
    },

    watch:{
        $route(){
            this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        }
    },


    methods:{

        checkchecked(status){
            if(status == 1){
                return 'true';
            }
            else{
                return '';
            }
        },

        changestatus(tid,status){
            if(status == 0){
                status  = 1;
            }
            else{
                status  = 0;
            }
        
        let fd = new FormData();
        fd.append('testimonial_id',tid);
        fd.append('status',status);

        axios.post('testimonial/updatetestimonialstatus',fd).then((result) => {
            this.$store.dispatch('settestimonialData',{id: this.getuserid } );
        });
        
        },

        // deletetestimonial(tid){
        //     this.$confirm("Are you sure you want to delete?").then(() => {
        //         axios.get('testimonial/deletetestimonial/'+tid).then((result) => {
        //             this.$store.dispatch('settestimonialData',{id: this.getuserid } );
        //         });
        //     }).catch(()=>{
        //     });
        // }
    }

}
</script>

<style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>