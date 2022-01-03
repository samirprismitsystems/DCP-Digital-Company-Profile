<template>
    <section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<AdminDash />

		<div class=" right_sidebar_content">
			<div class="tabs-stage">

                <div id="tab-3" class="expand_tabs">
			    	<router-link to="/dashboard/service" class="btnBack site_btn btn_000 btncol"><i class="fas fa-arrow-left"></i>Back</router-link>
			      	<div class="tab_title">
				        <div class="h2">Add Themes For Company</div>
				        <div class="h4">Add Themes</div>
			    	</div>

			    	<form id="" @submit.prevent="savetheme()"  class="theme_form company_items form_shadow">
			    		<div class="row" id="divdata">
			    		
                        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 item_col " v-for="(theme,index) in getpagedata" :key="index">
			    			<div class="item_no">
			    				<h5>Theme #<span class="count"> {{index+1}} </span></h5> <a @click="deletetheme(theme.theme_id)" type="button" class="dismiss-btn fas fa-trash-alt"></a>
			    			</div>
			    			<div class="item_div">
			    				<div class="item_img">
			    					<img :src="imgsrctheme[index]" alt="theme" title="" class="img-fit">
			    				</div>
			    				<div>
			    					<div class="upload_btn btn_100 site_btn mb-0 w-100">
			    					<input type="file" name="theme_image" @change="changepic(index,$event)" class="choose">
			    					Upload Theme image
			    					</div>
			    					<input type="text" name="theme-name" v-model="oldtheme[index].theme_name" class="item-input" placeholder="Enter Theme Name">
			    				</div>	
			    			</div>
			    		</div>

                        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 item_col " v-for="(ntheme,nindex) in newtheme" :key="nindex+'new'">
			    			<div class="item_no">
			    				<h5>Add New Theme <span class="count"> {{nindex+1}} </span></h5> <a @click="deletbox(nindex)" type="button" class="dismiss-btn fas fa-trash-alt"></a>
			    			</div>
			    			<div class="item_div">
			    				<div class="item_img">
			    					<img :src="newimgsrc[nindex]" alt="theme" title="" class="img-fit">
			    				</div>
			    				<div>
			    					<div class="upload_btn btn_100 site_btn mb-0 w-100">
			    					<!-- @change="changepic(index,$event)" -->
                                    <input type="file" @change="changenewpic(nindex,$event)"  class="choose">
			    					Upload Theme image
			    					</div>
                                    
			    					<input type="text" name="theme-name" v-model="ntheme.theme_name" class="item-input" placeholder="Enter Theme Name">
			    				</div>	
			    			</div>
			    		</div>
			    		
			    		</div>
			    		<a @click="adddiv" type="button" class=" site_btn add-more-btn">Add More</a>

						<div class="form_btn_field">
							<button type="submit" class=" form_btn btn_200  ">Save Changes  <i v-if="isloading" class="fas fa-spinner fa-pulse"></i></button>
							<router-link to="/dashboard/portfolio"  class=" btnNext form_btn btn_100 btncol ">Next</router-link>
						</div>
			    	</form>
				</div>

            </div>

            <!-- <div class="form_btn_field float-right mt-5">
				<router-link to="/admindashboard/socailmediaadd"  class=" btnNext form_btn btn_100 mt-5 btncol">Next</router-link>
			</div> -->


        </div>
        </div>
    </div>
    </section>

</template>


<script>
import axios from 'axios'
import AdminDash from './AdminDash'
export default {
    name:"AddTheme",
    data(){
        return{
            oldtheme:[],
            newtheme:[],
            oldimages:[],
            newimages:[],
            imgsrctheme:[],
            newimgsrc:[],
            imgpath:this.$imgpath,
            ischangepic:false,
            newdataindex:0,
            isimgchange:false,
            isloading:false,
        }
    },

    components:{
        AdminDash
    },

    computed:{
        getpagerequest(){
          return this.$store.getters.getthemespagerequest;
        },
        getpagedata(){
          let data =  this.$store.getters.getthemesdata;
            this.oldtheme = [];
            if(data.length != 0){
            let i = 0;
            data.forEach( element => {
                this.oldtheme.push(element);
                if(this.isimgchange == true){
                    let blb = this.imgsrctheme[i].substr(0,4);
                    if(blb != 'blob'){
                        this.imgsrctheme[i] = this.$imgpath+'themes/'+element.theme_image;
                    }
                }
                else{
                    this.imgsrctheme[i] = this.$imgpath+'themes/'+element.theme_image;
                }
                i++;
            });
                this.oldtheme = [ ...new Set(this.oldtheme) ];
            }
            return data;
        },
        getuserid(){
            return this.$store.getters.getuserid;
        }
    },

    watch:{
        $route(){
            this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        }
    },

    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        if(this.getpagerequest == 0){
            this.$store.dispatch('setallcompanydata');
            this.$store.dispatch('setsocialcolordata');
            this.$store.dispatch('setallsocialdata');
            this.$store.dispatch('setpagesdata');
            this.$store.dispatch('setuserreviewdata',{data:'all'});
            this.$store.dispatch('setthemesData');
        }
    },

    methods:{
        changepic(index,event){
            this.isimgchange = true;
            this.oldimages[index] = event.target.files[0];
            this.imgsrctheme[index] = URL.createObjectURL(event.target.files[0]);
            // this.oldtheme[index].theme_logo = URL.createObjectURL(event.target.files[0]);
            this.oldtheme = [ ...new Set(this.oldtheme) ];
        },

        changenewpic(index,event){
            this.newimages[index] = event.target.files[0];
            this.newimgsrc[index] = URL.createObjectURL(event.target.files[0]);
            this.newtheme[index].theme_logo = URL.createObjectURL(event.target.files[0]);
            this.newtheme = [ ...new Set(this.newtheme) ];
        },

        deletbox(index){
            this.newtheme.splice(index, 1);
            this.newimgsrc[index] = '';
        },

        adddiv(){
            this.newtheme.push({
                theme_name:'',
                theme_logo:null,
            });
        },

        deletetheme(themeid){
            this.$swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning", buttons: true, dangerMode: true }).then(() => {
                axios.get('theme/deletetheme/'+themeid).then((res)=>{
                    this.$store.dispatch('setthemesData');
                }).catch(()=>{});
            }).catch(()=>{
            });
        },

        async savetheme(){
            this.isloading  = true;
            this.oldtheme = [ ...new Set(this.oldtheme) ];
            let fd = new FormData();
            fd.append('isupdate',true);
            for (let index = 0; index < this.oldimages.length; index++) {
                fd.append('images'+index,this.oldimages[index]);
            }
            fd.append('imgcount', this.oldimages.length );
            fd.append('theme_data',JSON.stringify(this.oldtheme));
            
            if(this.oldtheme != null && this.oldtheme != ''){
                await axios.post('theme/createtheme',fd).then((result) => {
                });
            }

            if(this.newtheme != null && this.newtheme != ''){
                this.newtheme = [ ...new Set(this.newtheme) ];
                let fd1 = new FormData();
                fd1.append('isupdate',false);
                for (let index = 0; index < this.newimages.length; index++) {
                    fd1.append('images'+index,this.newimages[index]);
                }
                fd1.append('imgcount', this.newimages.length );
                fd1.append('theme_data',JSON.stringify(this.newtheme));
                
                await axios.post('theme/createtheme',fd1).then((result) => {
                    this.$store.dispatch('setthemesData');
                    this.newtheme = [];
                    this.newimages = [];
                    this.newimgsrc = [];
                    this.$swal.fire('Theme Data', result.data.message , 'success');
                    this.isloading  = false;
                });
            }
            else{
                this.$swal.fire('Theme Data', 'Theme Data Updated' , 'success');
				this.$store.dispatch('setthemesData');
                this.isloading  = false;
            }
        }
    },

}
</script>

<style scoped>
    .btncol{
        color: white;
    }
</style>
}