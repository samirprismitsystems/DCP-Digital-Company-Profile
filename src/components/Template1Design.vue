<template>
     <div class="">
		<!-- <div class="row no-wrap">
		<div class="right_sidebar_content">
			<div class="tabs-stage">
                <div class="expand_tabs"> -->

                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <h2 class="text-center mt-5">{{data.page_content.page_title}}</h2>
                        <p class="text-center" v-html="data.page_content.page_content"></p>
                    </div>
                </div>

                <!-- </div>
            </div>
        </div>

        </div> -->
    </div>

</template>

<script>
// import $ from 'jQuery'
export default {
    name:'Template1Design',
    data(){
        return{
            pagedata:[],
            content:[],
            imgpath:this.$imgpath,
        }
    },

    created(){
        
        this.pagedata = this.data;
        console.log(this.pagedata);
        // this.content = JSON.parse(this.data.page_content);
        document.getElementsByTagName("META")['title'].content = this.pagedata.page.meta_title;
        document.getElementsByTagName("META")['keywords'].content = this.pagedata.page.meta_keywords;
        document.getElementsByTagName("META")['description'].content = this.pagedata.page.meta_description;
        document.querySelector("meta[property='og:image']").content = this.imgpath+'metaimg/'+this.pagedata.page.meta_image;
    },

    props:{
        data:{

        }
    },

}
</script>