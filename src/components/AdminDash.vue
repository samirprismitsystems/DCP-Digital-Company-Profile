<template>
    <div class="left_sidebar_nav">
			<ul class="tabs-nav">
			
			    <li :class="checkadminclass('Company List')"><router-link :to="'/admindashboard/companylist'"  class="tab_anchor" rel="nofollow"><img src="/src/assets/img/company_details.png" width="44" height="39" alt="" title="" >
			    	<span>Company List</span></router-link>
			    </li>

                <li :class="checkadminclass('SocialMedia Add')"><router-link :to="'/admindashboard/socailmediaadd'"  class="tab_anchor" rel="nofollow"><img src="/src/assets/img/social_links.png" width="44" height="39" alt="" title="" >
			    	<span>Social Media</span></router-link>
			    </li>

				<li :class="checkadminclass('Pages')"><router-link :to="'/admindashboard/pages'"  class="tab_anchor" rel="nofollow"><img src="/src/assets/img/pages.png" width="44" height="39" alt="" title="" >
			    	<span>Pages</span></router-link>
			    </li>

				<li :class="checkadminclass('User Review')"><router-link :to="'/admindashboard/userreview'"  class="tab_anchor" rel="nofollow"><img src="/src/assets/img/clientreview.png" width="44" height="39" alt="" title="" >
			    	<span>User Review</span></router-link>
			    </li>

				<li :class="checkadminclass('Setting')"><router-link :to="'/admindashboard/setting'"  class="tab_anchor" rel="nofollow"><img src="/src/assets/img/setting.png" width="44" height="39" alt="" title="" >
			    	<span>Setting</span></router-link>
			    </li>
				
			</ul>
		</div>
</template>

<script>
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
		}
	}
}
</script>