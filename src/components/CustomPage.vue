<template>
      <section class="main">
	 <div class="container-fluid ">
		<div class="row no-wrap">
		<!--<div class=" right_sidebar_content">
			<div class="tabs-stage">
                <div class="expand_tabs" v-if="isdata == 1"> -->

                <div class="row justify-content-center tabstyle">

                    <Template1Design :data="this.pagedata" v-if="templatename == 'default_template' " />
                    <Template2Design :data="this.pagedata" v-if="templatename == 'template2' " />

                </div>

                <!-- </div>
            </div>
        </div>-->
        </div>
    </div> 
    </section>
</template>

<script>
import axios from 'axios'
import Template1Design from './Template1Design'
import Template2Design from './Template2Design'
import LandingPageTemplate from './LandingPageTemplate'
export default {
    name:'CustomPage',
    data(){
        return{
            slug:this.$route.params.pageslug,
            templatename:'',
            pagedata:[],
            isdata:0,
        }
    },

    components:{
        Template1Design,
        Template2Design,
        LandingPageTemplate
    },

    created(){
        axios.get('pages/getsinglepage/'+this.slug).then((result)=>{
            // console.log(result);
            if(result.data.page == ''){
                this.$router.push({name:'frontpage', params: {companyslug:this.$route.params.pageslug} });
            }
            else{
                if(result.data.page.template_name == 'landingpage_template'){
                    this.$router.push('/');
                }
                this.templatename = result.data.page.template_name;
                this.pagedata = result.data;
                this.isdata = 1;
            }
        });
    },
}
</script>