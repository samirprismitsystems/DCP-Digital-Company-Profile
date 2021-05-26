<template>
    <div class="row justify-content-center mt-5">

        <div class="col-lg-8">
            
        <form @submit.prevent="addclientdata()" enctype="multipart/form-data" class="text-justify col-lg-10">
            
            <div class="form-group">
                <label>Client Logo</label>
                <input id="imgchange" type="file" @change="changepic($event)">
                <img class="ml-3" v-show="showimg" :src="imgsrc" height="100" width="100">
            </div>
            
            <div class="form-group">
                <label>Client Name</label>
                <input type="text" name="cname" v-model="clientdata.clientname" class="form-control" placeholder="Enter Client name">
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
    name:'AddClient',
    data(){
        return{
            company_id:0,
            showimg:false,
            imgsrc:'',
            showalert:false,
            alertmsg:'',
            clientdata:{
                clientlogo:'',
                clientname:'',
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
            this.clientdata.clientlogo = event.target.files[0];
            this.imgsrc = URL.createObjectURL(this.clientdata.clientlogo);
            this.showimg = true;
        },

        addclientdata(){
            let fd = new FormData();
            fd.append('client_logo',this.clientdata.clientlogo);
            fd.append('client_name',this.clientdata.clientname);
            fd.append('user_id',this.getuserid);
            fd.append('isupdate',false);

            axios.post('client/createclient',fd).then((result) => {
                this.alertmsg = result.data.message;
                this.showalert = true;
                this.$store.dispatch('setClientData',{id:this.getuserid});
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