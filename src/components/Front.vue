<template>
	<div>
        {{getfrontdata}}
        <div class="row justify-content-center">
            <form @submit.prevent="addtestimonial" class="col-lg-6">
                <h2 style="text-align:center">Give Feedback</h2>
                <div class="mt-4 mb-4 ">
                    <star-rating  :glow="10" :star-size="30" v-model="boundRating"></star-rating>
                </div>
                <div class="mt-2 form-group">
                    <label class="" for="user_id">Name</label>
                    <input id="name" ref="name" name="name" class="form-control" value="" type="text" placeholder="Enter Name" required="">
                </div>
                <div class="form-group">
                    <label class="" for="user_id">Email ID</label>
                    <input id="email" ref="email" name="email" class="form-control" value="" type="email" placeholder="Enter Email Id" required="">
                </div>
                <div class="form-group">
                    <textarea rows="6" name="comment" ref="comment" class="form-control" placeholder="Enter Comment" required=""></textarea>
                </div>
                <button type="submit" class="btn btn-success">Submit Feedback</button>
            </form>
            <div v-if="msgshow" class="alert alert-success">{{msg}}</div>
        </div>

        <hr>


        <div class="row justify-content-center">
            <form @submit.prevent="addinquiry" class="col-lg-6">
                <h2 style="text-align:center">Get In Touch</h2>
                <div class="mt-2 form-group">
                    <label class="" for="user_id">Name</label>
                    <input id="iname" ref="iname" name="iname" class="form-control" value="" type="text" placeholder="Enter Name" required="">
                </div>
                <div class="form-group">
                    <label class="" for="user_id">Email ID</label>
                    <input id="iemail" ref="iemail" name="iemail" class="form-control" value="" type="email" placeholder="Enter Email Id" required="">
                </div>
                <div class="mt-2 form-group">
                    <label class="" for="user_id">Contact Number</label>
                    <input id="iphone" ref="iphone" name="iphone" class="form-control" value="" type="text" placeholder="Enter Contact Number" required="">
                </div>
                <div class="form-group">
                    <textarea rows="6" name="imessage" ref="imessage" class="form-control" placeholder="Enter Message" required=""></textarea>
                </div>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
            <div v-if="imsgshow" class="alert alert-success">{{imsg}}</div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import StarRating from 'vue-star-rating'
// import DashData from './DashData'
export default {
    name:'Front',
    data(){
        return{
            companyslug:this.$route.params.companyslug,
            boundRating:0,
            msg:'',
            msgshow:false,
            imsg:'',
            imsgshow:false,
        }
    },
    components:{
        // DashData
        StarRating
    },

    computed:{
        getfrontdata(){
            let data = this.$store.getters.getcompanyfront;
            if(data.length != 0 ){
                if(data.company.length == 0 ){
                    this.$router.push('/');
                }
            }
            return data;
        }
    },

    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        this.$store.dispatch('setcompanyfront',{slug: this.companyslug });
    },

    methods:{
        addtestimonial(){
            let fd = new FormData();
            fd.append('client_name',this.$refs.name.value);
            fd.append('email_address',this.$refs.email.value);
            fd.append('ratting',this.boundRating);
            fd.append('comment',this.$refs.comment.value);
            fd.append('user_id',0);
            fd.append('company_id',this.getfrontdata.company.company_id);
            fd.append('isupdate',false);

            axios.post('testimonial/createtestimonial',fd).then((result)=>{
                this.msg = result.data.message;
                this.msgshow = true;

                setTimeout(() => {
                    this.msg = '';
                    this.msgshow = false;
                    this.boundRating = 0;
                    this.$refs.name.value = '';
                    this.$refs.email.value = '';
                    this.$refs.comment.value = '';
                }, 3000);

            });
        },


        addinquiry(){
            let fd = new FormData();
            fd.append('client_name',this.$refs.iname.value);
            fd.append('email_address',this.$refs.iemail.value);
            fd.append('phone_number',this.$refs.iphone.value);
            fd.append('message',this.$refs.imessage.value);
            fd.append('user_id',0);
            fd.append('company_id',this.getfrontdata.company.company_id);
            fd.append('isupdate',false);

            axios.post('inquiry/createinquiry',fd).then((result)=>{
                this.imsg = result.data.message;
                this.imsgshow = true;

                setTimeout(() => {
                    this.msg = '';
                    this.msgshow = false;
                    this.boundRating = 0;
                    this.$refs.iname.value = '';
                    this.$refs.iemail.value = '';
                    this.$refs.iphone.value = '';
                    this.$refs.imessage.value = '';
                }, 3000);
            });
        },

    }
}
</script>