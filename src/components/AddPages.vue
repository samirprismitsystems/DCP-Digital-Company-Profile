<template>
     <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<AdminDash />

		<div class=" right_sidebar_content">
			<div class="tabs-stage">
                <div class="expand_tabs">

			    <div class="tab_title">
				    <div class="h2">Pages</div>
				    <div class="h4">Add Pages</div>
			    </div>
                
                <div class="row justify-content-center tabstyle">
                    
                    <div class="col-lg-4 form_field mr-5">
                        <label class="" for="">Page Name</label>
                        <input name="pagename" id="mainpagetitle" ref="pagename" type="text" placeholder="Enter Page Name" >
                    </div>
                    
                    <div class="col-lg-4 form_field">
                        <label class="" for="user_id">Select Page Template</label>
                        <select name="templatename" v-model="templatename" @change="showtemplate()" id="templatename">
                            <option value="default_template">Default Template</option>
                            <option value="template2">Template 2</option>
                            <option value="landingpage_template">Landing Page Template</option>
                        </select>
                    </div>
                </div>

                    <Template1 v-if="templatename == 'default_template' " />
                    <Template2 v-if="templatename == 'template2' " />
                    <LandingPageTemplate v-if="templatename == 'landingpage_template' " />

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
import Template1 from './Template1.vue'
import Template2 from './Template2.vue'
import LandingPageTemplate from './LandingPageTemplate.vue'
export default {
    name:'AddPages',
    components:{
        AdminDash,
        Template1,
        Template2,
        LandingPageTemplate
    },
    data(){
        return{
            templatename:''
        }
    },

    computed:{
    },

    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
    },

    methods:{
        showtemplate(){
        }
    },


}
</script>

<style scoped>
    .tabstyle{
        font-size: 15px;
    }
</style>