<template>
    <div class="row justify-content-center mt-5">

        <div class="col-lg-8" v-if="getclientpagerequest == 1">

       <form @submit.prevent="editclientdata()" enctype="multipart/form-data" class="text-justify col-lg-10">
            
            <div class="form-group">
                <label>Client Image</label>
                <input id="imgchange" v-show="false" type="file" @change="changepic($event)">
                Change Image
                <img @click="openbox" class="ml-3" :src="imgsrc" height="100" width="100">
            </div>
            
            <div class="form-group">
                <label>Client Name</label>
                <input type="text" name="cname" v-model="getpagedata.client_name" ref="client_name" class="form-control" placeholder="Enter Client name">
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
    name:'EditClient',

    components:{
        
    },

    data(){
        return{
            isLoading:false,
            client_id:this.$route.params.clientid,
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
        if(this.getclientpagerequest == 0){
            this.$store.dispatch('setproductdata',{id:15});
        }
    },

    computed:{
        getpageinfo(){
          return this.$store.getters.getsitetitle;
        },
        getclientpagerequest(){
          return this.$store.getters.getproductpagerequest;
        },
        
        // getproductpagedata(){
        //   return this.$store.getters.getproductdata;
        // },

        getpagedata(){
            let data =  this.$store.getters.getsingleclientdata(this.client_id);
            this.imgsrc = this.$imgpath+'/15/clients/'+data.client_logo;
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

        editclientdata(){
            let fd = new FormData();
            fd.append('user_id',1);
            fd.append('client_id', this.getpagedata.client_id );
            fd.append('client_name', this.$refs.client_name.value);
            fd.append('isupdate',true);

            if(this.pimage == ''){
                fd.append('client_logo',this.getpagedata.client_logo);
            }
            else{
                fd.append('client_logo',this.pimage);
            }

            // console.log(this.productdata);
            axios.post('client/createclient',fd).then((result) => {
                // console.log(result.data);
                this.alertmsg = result.data.message;
                this.showalert = true;
                this.$store.dispatch('setproductdata',{id:15});
                setTimeout(() => {
                    this.clear();
                }, 3000);
            });
        },
        
        clear(){
            this.alertmsg = '';
            this.showalert = false;
            this.$router.push('/dashboard/client').catch(()=>{});
        },

    }
}
</script>