<template>
    <div class="row justify-content-center mt-1">
    
    <div class="col-lg-8" v-if="getinquirypagerequest == 1">
       <form @submit.prevent="editinquiry()" enctype="multipart/form-data" class="text-justify col-lg-10">
            
            <div class="form-group">
                <label>Client Name</label>
                <input type="text" name="tname" v-model="getpagedata.client_name" ref="client_name" class="form-control" placeholder="Enter Client name">
            </div>
            
            <div class="form-group">
                <label>Client Email</label>
                <input type="text" name="temail" v-model="getpagedata.email_address" ref="email_address" class="form-control" placeholder="Enter Client Email">
            </div>

            <div class="form-group">
                <label>Phone Number</label>
                <input type="text" name="phone" v-model="getpagedata.phone_number" ref="phone_number" class="form-control" placeholder="Enter Phone Number">
            </div>

            <div class="form-group">
                <label>Message</label>
                <textarea class="form-control" v-model="getpagedata.message" ref="message" name="message" rows="4" cols="100" placeholder="Enter message"></textarea>
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
    name:'EditInquiry',
    components:{
    },
    data(){
        return{
            isLoading:false,
            inquiry_id:this.$route.params.inquiryid,
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
        getpageinfo(){
          return this.$store.getters.getsitetitle;
        },
        getinquirypagerequest(){
          return this.$store.getters.getinquirypagerequest;
        },
        getpagedata(){
            return this.$store.getters.getsingleinquirydata(this.inquiry_id);
        }
    },

    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        if(this.getinquirypagerequest == 0){
            this.$store.dispatch('setinquiryData',{id:15} );
        }
    },

    methods:{

        editinquiry(){
            
            let fd = new FormData();
            fd.append('user_id',1);
            fd.append('inquiry_id', this.getpagedata.inquiry_id );
            fd.append('client_name', this.$refs.client_name.value );
            fd.append('email_address', this.$refs.email_address.value);
            fd.append('phone_number',this.$refs.phone_number.value);
            fd.append('message',this.$refs.message.value);
            fd.append('isupdate',true);
            
            axios.post('inquiry/createinquiry',fd).then((result) => {
                console.log(result.data);
                this.alertmsg = result.data.message;
                this.showalert = true;
                this.$store.dispatch('setinquiryData',{id:15});
                setTimeout(() => {
                    this.clear();
                }, 3000);
            });
        },

        clear(){
            this.alertmsg = '';
            this.showalert = false;
            this.$router.push('/dashboard/inquiry').catch(()=>{});
        },

    }
}
</script>