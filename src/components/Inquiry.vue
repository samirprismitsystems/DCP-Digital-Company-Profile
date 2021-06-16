<template>

  <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<DashData />

		<div class=" right_sidebar_content" v-if="getpagerequest == 1 && getcompanyid != ''">
			<div class="tabs-stage">

        <button type="button" class="btnBack  site_btn btn_000"><i class="fas fa-arrow-left"></i>Back</button>
			      	<div class="tab_title">
				        <div class="h2">Inquiry Details</div>
				        <div class="h4">Inquiry From Users</div>
			    	</div>

    <div class="row mt-5 justify-content-center">
    
          <div class="col-md-10 col-sm-12 col-lg-10 col-12 mt-5 table-responsive">
            
            <table class="table table-hover tablecontent table-nonfluid">
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

                <tr v-for="(inquiry,index) in getinquirypagedata" :key="index">
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

                <tr v-if="getinquirypagedata == ''">
                  <td colspan="5" class="text-center">No Record Found</td>
                </tr>

                </tbody>
            </table>


            <nav aria-label="Page navigation example" v-if="getinquirypagedata != ''">
              <ul class="pagination pagination-lg justify-content-center">
                
                <li class="page-item navcontent" v-if="pagenumber != 1">
                  <a class="page-link" @click="changepage(pagenumber-1)" tabindex="-1">Previous</a>
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
          return this.$store.getters.getinquirypagerequest;
        },
        getpagedata(){
          let data =  this.$store.getters.getinquirydata;
          if(data.length != 0 && this.getcompanyid != ''){
            this.totaldata = data.length;
            this.totalpages = Math.ceil(data.length / this.perpage);
            // console.log(this.totalpages);
          }
          return data;
        },

        getinquirypagedata(){
          let data = this.getpagedata;
          return this.$store.getters.getinquirypage(this.pagenumber);
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


.tablecontent{
  font-size: 14px;
}

a.tooltip {outline:none; }
a.tooltip strong {line-height:30px;}
a.tooltip:hover {text-decoration:none;} 
a.tooltip span {
    z-index:10;display:none; padding:20px 20px;
    margin-top:30px; margin-left:28px;
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
    width:400px; line-height:20px;
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