<template>
    <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<AdminDash />

		<div class=" right_sidebar_content"  v-if="getpagereq == 1">
			<div class="tabs-stage">

                <div class="expand_tabs">

                <router-link to="/admindashboard/socailmediaadd" type="button" class="btnBack site_btn btn_000 btncol"><i class="fas fa-arrow-left"></i>Back</router-link>

                    <div class="tab_title">
				        <div class="h2">Add Social Media Color Class</div>
			    	</div>

                    <form @submit.prevent="createsocialcolor()">
						<div class="row ">
                            <div class="form_field col-lg-10 col-md-10 col-sm-12 col-12 ">
                                <label class="" for="socialcolor">Social Media Color Class</label>
                                <input id="socialcolor" ref="socialcolor" name="socialcolor" class="" value="" type="text" placeholder="Enter Social Media Color Class" required="">
                            </div>
                        </div>
                        <button type="submit" class="form_btn btn_100 btn-left ">Save <i v-if="isloading" class="fas fa-spinner fa-pulse"></i></button>
                    </form>

                    <div class="mt-5">
                        <table class="table table-hover tablecontent">
                                <thead>
                                <tr>
                                    <th>SocialMedia Color</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>

                                <tr v-for="(social,index) in getpagedata" :key="index">
                                    <td class="form_field"> <input  type="text" v-model="socialdata[index].socialmedia_color_name"></td>
                                    <td>
                                        <a class="" @click="deletesocialcolor(social.socialmedia_color_id)"><i class="fa fa-trash ml-4 fa-lg"></i></a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <a class="btncol form_btn btn_100" @click="updatesocialcolors">Update <i v-if="isloadingupdate" class="fas fa-spinner fa-pulse"></i></a>
                    </div>

                </div>

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
    name:'SocialMediaColors',
    data(){
        return{
            socialdata:[],
            isloading:false,
            isloadingupdate:false
        }
    },
    components:{
        AdminDash
    },
    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        if(this.getcompanypagereq == 0){
            this.$store.dispatch('setsocialcolordata');
            this.$store.dispatch('setallsocialdata');
            this.$store.dispatch('setpagesdata');
            this.$store.dispatch('setallcompanydata');
            this.$store.dispatch('setuserreviewdata',{data:'all'});
        }
    },

    computed:{

        getpagereq(){
            return this.$store.getters.getsocialcolorsreq;
        },

        getpagedata(){
            let data =  this.$store.getters.getsocialcolors;
            this.socialdata = data;
            return data;
        },
        
        getcompanypagereq(){
            return this.$store.getters.getallcompanyreq;
        },
        
        

    },


    methods:{
        deletesocialcolor(sid){
            this.$confirm("Are you sure you want to delete?").then(() => {
                axios.get('company/deletesocialcolor/'+sid).then((res)=>{
                    this.$store.dispatch('setsocialcolordata');
                }).catch(()=>{
                    this.$swal.fire('Data Not Deleted','Error In Deletion' , 'error');
                });
            }).catch(()=>{
            });
        },

        async createsocialcolor(){
            this.isloading  = true;
            let fd = new FormData();
            fd.append('socialmedia_color_name',this.$refs.socialcolor.value);

            await axios.post('company/createsocialmediacolor',fd).then((result) => {
                this.$store.dispatch('setsocialcolordata');
                this.$swal.fire('Data Saved', result.data.message, 'success');
                this.$refs.socialcolor.value = '';
                this.isloading  = false;
            });
        },

        async updatesocialcolors(){
            this.isloadingupdate  = true;
            this.socialdata = [ ...new Set(this.socialdata) ];
            let fd = new FormData();
            
            fd.append('socialcolor_data',JSON.stringify(this.socialdata));
            
            await axios.post('company/updatesocialmediacolor',fd).then((result) => {
                this.$store.dispatch('setsocialcolordata');
                this.$swal.fire('Data Saved', result.data.message, 'success');
                this.isloadingupdate  = false;
            });
        },

    }

}

</script>


<style scoped>
    .btncol{
        color: white;
    }
</style>