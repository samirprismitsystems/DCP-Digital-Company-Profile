<template>
     <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<AdminDash />

		<div class=" right_sidebar_content" v-if="getpagerequest == 1">
			<div class="tabs-stage">
                <div class="expand_tabs">
                
                <router-link to="/admindashboard/pages" type="button" class="btnBack site_btn btn_000 btncol"><i class="fas fa-arrow-left"></i>Back</router-link>
			    <div class="tab_title">
				    <div class="h2">Website Setting</div>
				    <div class="h4">Change Website Settings</div>
			    </div>

                <div class="row mt-5 justify-content-center">
                    <div class="col-md-12 col-sm-12 col-lg-12 col-12 mt-5">

                        <ul class="nav nav-tabs tabstyle" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#site" role="tab">Site Setting</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#gcode" role="tab">Google Analytics Code</a>
                            </li>
                            
                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div class="tab-pane active" id="site" role="tabpanel">
                                <h2 class="mt-4">Site Setting</h2>
                                
                                <form class="mt-5 form_shadow" @submit.prevent="savesitesetting()">
                                    
                                    <div class="form_field col-xl-3 col-lg-4 col-md-5 col-sm-5 col-10 logo-col private_img_col">
                                        <div class="upload_private_img_box logo_img_box">
                                            
                                            <div v-if="imgsrc == ''" class="upload_here">
                                                <img id="get_img" class="upload_img" src="" alt="image" style="display: none;" />
                                                <div class="placeholder_tex">
                                                    <h3>Please Upload Site Logo</h3>
                                                    <h2>LOGO</h2>
                                                </div>
                                            </div>

                                            <div v-else class="upload_here">
                                                <img id="get_img" class="upload_img" :src="imgsrc" alt="image" />
                                            </div>

                                            <p class="red" >Image Required* 250KB max size</p>
                                            <div class="upload_btn btn_100 site_btn mb-0 w-100">
                                                <input type='file' @change="changepic" class="choose" />
                                            Upload logo file
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form_field">
                                        <label class="" for="user_id">Site Title</label>
                                        <input id="sitetitle" v-if="getpagedata[1].setting_name == 'site_title'" :value="getpagedata[1].setting_value" ref="sitetitle" name="sitetitle" class="" type="text" placeholder="Enter Site Title" required="">
                                    </div>

                                    <div class="form_field">
                                        <label class="" for="user_id">Site Description</label>
                                        <textarea rows="5" v-if="getpagedata[2].setting_name == 'site_desc'" :value="getpagedata[2].setting_value" id="sitedesc" ref="sitedesc" name="sitedesc" class="" placeholder="Enter Site Description" required=""></textarea>
                                    </div>

                                    <div class=" form_field">
                                        <label class="">Site Email Address</label>
                                        <input name="siteemail" v-if="getpagedata[8].setting_name == 'site_email'" :value="getpagedata[8].setting_value" ref="siteemail" class="" type="text" placeholder="Add Site Email Address" >
                                    </div>

                                     <!-- <div class="form_field">
                                        <label class="" for="">Select Footer Pages</label>
                                        <select name="pagelist" v-model="pagelist" id="pagelist" multiple>
                                            <option :value="page.page_id" v-for="(page,index) in getpagesdata" :key="index">{{page.page_name}}</option>
                                        </select>
                                    </div> -->

                                    <div class="form_field">
                                        <label class="" for="">Select Footer Pages</label>
                                        <Select2 v-model="pagelist" :options="options" :settings="{ allowClear: true, placeholder: 'Select Footer Pages', multiple:true}" />   
                                    </div>


                                    <div class=" form_field">
                                        <label class="label_icon"><i class="fab fa-facebook-f"></i>Facebook</label>
                                        <input name="facebookurl" v-if="getpagedata[3].setting_name == 'facebookurl'" :value="getpagedata[3].setting_value" ref="facebookurl" class="" type="text" placeholder="Add Facebook URL" >
                                    </div>

                                    <div class=" form_field">
                                        <label class="label_icon"><i class="fab fa-instagram"></i>Instagram</label>
                                        <input name="instaurl" v-if="getpagedata[4].setting_name == 'instaurl'" :value="getpagedata[4].setting_value" ref="instaurl" class="" type="text" placeholder="Add Instagram URL" >
                                    </div>

                                    <div class=" form_field">
                                        <label class="label_icon"><i class="fab fa-linkedin-in"></i>Linkedin</label>
                                        <input name="linkedurl" v-if="getpagedata[5].setting_name == 'linkedurl'" :value="getpagedata[5].setting_value" ref="linkedurl" class="" type="text" placeholder="Add Linkedin URL" >
                                    </div>

                                    

                                    <button type="submit" class="form_btn btn_100">Save <i v-if="isloading" class="fas fa-spinner fa-pulse"></i></button>
                                </form>
                            </div>

                            <div class="tab-pane" id="gcode" role="tabpanel">

                                <h2 class="mt-4">Google Analytics Code</h2>
                                
                                <form class="mt-5 form_shadow" @submit.prevent="savegoogleanalytics()">
                                    <div class="form_field">
                                        <label class="" for="user_id">Before Body Tag</label>
                                        <textarea rows="5" v-if="getpagedata[6].setting_name == 'before_body_ganalytics'" :value="getpagedata[6].setting_value" id="beforebody" ref="beforebody" name="beforebody" class="" placeholder="Before Body Tag Analytics Code" required=""></textarea>
                                    </div>

                                    <div class="form_field">
                                        <label class="" for="user_id">After Body Tag</label>
                                        <textarea rows="5" v-if="getpagedata[7].setting_name == 'after_body_ganalytics'" :value="getpagedata[7].setting_value" id="afterbody" ref="afterbody" name="afterbody" class="" placeholder="After Body Tag Analytics Code" required=""></textarea>
                                    </div>
                                    <button type="submit" class="form_btn btn_100">Save <i v-if="isloadingga" class="fas fa-spinner fa-pulse"></i></button>
                                </form>

                            </div>


                        </div>

                    </div>
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
// import vSelect from "vue-select";
// import "vue-select/dist/vue-select.css";

export default {
    name:'Setting',
    components:{
        AdminDash,
        // vSelect
    },
    data(){
        return{
            getdata:[],
            options:[],
            sitelogo:null,
            imgsrc:'',
            ischangepic:false,
            pagelist:[],
            isloading:false,
            isloadingga:false,
        }
    },

    computed:{
        getpagesdata(){
            let data =  this.$store.getters.getpagesdata;
            data.forEach(element => {
                let obj = {
                    id:element.page_id,
                    text:element.page_name
                };
                this.options.push(obj);
            });
            
            return data;
        },
        getpagesrequest(){
            return this.$store.getters.getpagesrequest;
        },

        getpagedata(){
            let data =  this.$store.getters.getsettingdata;
            if(data.length != 0){
                this.getpagesdata;
                this.imgsrc = this.$imgpath+'setting/'+ data[0].setting_value;
                this.pagelist = JSON.parse(data[9].setting_value);
            }
            return data;
        },
        getpagerequest(){
            return this.$store.getters.getsettingrequest;
        },
        getcompanypagereq(){
            return this.$store.getters.getallcompanyreq;
        }
    },

    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        if(this.getcompanypagereq == 0){
            this.$store.dispatch('setpagesdata');
            this.$store.dispatch('setsocialcolordata');
            this.$store.dispatch('setallcompanydata');
            this.$store.dispatch('setallsocialdata');
            this.$store.dispatch('setuserreviewdata',{data:'all'});
            // this.getpagesdata;
        }
    },

    methods:{

    savesitesetting(){
        this.isloading = true;
        // console.log(this.pagelist);

        let fd = new FormData();
        if(this.ischangepic == true){
            fd.append('site_logo',this.sitelogo);
        }
        else{
            fd.append('logo',this.getpagedata[0].setting_value);
        }

        fd.append('site_title',this.$refs.sitetitle.value);
        fd.append('site_desc',this.$refs.sitedesc.value);
        fd.append('site_email',this.$refs.siteemail.value);
        fd.append('footer_pages',JSON.stringify(this.pagelist));
        fd.append('facebookurl',this.$refs.facebookurl.value);
        fd.append('instaurl',this.$refs.instaurl.value);
        fd.append('linkedurl',this.$refs.linkedurl.value);

        axios.post('sitesetting/savesetting',fd).then((result) => {
            this.$store.dispatch('setsettingdata');
            this.$swal.fire('Data Saved', result.data.message, 'success');
            this.isloading = false;
        });
    },

    savegoogleanalytics(){
        this.isloading = true;
        let fd = new FormData();
        fd.append('before_body',this.$refs.beforebody.value);
        fd.append('after_body',this.$refs.afterbody.value);
        
        axios.post('sitesetting/savegoogleanalytics',fd).then((result) => {
            this.$store.dispatch('setsettingdata');
            this.$swal.fire('Google Analytics Data Saved', result.data.message, 'success');
            this.isloading = false;
        });
    },

    changepic(event){
        this.sitelogo = event.target.files[0];
        this.imgsrc = URL.createObjectURL(this.sitelogo);
        this.ischangepic = true;
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