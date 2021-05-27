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
                    <th>Status</th>
                </tr>
                </thead>
                <tbody v-if="getpagerequest == 1">

                <tr v-for="(inquiry,index) in getpagedata" :key="index">
                    <td> {{inquiry.client_name}} </td>
                    <td> {{inquiry.email_address}} </td>
                    <td> {{inquiry.phone_number}} </td>
                    <td><span class="spnTooltip"><strong>{{inquiry.message}}</strong></span>{{inquiry.message.substr(0,30)}}... </td>
                    <td>
                        <label class="switch">
                            <input type="checkbox" :value="inquiry.status" :checked="checkchecked(inquiry.status)" @change="changestatus(inquiry.inquiry_id,inquiry.status)">
                            <span class="slider"></span>
                        </label>
                        <!-- <router-link :to="'/dashboard/inquiry/editinquiry/'+inquiry.inquiry_id"><i class="fa fa-edit fa-lg"></i></router-link>
                        <a class="ml-2" @click="deleteinquiry(inquiry.inquiry_id)"><i class="fa fa-trash fa-lg"></i></a> -->
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
        getuserid(){
          return this.$store.getters.getuserid;
        },
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
            this.$store.dispatch('setinquiryData',{id: this.getuserid } );
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
        fd.append('inquiry_id',tid);
        fd.append('status',status);

        console.log(status);

        axios.post('inquiry/updateinquirystatus',fd).then((result) => {
            this.$store.dispatch('setinquiryData',{id: this.getuserid } );
        });
        
        },
    
      // deleteinquiry(tid){
        //     this.$confirm("Are you sure you want to delete?").then(() => {
        //         axios.get('inquiry/deleteinquiry/'+tid).then((result) => {
        //             this.$store.dispatch('setinquiryData',{id:15} );
        //         });
        //     }).catch(()=>{
        //     });
        // }
    }

}
</script>


<style scoped>

a.tooltip {outline:none; }
a.tooltip strong {line-height:30px;}
a.tooltip:hover {text-decoration:none;} 
a.tooltip span {
    z-index:10;display:none; padding:20px 20px;
    margin-top:-30px; margin-left:28px;
    width:400px; line-height:16px;
}
a.tooltip:hover span{
    display:inline; position:absolute; color:#111;
    border:1px solid #DCA; background:#fffAF0;}
.callout {z-index:20;position:absolute;top:30px;border:0;left:-12px;}
    
/*CSS3 extras*/
a.tooltip span
{
    border-radius:4px;
    box-shadow: 5px 5px 8px #CCC;
}


tr .spnTooltip {
    z-index:10;display:none; padding:20px 20px;
    margin-top:-20px; margin-left:0px;
    width:650px; line-height:20px;
}
tr:hover .spnTooltip{
    display:inline; position:absolute; color:#111;
    border:1px solid #DCA; background:#fffAF0;}
.callout {z-index:20;position:absolute;top:30px;border:0;left:-12px;}





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