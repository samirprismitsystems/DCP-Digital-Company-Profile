<template>
    <div class="mt-5">
        <h2 class="mt-4"></h2>
        
            <form class="mt-5" @submit.prevent="savepage()">
                <div class="form_field">
                    <label class="" for="user_id">Page Title</label>
                    <input type="text" v-if=" data != null" v-model="data.page_content.page_title" id="pagetitle" ref="pagetitle" name="pagetitle" class="" placeholder="Enter Page Title" required="">
                    <input type="text" v-else id="pagetitle" ref="pagetitle" name="pagetitle" class="" placeholder="Enter Page Title" required="">
                </div>

                <div class="form_field">
                    <label class="" for="user_id">Page Content</label>
                    <!-- <textarea rows="5" v-if=" data!= null" v-model="pagecontent[1].page_content" id="content" ref="content" name="content" class="" placeholder="Enter Page Content" required=""></textarea>
                    <textarea rows="5" v-else id="content" ref="content" name="content" class="" placeholder="Enter Page Content" required=""></textarea> -->
                    <vue-editor v-if=" data != null" v-model="data.page_content.page_content" ref="content" name="content" class="" placeholder="Enter Page Content" required=""></vue-editor>
                    <vue-editor v-else v-model="content"  ref="content" name="content" class="" placeholder="Enter Page Content" required=""></vue-editor>

                    <!-- <wysiwyg v-if=" data != null" v-model="data.page_content.page_content" ref="content" name="content" class="" placeholder="Enter Page Content" required="" />
                    <wysiwyg v-else v-model="content"  ref="content" name="content" class="" placeholder="Enter Page Content" required="" /> -->
                
                </div>

                <h2 class="mt-5">SEO Section</h2>

                <div class="form_field col-xl-3 col-lg-4 col-md-5 col-sm-5 col-10 logo-col private_img_col mt-3">
                    <div class="upload_private_img_box logo_img_box">
                        <div v-if="imgsrc == ''" class="upload_here">
                            <img id="get_img" class="upload_img" src="" alt="image" style="display: none;" />
                                <div class="placeholder_tex">
                                    <h3>Please Upload Meta Image</h3>
                                </div>
                        </div>

                        <div v-else class="upload_here">
                            <img id="get_img" class="upload_img" :src="imgsrc" alt="image" />
                        </div>

                        <p class="red" >Image Required* 250KB max size</p>
                            <div class="upload_btn btn_100 site_btn mb-0 w-100">
                                <input type='file' @change="changepic" class="choose" />
                                    Upload Meta Image
                            </div>
                    </div>
                 </div>


                <div class="form_field">
                    <label class="" for="user_id">Meta Title</label>
                    <input type="text" v-if=" data != null" v-model="getsinglepagedata.meta_title" id="metatitle" ref="metatitle" name="metatitle" class="" placeholder="Enter Meta Title" required="">
                    <input type="text" v-else id="metatitle" ref="metatitle" name="metatitle" class="" placeholder="Enter Meta Title" required="">
                </div>

                <div class="form_field">
                    <label class="" for="user_id">Meta Description</label>
                    <textarea rows="5" v-if=" data != null" v-model="getsinglepagedata.meta_description" id="metadesc" ref="metadesc" name="metadesc" class="" placeholder="Enter Meta Description" required=""></textarea>
                    <textarea rows="5" v-else id="metadesc" ref="metadesc" name="metadesc" class="" placeholder="Enter Meta Description" required=""></textarea>
                </div>

                <div class="form_field">
                    <label class="" for="user_id">Meta Keywords</label>
                    <textarea rows="5" v-if=" data != null" v-model="getsinglepagedata.meta_keywords" id="metakey" ref="metakey" name="metakey" class="" placeholder="Enter Meta Keywords" required=""></textarea>
                    <textarea rows="5" v-else id="metakey" ref="metakey" name="metakey" class="" placeholder="Enter Meta Keywords" required=""></textarea>
                </div>

                <button type="submit" class="form_btn btn_100">Save <i v-if="isloading" class="fas fa-spinner fa-pulse"></i></button>
            </form>
            
    </div>

</template>

<script>
import axios from 'axios'
import Vue from 'vue'
// import wysiwyg from "vue-wysiwyg";
// Vue.use(wysiwyg, {});
// import "vue-wysiwyg/dist/vueWysiwyg.css";
import { VueEditor } from "vue2-editor";

export default {
    name:'Template1',
     data(){
        return{
            pagecontent:[],
            isupdate:false,
            content:'',
            metaimg:null,
            imgsrc:'',
            ischangepic:false,
            isdata:0,
            isloading:false,
        }
    },

    components:{
        VueEditor
    },

    computed:{
        getsinglepagedata(){
            let data =  this.$store.getters.getsinglepagedata(this.$route.params.pageslug);
            if(data != null){
                this.imgsrc = this.$imgpath + 'metaimg/' + data.meta_image;
            }
            return data;
        },
        getpagerequest(){
            return this.$store.getters.getpagesrequest;
        },
    },

    created(){
        if(this.data != null && this.data != ''){
            this.isupdate = true;
        }
    },

    props:{
        data:{

        }
    },

    methods:{

        changepic(event){
            this.metaimg = event.target.files[0];
            this.imgsrc = URL.createObjectURL(this.metaimg);
            this.ischangepic = true;
        },


        savepage(){
            this.isloading  = true;

            let fd = new FormData();
            
            let slug = $('#mainpagetitle').val().replace(/[^a-zA-Z ]/g, "");
            let nslug = slug.replace(" ","-").replace(/\s+/g, '').toLowerCase();
            
            fd.append('page_slug',nslug);
            fd.append('meta_title',this.$refs.metatitle.value);
            fd.append('meta_description',this.$refs.metadesc.value);
            fd.append('meta_keywords',this.$refs.metakey.value);
            fd.append('page_name',$('#mainpagetitle').val());

            
            if(this.ischangepic == true){
                fd.append('meta_image',this.metaimg);
            }
            else{
                fd.append('meta_image_name',this.getsinglepagedata.meta_image);
            }

            if(this.isupdate == true){
                fd.append('template_name', this.data.template_name );
                fd.append('page_id', this.data.page_id );
            }
            else{
                fd.append('template_name',$('#templatename').val());
            }
            fd.append('isupdate',this.isupdate);

            fd.append('page_title',this.$refs.pagetitle.value);
            fd.append('page_content',this.$refs.content.value);

            axios.post('pages/createpage',fd).then((result) => {
                this.$swal.fire('Data Saved', result.data.message , 'success');    
                this.isloading  = false;
                setTimeout(() => {
                    this.$router.push('/admindashboard/pages');
                }, 500);
            });


        }
    },

}
</script>