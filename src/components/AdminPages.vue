<template>
     <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<AdminDash />

		<div class=" right_sidebar_content" v-if="getpagerequest == 1">
			<div class="tabs-stage">
                <div class="expand_tabs">

                <router-link to="/admindashboard/socailmediaadd" type="button" class="btnBack site_btn btn_000 btncol"><i class="fas fa-arrow-left"></i>Back</router-link>
			    <div class="tab_title">
				    <div class="h2">Pages</div>
				    <div class="h4">Add or Update pages</div>
			    </div>
                
                <router-link to="/admindashboard/addpages" type="button" class="btnBack site_btn btn_000 btncol"><i class="fas fa-plus"></i>Add Pages</router-link>

                <div class="row mt-5 justify-content-center">
                    <div class="col-md-12 col-sm-12 col-lg-12 col-12 mt-5">

                        <table class="table table-hover tablecontent">
                            <thead>
                            <tr>
                                <th>Page Name</th>
                                <!-- <th>Page Slug</th> -->
                                <th>Template Name</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            
                            <tr v-for="(page,index) in getpagedata" :key="index">
                                <td> {{page.page_name}} </td>
                                <!-- <td>  {{page.page_slug}} </td> -->
                                <td> {{ ucfirst(page.template_name) }} </td>
                                <td>
                                    <router-link :to="'/admindashboard/editpage/'+page.page_slug" ><i class="fa fa-edit fa-lg"></i></router-link>
                                    <a @click="deletepage(page.page_id)"><i class="fa fa-trash fa-lg ml-3"></i></a>
                                </td>
                            </tr>

                            <tr class="text-center" v-if="getpagedata.length == 0">
                                <td colspan="3">No Record Found</td>
                            </tr>

                            </tbody>
                        </table>

                    </div>
                </div>
                </div>
            </div>


             <div class="form_btn_field float-right mt-5">
				<router-link to="/admindashboard/userreview"  class=" btnNext form_btn btn_100 mt-5 btncol">Next</router-link>
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
    name:'AdminPages',
    components:{
        AdminDash
    },
    data(){
        return{
            sitelogo:null,
            imgsrc:'',
            ischangepic:false,
            msg:'',
            showmsg:false,
            content:[]
        }
    },

    computed:{
        getpagedata(){
            let data =  this.$store.getters.getpagesdata; 
            return data;
        },
        getpagerequest(){
            return this.$store.getters.getpagesrequest;
        },
        getcompanypagereq(){
            return this.$store.getters.getallcompanyreq;
        },
    },

    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        if(this.getcompanypagereq == 0){
            this.$store.dispatch('setpagesdata');
            this.$store.dispatch('setallcompanydata');
            this.$store.dispatch('setallsocialdata');
            this.$store.dispatch('setuserreviewdata',{data:'all'});
        }
    },

    methods:{
        ucfirst(str) {
            var firstLetter = str.substr(0, 1);
            return (firstLetter.toUpperCase() + str.substr(1)).replace("_"," ") ;
        },

        deletepage(pid){
            this.$confirm("Are you sure you want to delete?").then(() => {
                axios.get('pages/deletepage/'+pid).then(()=>{
                    this.$store.dispatch('setpagesdata');
                });
            });
        },

    },


}
</script>

<style scoped>
    .tabstyle{
        font-size: 15px;
    }
    .btncol{
        color: white;
    }
</style>