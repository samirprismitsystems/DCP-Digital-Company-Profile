<template>

      <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<AdminDash />

		<div class=" right_sidebar_content">
			<div class="tabs-stage">
                <div class="expand_tabs">

			      <div class="tab_title">
				        <div class="h2">Admin Dashboard</div>
			    	</div>

                    <h1>Admin Dahsboard</h1>


                </div>
            </div>
        </div>
        </div>
    </div>
    </section>

</template>

<script>
import AdminDash from './AdminDash'
export default {
    name:'AdminDashboard',
    components:{
        AdminDash
    },
    
    computed:{
        
    },

    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
    },


}
</script>