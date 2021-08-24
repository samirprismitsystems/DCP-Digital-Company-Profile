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
        console.log(this.data);
    },

    props:{
        data:{

        }
    },

}
</script>