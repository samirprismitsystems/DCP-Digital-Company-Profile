<template>
    <div class="row justify-content-center mt-5">

        <div class="col-lg-8">
            
        <form @submit.prevent="addportfoliodata()" enctype="multipart/form-data" class="text-justify col-lg-10">
            
            <div class="form-group">
                <label>Portfolio Image</label>
                <input id="imgchange" type="file" @change="changepic($event)">
                <img class="ml-3" v-show="showimg" :src="imgsrc" height="100" width="100">
            </div>
            
            <div class="form-group">
                <label>Portfolio Name</label>
                <input type="text" name="pname" v-model="portfoliodata.pname" class="form-control" placeholder="Enter Portfolio name">
            </div>

            <div class="form-group">
                <label>Portfolio Description</label>
                <textarea name="pdesc" v-model="portfoliodata.pdesc" rows="4" cols="100" class="form-control"  placeholder="Enter Portfolio Description"></textarea>
            </div>

            <button type="submit" class="btn btn-primary mb-4">Submit</button>
        </form>

            <div v-show="showalert" class="alert alert-success">{{alertmsg}}</div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'AddPortfolio',
    data(){
        return{
            company_id:0,
            showimg:false,
            imgsrc:'',
            showalert:false,
            alertmsg:'',
            portfoliodata:{
                pimage:'',
                pname:'',
                pdesc:'',
            }
        }
    },

    created(){
        // this.$store.dispatch('setcompanydata',{id:1});
        // this.company_id = this.getcompanypagedata.company[0].company_id;
    },

    computed:{
        getpageinfo(){
          return this.$store.getters.getsitetitle;
        },
    },

    methods:{
        
        changepic(event){
            this.portfoliodata.pimage = event.target.files[0];
            this.imgsrc = URL.createObjectURL(this.portfoliodata.pimage);
            this.showimg = true;
        },

        addportfoliodata(){

            let fd = new FormData();
            fd.append('portfolio_name',this.portfoliodata.pname);
            fd.append('portfolio_desc',this.portfoliodata.pdesc);
            fd.append('portfolio_image',this.portfoliodata.pimage);
            fd.append('user_id',1);
            fd.append('isupdate',false);

            axios.post('portfolio/createportfolio',fd).then((result) => {
                this.alertmsg = result.data.message;
                this.showalert = true;
                this.$store.dispatch('setportfolioData',{id:15});
                setTimeout(() => {
                    this.clear();
                }, 3000);
            });
        },
        
        clear(){
            this.alertmsg = '';
            this.showalert = false;
        },

    }
}
</script>