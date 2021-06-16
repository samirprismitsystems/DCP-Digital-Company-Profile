<template>
    <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<DashData />

		<div class=" right_sidebar_content" v-if="getpagerequest == 1 && getcompanyid != ''">
			<div class="tabs-stage">

        <button type="button" class="btnBack  site_btn btn_000"><i class="fas fa-arrow-left"></i>Back</button>
			      	<div class="tab_title">
				        <div class="h2">Testimonials</div>
				        <div class="h4">Testimonials Data</div>
			    	</div>
    
    <div class="row mt-5 justify-content-center">
      <div class="col-md-10 col-sm-12 col-lg-10 col-12 mt-5 table-responsive">
              
            <table class="table table-hover tablecontent">
                <thead>
                <tr>
                    <th>Client Name</th>
                    <th>Client Email</th>
                    <th>Comment</th>
                    <th>Ratting</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>

                <tr v-for="(testimonial,index) in gettestimonialdata" :key="index">
                    <td> {{testimonial.client_name}} </td>
                    <td> {{testimonial.email_address}} </td>
                    <td><span class="spnTooltip"><strong>{{testimonial.comment}}</strong></span>{{testimonial.comment.substr(0,30)}}... </td>
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

                <tr v-if="gettestimonialdata == ''">
                  <td colspan="5" class="text-center">No Record Found</td>
                </tr>

                </tbody>
            </table>


            <nav aria-label="Page navigation example" v-if="gettestimonialdata != ''">
              <ul class="pagination pagination-lg justify-content-center">
                
                <li class="page-item navcontent" v-if="pagenumber != 1">
                  <a class="page-link" @click="changepage(pagenumber-1)">Previous</a>
                </li>

                <li v-for="(page,index) in totalpages" :key="index" :class="checknavclass(page,pagenumber)"><a class="page-link" @click="changepage(page)"> {{page}} </a></li>
                
                <li class="page-item navcontent"  v-if="pagenumber != totalpages">
                  <a class="page-link" @click="changepage(pagenumber+1)">Next</a>
                </li>
              </ul>
            </nav>

          </div>
    </div>
    
      </div>
    </div>
    </div>
  </div>
    </section>
</template>

<script>
import DashData from './DashData'
import axios from 'axios'
export default {
    name:'Testimonial',
    data(){
        return{
            imgpath:this.$imgpath,
            status:0,
            totaldata:0,
            perpage:2,
            totalpages:0,
            pagenumber:1
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
        return this.$store.getters.gettestimonialpagerequest;
      },
      getpagedata(){
        let data = this.$store.getters.gettestimonialdata;
        if(data.length != 0 && this.getcompanyid != ''){
          this.totaldata = data.length;
          this.totalpages = Math.ceil(data.length / this.perpage);
          // console.log(this.totalpages);
        }
        return data;
      },

      gettestimonialdata(){
        let data = this.getpagedata;
        return this.$store.getters.gettestimonialpage(this.pagenumber);
      }
    },

    created(){
        if(this.getcompanyid == ''){
          this.$router.push('/dashboard/company');
        }
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        if(this.getpagerequest == 0){
            this.$store.dispatch('setcompanydata',{id: this.getuserid});
            this.$store.dispatch('setallsocialdata');
            this.$store.dispatch('setsocialdata',{id: this.getuserid});
            this.$store.dispatch('setcitiesdata');
            this.$store.dispatch('setproductdata',{id: this.getuserid });
            this.$store.dispatch('setservicedata',{id: this.getuserid });
            this.$store.dispatch('setClientData',{id: this.getuserid } );
            this.$store.dispatch('setportfolioData',{id: this.getuserid });
            this.$store.dispatch('settestimonialData',{id: this.getuserid } );
            this.$store.dispatch('setinquiryData',{id: this.getuserid } );
            this.$store.dispatch('setpaymentoptions',{id:this.getuserid});
        }
    },

    watch:{
        $route(){
            this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        }
    },


    methods:{

      checknavclass(index,page){
        if(index == page){
          return 'page-item navcontent active';
        }
        else{
          return 'page-item navcontent';
        }
      },

      changepage(page){
        this.pagenumber = page;
      },

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

<style scoped>

.tablecontent{
  font-size: 14px;
}

.navcontent{
  font-size: 20px;
  /* margin: 10px 10px 10px 10px; */
}

a.tooltip {outline:none; }
a.tooltip strong {line-height:30px;}
a.tooltip:hover {text-decoration:none;} 
a.tooltip span {
    z-index:10;display:none; padding:20px 20px;
    margin-top:40px; margin-left:0px;
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
    margin-top:40px; margin-left:0px;
    width:570px; line-height:20px;
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