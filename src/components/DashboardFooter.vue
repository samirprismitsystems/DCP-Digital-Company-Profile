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
                            <li class="footer_nav_item"><a href="#!" class="footer_nav_link ">Terms of services</a></li>
                            <li class="footer_nav_item"><a href="#!" class="footer_nav_link ">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </footer>
</template>

<script>
export default {
    name:'DashboardFooter',
    computed:{
        getpagereq(){
            return this.$store.getters.getsettingrequest;
        },
        getpagedata(){
            return this.$store.getters.getsettingdata;
        },
        getpagesdata(){
            let data = this.$store.getters.getpagesdata;
            return data;
        },
        getpagesrequest(){
            return this.$store.getters.getpagesrequest;
        },
    },

    created(){
        this.$store.dispatch('setsettingdata');
        this.$store.dispatch('setpagesdata');
    }
}
</script>