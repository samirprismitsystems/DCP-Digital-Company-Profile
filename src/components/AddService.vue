<template>
    <div class="row justify-content-center mt-5">

        <div class="col-lg-8">
            
        <form @submit.prevent="addservicedata()" enctype="multipart/form-data" class="text-justify col-lg-10">
            
            <div class="form-group">
                <label>Service Image</label>
                <input id="imgchange" type="file" @change="changepic($event)">
                <img class="ml-3" v-show="showimg" :src="imgsrc" height="100" width="100">
            </div>
            
            <div class="form-group">
                <label>Service Name</label>
                <input type="text" name="sname" v-model="servicedata.sname" class="form-control" placeholder="Enter Service name">
            </div>

            <div class="form-group">
                <label>Service Description</label>
                <textarea class="form-control" v-model="servicedata.sdesc" name="sdesc" rows="4" cols="100" placeholder="Enter Service Description"></textarea>
            </div>

            <div class="form-group">
                <label>Service Price</label>
                <input type="number" name="cprice" v-model="servicedata.sprice" class="form-control" placeholder="Enter Service Price">
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
    name:'AddService',
    data(){
        return{
            company_id:0,
            showimg:false,
            imgsrc:'',
            showalert:false,
            alertmsg:'',
            servicedata:{
                simage:'',
                sname:'',
                sdesc:'',
                sprice:''
            }
        }
    },

    computed:{
        getuserid(){
          return this.$store.getters.getuserid;
        },
        getpageinfo(){
          return this.$store.getters.getsitetitle;
        },
        getcompanypagerequest(){
          return this.$store.getters.getcompanypagerequest;
        },
        getcompanypagedata(){
          return this.$store.getters.getcompanydata;
        },
    },

    methods:{
        
        changepic(event){
            this.servicedata.simage = event.target.files[0];
            this.imgsrc = URL.createObjectURL(this.servicedata.simage);
            this.showimg = true;
        },

        addservicedata(){
            let fd = new FormData();
            fd.append('service_name',this.servicedata.sname);
            fd.append('service_desc',this.servicedata.sdesc);
            fd.append('service_price',this.servicedata.sprice);
            fd.append('service_image',this.servicedata.simage);
            fd.append('isupdate',false);
            fd.append('user_id',this.getuserid);
            
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
        },

    }
}
</script>