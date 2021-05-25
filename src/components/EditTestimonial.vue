<template>
    <div class="row justify-content-center mt-1">
    
    <div class="col-lg-8" v-if="gettestimonialpagerequest == 1">
       <form @submit.prevent="edittestimonial()" enctype="multipart/form-data" class="text-justify col-lg-10">
            
            <div class="form-group">
                <label>Client Name</label>
                <input type="text" name="tname" v-model="getpagedata.client_name" ref="client_name" class="form-control" placeholder="Enter Client name">
            </div>
            
            <div class="form-group">
                <label>Client Email</label>
                <input type="text" name="temail" v-model="getpagedata.email_address" ref="email_address" class="form-control" placeholder="Enter Client Email">
            </div>

            <div class="form-group">
                <label>Comment</label>
                <textarea class="form-control" v-model="getpagedata.comment" ref="comment" name="comment" rows="4" cols="100" placeholder="Enter Comment"></textarea>
            </div>

            <div class="form-group">
                <label>Ratting</label>
                <input type="number" name="ratting" v-model="getpagedata.ratting" ref="ratting" class="form-control" placeholder="Enter Ratting">
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
    name:'EditTestimonial',

    components:{
        
    },

    data(){
        return{
            isLoading:false,
            testimonial_id:this.$route.params.testimonialid,
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
        gettestimonialpagerequest(){
          return this.$store.getters.gettestimonialpagerequest;
        },
        getpagedata(){
            return this.$store.getters.getsingletestimonialdata(this.testimonial_id);
        }
    },

    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        if(this.getpagerequest == 0){
            this.$store.dispatch('settestimonialData',{id:15} );
        }
    },

    methods:{

        edittestimonial(){
            
            let fd = new FormData();
            fd.append('user_id',1);
            fd.append('testimonial_id', this.getpagedata.testimonial_id );
            fd.append('client_name', this.$refs.client_name.value );
            fd.append('email_address', this.$refs.email_address.value);
            fd.append('comment',this.$refs.comment.value);
            fd.append('ratting',this.$refs.ratting.value);
            fd.append('isupdate',true);
            
            axios.post('testimonial/createtestimonial',fd).then((result) => {
                console.log(result.data);
                this.alertmsg = result.data.message;
                this.showalert = true;
                this.$store.dispatch('settestimonialData',{id:15});
                setTimeout(() => {
                    this.clear();
                }, 3000);
            });
        },

        clear(){
            this.alertmsg = '';
            this.showalert = false;
            this.$router.push('/dashboard/testimonial').catch(()=>{});
        },

    }
}
</script>