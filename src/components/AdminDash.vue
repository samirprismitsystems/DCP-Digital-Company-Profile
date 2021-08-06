<template>
    <div class="left_sidebar_nav">
			<ul class="tabs-nav">
			
			    <li :class="checkadminclass('Company List')"><router-link :to="'/admindashboard/companylist'"  class="tab_anchor" rel="nofollow"><img src="/src/assets/img/company_details.png" width="44" height="39" alt="company list" title="" >
			    	<span>Company List</span></router-link>
			    </li>

                <li :class="checkadminclass('SocialMedia Add')"><router-link :to="'/admindashboard/socailmediaadd'"  class="tab_anchor" rel="nofollow"><img src="/src/assets/img/social_links.png" width="44" height="39" alt="social media" title="" >
			    	<span>Social Media</span></router-link>
			    </li>

				<li :class="checkadminclass('Pages')"><router-link :to="'/admindashboard/pages'"  class="tab_anchor" rel="nofollow"><img src="/src/assets/img/pages.png" width="44" height="39" alt="add pages" title="" >
			    	<span>Pages</span></router-link>
			    </li>

				<li :class="checkadminclass('User Review')"><router-link :to="'/admindashboard/userreview'"  class="tab_anchor" rel="nofollow"><img src="/src/assets/img/clientreview.webp" width="44" height="39" alt="user review" title="" >
			    	<span>User Review</span></router-link>
			    </li>

				<li :class="checkadminclass('Setting')"><router-link :to="'/admindashboard/setting'"  class="tab_anchor" rel="nofollow"><img src="/src/assets/img/setting.webp" width="44" height="39" alt="settings" title="" >
			    	<span>Setting</span></router-link>
			    </li>
				
			</ul>
		</div>
</template>

<script>
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

export default {
	name:'AdminDash',
	computed:{
		getpageinfo(){
        	return this.$store.getters.getsitetitle;
        },
		getusertype(){
           return this.$store.getters.getusertype;
        },
		getuseremail(){
            return this.$store.getters.getuseremail;
        },
	},

	created(){
		if(localStorage.getItem('useremail') == null || localStorage.getItem('usertype') == null ){
			this.logout();
        }
		if(this.getuseremail == null){
            this.$router.push('/login').catch(()=>{});
        }

		if(this.getusertype == 2){
            this.$router.push('/dashboard/');
        }
	},

	methods:{
		checkadminclass(page){
			// console.log(this.getpageinfo);
			if(page == this.getpageinfo){
				// console.log(this.getpageinfo);
				return "tab-active";
			}
		},


		logout(){
			
			localStorage.removeItem('useremail');
            // localStorage.removeItem('companyid');
            localStorage.removeItem('usertype');
            localStorage.removeItem('userid');
            localStorage.removeItem('first_name');
            localStorage.removeItem('admin_id');
            localStorage.removeItem('userdataemail');

            this.$store.dispatch('setuserdataemail',{userdataemail:''});
            
            this.$store.dispatch('setuseremail',{emailid:''});
            this.$store.dispatch('setuserid',{userid:''});
            this.$store.dispatch('setadminid',{admin_id:''});
            // this.$store.dispatch('setcompanyid',{companyid:''});
            this.$store.dispatch('setcompanydashreq',{status:0});
            this.$store.dispatch('setadmindashreq',{status:0});
            this.$store.dispatch('setuserpagereq',{status:0});
            this.$store.dispatch('setclientrequest',{status:0});
            this.$store.dispatch('setcompanyrequest',{status:0});
            this.$store.dispatch('setinquiryrequest',{status:0});
            this.$store.dispatch('setportfoliorequest',{status:0});
            this.$store.dispatch('setproductrequest',{status:0});
            this.$store.dispatch('setservicerequest',{status:0});
            this.$store.dispatch('settestimonialrequest',{status:0});

            this.$router.push('/login');
		}

	}
}
</script>