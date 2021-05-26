<template>
    <div class="row justify-content-center mt-5">

        <div class="col-lg-8" v-if="getportfoliopagerequest == 1">

       <form @submit.prevent="editportfoliodata()" enctype="multipart/form-data" class="text-justify col-lg-10">
            
            <div class="form-group">
                <label>Portfolio Image</label>
                <input id="imgchange" v-show="false" type="file" @change="changepic($event)">
                Change Image
                <img @click="openbox" class="ml-3" :src="imgsrc" height="100" width="100">
            </div>
            
            <div class="form-group">
                <label>Portfolio Name</label>
                <input type="text" name="cname" v-model="getpagedata.portfolio_name" ref="portfolio_name" class="form-control" placeholder="Enter Client name">
            </div>

            <div class="form-group">
                <label>Portfolio Description</label>
                <textarea name="pdesc" v-model="getpagedata.portfolio_desc" rows="4" cols="100" ref="portfolio_desc" class="form-control"  placeholder="Enter Portfolio Description"></textarea>
            </div>

            <button type="submit" class="btn btn-primary mb-2">Submit</button>
        </form>

            <div v-show="showalert" class="alert alert-success">{{alertmsg}}</div>


        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'EditPortfolio',

    components:{
    },

    data(){
        return{
            isLoading:false,
            portfolio_id:this.$route.params.portfolioid,
            imgpath:this.$imgpath,
            company_id:0,
            showimg:false,
            imgsrc:'',
            showalert:false,
            alertmsg:'',
            pimage:'',
           
        }
    },

    created(){
        if(this.getportfoliopagerequest == 0){
            this.$store.dispatch('setproductdata',{id:15});
        }
    },

    computed:{
        getuserid(){
          return this.$store.getters.getuserid;
        },
        getpageinfo(){
          return this.$store.getters.getsitetitle;
        },
        getportfoliopagerequest(){
          return this.$store.getters.getportfoliopagerequest;
        },
      
        getpagedata(){
            let data =  this.$store.getters.getsingleportfoliodata(this.portfolio_id);
            this.imgsrc = this.$imgpath+'/15/portfolio/'+data.portfolio_image;
            return data;
        }

    },

    methods:{

        openbox(){
            document.getElementById('imgchange').click();
        },
        
        changepic(event){
            this.pimage = event.target.files[0];
            this.imgsrc = URL.createObjectURL(this.pimage);
            this.showimg = true;
        },

        editportfoliodata(){
            let fd = new FormData();
            fd.append('user_id',this.getuserid);
            fd.append('portfolio_id', this.getpagedata.portfolio_id );
            fd.append('portfolio_name', this.$refs.portfolio_name.value);
            fd.append('portfolio_desc', this.$refs.portfolio_desc.value);
            fd.append('isupdate',true);

            if(this.pimage == ''){
                fd.append('portfolio_image',this.getpagedata.portfolio_image);
            }
            else{
                fd.append('portfolio_image',this.pimage);
            }

            axios.post('portfolio/createportfolio',fd).then((result) => {
                this.alertmsg = result.data.message;
                this.showalert = true;
                this.$store.dispatch('setportfolioData',{id:this.getuserid});
                setTimeout(() => {
                    this.clear();
                }, 3000);
            });
        },
        
        clear(){
            this.alertmsg = '';
            this.showalert = false;
            this.$router.push('/dashboard/portfolio').catch(()=>{});
        },

    }
}
</script>