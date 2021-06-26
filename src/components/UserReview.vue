<template>
   <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<AdminDash />

		<div class=" right_sidebar_content">
			<div class="tabs-stage">
                <div class="expand_tabs" v-if="getpagerequest == 1 ">
                        
			        <router-link to="/admindashboard/pages" class="btnBack site_btn btn_000 btncol"><i class="fas fa-arrow-left"></i>Back</router-link>
                    <div class="tab_title">
				        <div class="h2">User Review</div>
				        <div class="h4">Add Or Update User Review</div>
			    	</div>

                    <router-link to="/admindashboard/adduserreview" type="button" class="btnBack site_btn btn_000 btncol"><i class="fas fa-plus"></i>Add Review</router-link>

                   <div class="row mt-5 justify-content-center">
                    <div class="col-md-10 col-sm-12 col-lg-10 col-12 mt-5 table-responsive">

                        <table class="table table-hover tablecontent">
                                <thead>
                                <tr class="text-center">
                                    <th>Customer Name</th>
                                    <th>Review</th>
                                    <th>Edit</th>
                                    <th>Active/Inactive</th>
                                </tr>
                                </thead>
                                <tbody>

                                <tr v-for="(review,index) in getuserreviewdata" :key="index">
                                    <td> {{review.user_name}} </td>
                                    <td> {{review.user_message}} </td>
                                    <td>
                                        <router-link :to="'/admindashboard/edituserreview/'+review.review_id" class="" ><i class="fa fa-edit fa-lg"></i></router-link>
                                    </td>
                                    <td>
                                        <label class="switch ml-4">
                                            <input id="companystatus" type="checkbox" :value="review.status" :checked="checkchecked(review.status)" @change="changestatus(review.review_id,review.status)">
                                             <span class="slider"></span>
                                        </label>
                                    </td>
                                </tr>

                                </tbody>
                            </table>

                            
                        
                            <nav aria-label="Page navigation example" v-if="getuserreviewdata != ''">
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

            <div class="form_btn_field float-right mt-5">
				<router-link to="/admindashboard/setting"  class=" btnNext form_btn btn_100 mt-5 btncol">Next</router-link>
			</div>


        </div>
        </div>
    </div>
    </section>
</template>

<script>
import axios from 'axios'
import AdminDash from './AdminDash'
export default {
    name:'UserReview',

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
        AdminDash
    },

    computed:{

    getpagerequest(){
        return this.$store.getters.getuserreviewrequest;
    },
     getpagedata(){
        let data = this.$store.getters.getuserreviewdata;
        if(data.length != 0 && this.getcompanyid != ''){
          this.totaldata = data.length;
          this.totalpages = Math.ceil(data.length / this.perpage);
        }
        return data;
      },

      getuserreviewdata(){
        let data = this.getpagedata;
        return this.$store.getters.getuserreviewlist(this.pagenumber);
      }
    
    },

    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        if(this.getpagerequest == 0){
            this.$store.dispatch('setuserreviewdata',{data:'all'});
            this.$store.dispatch('setsocialcolordata');
            this.$store.dispatch('setpagesdata');
            this.$store.dispatch('setallcompanydata');
            this.$store.dispatch('setallsocialdata');
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

        changestatus(rid,status){
            if(status == 0){
                status  = 1;
            }
            else{
                status  = 0;
            }
        
        let fd = new FormData();
        fd.append('review_id',rid);
        fd.append('status',status);

        axios.post('user/updatereviewstatus',fd).then((result) => {
            this.$store.dispatch('setuserreviewdata');
        });
        
        },

    }

}
</script>

<style scoped>

.btncol{
  color: white;
}

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
/* .slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
} */

</style>