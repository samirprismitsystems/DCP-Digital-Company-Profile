<template>
    <div class="left_sidebar_nav">	
			<ul class="tabs-nav">
				<!-- href="#tab-1" -->
			    <li :class="checkclass('Company')"><router-link  to="/dashboard/company"  class="tab_anchor" rel="nofollow"><img src="/src/assets/img/company_details.png" width="44" height="39" alt="" title="" >
			    	<span>Company Details</span></router-link>
			    </li>
				<!-- href="#tab-2" -->
			    <li :class="checkclass('Social Links')"><router-link to="/dashboard/sociallinks"  class="tab_anchor" rel="nofollow"><img src="/src/assets/img/social_links.png" width="36" height="30" alt="" title="" ><span>Social Links</span></router-link>
			    </li>
			     <li :class="checkclass('Product')"><router-link to="/dashboard/product" class="tab_anchor" rel="nofollow"><img src="/src/assets/img/product.png" width="40" height="38" alt="" title="" ><span>Product</span></router-link>
			    </li>
			    <li :class="checkclass('Service')"><router-link to="/dashboard/service" class="tab_anchor" rel="nofollow"><img src="/src/assets/img/services.png" width="36" height="37" alt="" title="" ><span>Services</span></router-link>
			    </li>
				<li :class="checkclass('Client')"><router-link to="/dashboard/client" class="tab_anchor" rel="nofollow"><img src="/src/assets/img/clients.png" width="40" height="32" alt="" title="" ><span>Clients</span></router-link>
			    </li>
			    <li :class="checkclass('Portfolio')"><router-link to="/dashboard/portfolio" class="tab_anchor" rel="nofollow"><img src="/src/assets/img/image_gallery.png" width="40" height="32" alt="" title="" ><span>Image Gallery</span></router-link>
			    </li>
				<li :class="checkclass('Testimonial')"><router-link to="/dashboard/testimonial" class="tab_anchor" rel="nofollow"><img src="/src/assets/img/testimonial.png" width="40" height="40" alt="" title="" ><span>Testimonial</span></router-link>
			    </li>
				<li :class="checkclass('Enquiry')"><router-link to="/dashboard/enquiry" class="tab_anchor" rel="nofollow"><img src="/src/assets/img/inquiry.png" width="40" height="40" alt="" title="" ><span>Inquiry</span></router-link>
			    </li>
			    <li :class="checkclass('Payment Options')"><router-link to="/dashboard/paymentoptions" class="tab_anchor" rel="nofollow"><img src="/src/assets/img/payment_options.png" width="40" height="40" alt="" title="" ><span>Payment Options</span></router-link>
			    </li>
				
			</ul>
		</div>
</template>

<script>
export default {
	name:'DashData',
	computed:{
		getpageinfo(){
        	return this.$store.getters.getsitetitle;
        },
		getusertype(){
            this.$store.getters.getusertype;
        },
		getcompanyid(){
          return this.$store.getters.getcompanyid;
        },
		getuseremail(){
            return this.$store.getters.getuseremail;
        },
	},

	created(){
		if(this.getuseremail == null){
            this.$router.push('/login').catch(()=>{});
        }
	},
	
	methods:{
		checkclass(page){
			// console.log(this.getpageinfo);
			if(page == this.getpageinfo){
				return "tab-active";
			}
		},

		checkcompany(){
			if(this.getcompanyid == ''){
				return true;
			}
			else{
				false;
			}
		}

	}
}
</script>