<template>
    <footer>
            <div class="container custom_container" v-if="getpagereq == 1">
                <div class="row align-items-center">
                    <div class="col-6  ">
                        <ul class="social_media_nav">
                            <li class="social_media_item" v-if="getpagedata[3].setting_name == 'facebookurl'"><a :href="getpagedata[3].setting_value" target="_blank" class="social_media_link fab fa-facebook-f"></a></li>
                            <li class="social_media_item" v-if="getpagedata[4].setting_name == 'instaurl'"><a :href="getpagedata[4].setting_value" target="_blank" class="social_media_link fab fa-instagram"></a></li>
                            <li class="social_media_item" v-if="getpagedata[5].setting_name == 'linkedurl'"><a :href="getpagedata[5].setting_value" target="_blank" class="social_media_link fab fa-linkedin-in"></a></li>
                        </ul>
                    </div>
                    <div class="col-6">
                        <ul class="footer_nav">
                            <li v-for="(page,index) in footerpages" :key="index" class="footer_nav_item"><a :href="'/'+page.page_slug" target="_blank" class="footer_nav_link "> {{page.page_name}} </a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </footer>
</template>

<script>
import axios from 'axios'
export default {
    name:'DashboardFooter',
    data(){
        return{
            footerpages:[]
        }
    },
    computed:{
        getpagereq(){
            return this.$store.getters.getsettingrequest;
        },
        getpagedata(){
            let pagedata = this.$store.getters.getsettingdata;
            let pages = JSON.parse(pagedata[9].setting_value);
            
            let pagelist = new FormData();
            pagelist.append('pages[]',pages);
            axios.post('pages/getsomepagedata',pagelist).then((result) => {
                this.footerpages = result.data.pages;
            });
            return pagedata;
        },
    },

    created(){
        this.$store.dispatch('setsettingdata');
    }
}
</script>