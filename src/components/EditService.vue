<template>
    <div class="row justify-content-center mt-5">

        <div class="col-lg-8" v-if="getservicepagerequest == 1">
            

       <form @submit.prevent="editservicedata()" enctype="multipart/form-data" class="text-justify col-lg-10">
            
            <div class="form-group">
                <label>Product Image</label>
                <input id="imgchange" v-show="false" type="file" @change="changepic($event)">
                Change Image
                <img @click="openbox" class="ml-3" :src="imgsrc" height="100" width="100">
            </div>
            
            <div class="form-group">
                <label>Product Name</label>
                <input type="text" name="cname" v-model="getpagedata.service_name" ref="service_name" class="form-control" placeholder="Enter Product name">
            </div>

            <div class="form-group">
                <label>Product Description</label>
                <textarea class="form-control" v-model="getpagedata.service_desc" ref="service_desc" name="cdesc" rows="4" cols="100" placeholder="Enter Product Description"></textarea>
            </div>

            <div class="form-group">
                <label>Product Price</label>
                <input type="number" name="cwhours" v-model="getpagedata.service_price" ref="service_price" class="form-control" placeholder="Enter Product Price">
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
    name:'EditService',

    components:{
        
    },

    data(){
        return{
            isLoading:false,
            service_id:this.$route.params.sid,
            imgpath:this.$imgpath,
            company_id:0,
            showimg:false,
            imgsrc:'',
            showalert:false,
            alertmsg:'',
            pimage:'',
        }
    },

    computed:{
        getuserid(){
          return this.$store.getters.getuserid;
        },
        getpageinfo(){
          return this.$store.getters.getsitetitle;
        },
        getservicepagerequest(){
          return this.$store.getters.getservicepagerequest;
        },
        getpagedata(){
            let data =  this.$store.getters.getsingleservicedata(this.service_id);
            this.imgsrc = this.$imgpath+'/15/service/'+data.service_image;
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

        editservicedata(){
            let fd = new FormData();
            fd.append('user_id',this.getuserid);
            fd.append('service_id', this.getpagedata.service_id );
            fd.append('service_name', this.$refs.service_name.value);
            fd.append('service_desc',this.$refs.service_desc.value);
            fd.append('service_price',this.$refs.service_price.value);
            if(this.pimage == ''){
                fd.append('service_image',this.getpagedata.service_image);
            }
            else{
                fd.append('service_image',this.pimage);
            }
            fd.append('user_id',1);
            fd.append('isupdate',true);
            
            axios.post('service/createservice',fd).then((result) => {
                console.log(result.data);
                this.alertmsg = result.data.message;
                this.showalert = true;
                this.$store.dispatch('setservicedata',{id:this.getuserid});
                setTimeout(() => {
                    this.clear();
                }, 3000);
            });
        },

        clear(){
            this.alertmsg = '';
            this.showalert = false;
            this.$router.push('/dashboard/service').catch(()=>{});
        },

    }
}
</script>