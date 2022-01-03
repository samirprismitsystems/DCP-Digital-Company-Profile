<template>
    <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<AdminDash />

		<div class=" right_sidebar_content" v-if="getpagerequest == 1">
			<div class="tabs-stage">
                <div class="expand_tabs">

			    <div class="tab_title">
				    <div class="h2">Pages</div>
				    <div class="h4">Update page</div>
			    </div>

                <div class="row justify-content-center tabstyle"> 
                    <div class="col-lg-10 form_field">
                        <label class="" for="user_id">Page Name</label>
                        <input name="pagename" :value="getsinglepagedata.page_name" id="mainpagetitle" ref="pagename" type="text" placeholder="Enter Page Name" >
                    </div>
                </div>

                <Template1 :data="getsinglepagedata" v-if="templatename == 'default_template' " />
                <Template2 :data="getsinglepagedata" v-if="templatename == 'template2' " />
                <LandingPageTemplate :data="getsinglepagedata" v-if="templatename == 'landingpage_template' " />

                <div v-if="showmsg" class="alert alert-info">{{msg}}</div>

                
                </div>
            </div>
        </div>
        </div>
    </div>
    </section>
</template>

<script>
import AdminDash from './AdminDash'
import Template1 from './Template1.vue'
import Template2 from './Template2.vue'
import LandingPageTemplate from './LandingPageTemplate.vue'

export default {
    name:'EditPages',
    data(){
        return{
            templatename:'',
            showmsg:false,
            msg:'',
        }
    },

    computed:{
        getsinglepagedata(){
            let data =  this.$store.getters.getsinglepagedata(this.$route.params.pageslug);
            // console.log(data);
            if(data  != null ){
                this.templatename = data.template_name;
            }
            return data;
        },
        getpagerequest(){
            return this.$store.getters.getpagesrequest;
        },
    },

    components:{
        AdminDash,
        Template1,
        Template2,
        LandingPageTemplate
    },

    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        this.$store.dispatch('setpagesdata');
        this.getsinglepagedata;
    }

}
</script>