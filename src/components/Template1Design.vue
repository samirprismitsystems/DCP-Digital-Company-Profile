<template>
     <div class="">
		<!-- <div class="row no-wrap">
		<div class="right_sidebar_content">
			<div class="tabs-stage">
                <div class="expand_tabs"> -->

                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <h2 class="text-center mt-5">{{data.page_title}}</h2>
                        <p class="text-center" v-html="data.page_content"></p>
                    </div>
                </div>

                <!-- </div>
            </div>
        </div>

        </div> -->
    </div>

</template>

<script>
export default {
    name:'Template1Design',
    data(){
        return{
            pagedata:[],
            content:[]
        }
    },

    created(){
        
        this.pagedata = this.data;
        // this.content = JSON.parse(this.data.page_content);

        document.getElementsByTagName("META")['title'].content = this.pagedata.meta_title;
        document.getElementsByTagName("META")['keywords'].content = this.pagedata.meta_keywords;
        document.getElementsByTagName("META")['description'].content = this.pagedata.meta_description;
    },

    props:{
        data:{

        }
    },

}
</script>