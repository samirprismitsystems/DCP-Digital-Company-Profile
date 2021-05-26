<template>
    <div class="row justify-content-center mt-5">

        <div class="col-lg-6" v-if="getpagerequest == 1">

            
        <form @submit.prevent="addcompanydata()" enctype="multipart/form-data" class="text-justify col-lg-10">
            
            <div class="form-group">
                <label>Company Logo</label>
                <img class="ml-3" @click="openbox" :src="imgsrc" height="100" width="100">
                <input id="imgchange" v-show="false" type="file" @change="changepic($event)">
            </div>
            
            <div class="form-group">
                <label>Company Name</label>
                <input type="text" name="cname" ref="cname" v-model="getpagedata.company[0].company_name" class="form-control" placeholder="Enter Company name">
            </div>

            <div class="form-group">
                <label>Company Description</label>
                <textarea class="form-control" ref="cdesc" v-model="getpagedata.company[0].company_desc" name="cdesc" rows="4" cols="100" placeholder="Enter Company Description"></textarea>
            </div>

            <div class="form-group">
                <label>Company Social Links</label>
                <select id="socialnames" class="form-control" v-model="companydata.socialnames" multiple>
                    <option v-for="(smedia,index) in social" :key="index" v-bind:value="smedia.socialmedia_id">{{smedia.socialmedia_name}}</option>
                </select>
            </div>
            
            <div class="form-group">
                <div id="wraper">
                <div :id="smedia.socialmedia_id" v-for="(smedia,index) in social" :key="index">
                    <span class="col-4">{{smedia.socialmedia_name}}</span><input v-model="companydata.sociallinks[index]" type="text" class="col-8 form-control" name="socialmedia[]"><br>
                </div>
                </div>
            </div>


            <div class="form-group">
                <label>Working Area</label><br>
                <input type="checkbox" v-model="allindia"> All States
                <select :disabled="allindia" name="cities[]" class="workareacity form-control" v-model="companydata.cities" multiple>
                    <option v-for="(city,index) in cities" :key="index" :value="city.id">{{city.name}}</option>
                </select>
            </div>
            
            <div class="row">
                <div class="col-lg-6">
                    <div class="form-group">
                        <label>Established In</label>
                        <input type="date" ref="esdate" v-model="getpagedata.company[0].established_in" name="esdate" class="form-control">
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label>Business Segment</label>
                        <input type="text" ref="bsegment" v-model="getpagedata.company[0].business_segment" name="bsegment" class="form-control" placeholder="Enter Company Segment">
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Address</label>
                <textarea class="form-control" ref="address" v-model="getpagedata.company[0].address" name="address" rows="3" cols="100" placeholder="Enter Company Address"></textarea>
            </div>

            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" name="cemail" ref="cemail" v-model="getpagedata.company[0].company_email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            
            <div class="form-group">
                <label>Contact No</label>
                <input type="number" name="cnumber" ref="cnumber" v-model="getpagedata.company[0].company_contact" class="form-control" placeholder="Enter Contact No">
            </div>
            
            <div class="form-group">
                <label>Working Hours</label>
                <input type="number" name="cwhours" ref="cwhours" v-model="getpagedata.company[0].working_hours" class="form-control" placeholder="Enter Working Hours">
            </div>
            
            <!-- <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div> -->
            
            <button type="submit" class="btn btn-primary mb-4">Submit</button>
        </form>

            <div v-show="showalert" class="alert alert-success">{{alertmsg}}</div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'AddCompany',
    components:{
       
    },
    data(){
        return{
            path:'',
            cities:[],
            allindia:false,
            social:[],
            showalert:false,
            alertmsg:'',
            ischangepic:false,
            imgsrc:require('../assets/img/logo.jpg'),
            isupdate:false,
            company_id:null,
            logo:'',

            companydata:{
                logo:null,
                socialnames:[],
                sociallinks:[],
                cities:[],
            },
            
        }
    },

    computed:{
        getuserid(){
            return this.$store.getters.getuserid;
        },
        getpagerequest(){
          return this.$store.getters.getcompanypagerequest;
        },
        getpagedata(){
            let data =  this.$store.getters.getcompanydata;
            if(data.company[0] != null){
                this.isupdate = true;
                this.company_id = data.company[0].company_id;
                this.logo = data.company[0].company_logo;
                // console.log(data.company[0].company_logo);
                this.path = this.$imgpath+data.company[0].company_id+'/logo/'+data.company[0].company_logo;
                this.imgsrc = this.path;

                if(data.companycities.length == 1 ){
                   if(data.companycities[0]['all_india'] == 1){
                        this.allindia = true;   
                   }
                }
                else{
                    let i=0;
                    data.companycities.forEach(element => {
                        this.companydata.cities[i] = element['id'];
                        i++;
                    });
                }

                let j=0;
                data.social.forEach(element => {
                    this.companydata.socialnames[j] = element['social_id'];
                    this.companydata.sociallinks[j] = element['company_social_link'];
                    j++;
                });
                let custom = document.createElement('script')
                custom.setAttribute('src', this.$linkpath+'js/custom.js')
                document.head.appendChild(custom);
            }
            else{
                if(data.newuser == 1){
                    data.company[0] = {
                    };
                }
            }
            return data;
        },
    },

    created(){
        if(this.getpagerequest == 0){
            this.$store.dispatch('setcompanydata',{id: this.getuserid});
        }
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
       
        axios.get('company/fetchcities').then((response)=>{
            this.cities = response.data.cities;
            // console.log(response.data.cities);
        });

        axios.get('company/fetchsocial').then((response)=>{
            this.social = response.data.social;
            // console.log(response.data.cities);
        });
    },

    methods:{

        openbox(){
            document.getElementById('imgchange').click();
        },

        changepic(event){
            this.companydata.logo = event.target.files[0];
            this.imgsrc = URL.createObjectURL(this.companydata.logo);
            this.ischangepic = true;
        },

        addcompanydata(){
            // console.log(this.companydata);
            let fd = new FormData();
            
            fd.append('user_id',1);
            fd.append('allindia',this.allindia);
            fd.append('company_id',0);
            fd.append('company_name',this.$refs.cname.value);
            fd.append('company_desc',this.$refs.cdesc.value);
            fd.append('socialnames',this.companydata.socialnames);
            fd.append('sociallinks',this.companydata.sociallinks);
            fd.append('cities',this.companydata.cities);
            fd.append('established_in',this.$refs.esdate.value);
            fd.append('business_segment',this.$refs.bsegment.value);
            fd.append('address',this.$refs.address.value);
            fd.append('company_email',this.$refs.cemail.value);
            fd.append('company_contact',this.$refs.cnumber.value);
            fd.append('working_hours',this.$refs.cwhours.value);
            fd.append('isupdate',false);

            if(this.ischangepic == true){
               fd.append('company_logo',this.companydata.logo);
               this.ischangepic = false;
            }

            if(this.isupdate == true){
                fd.append('company_id',this.company_id);
                fd.append('logo',this.logo);
                fd.append('isupdate',true);
            }

            axios.post('company/createcompany',fd).then((response)=>{
                    // console.log(response.data);
                    this.alertmsg = response.data.message;
                    this.showalert =  !this.showalert;
                    setTimeout(() => {
                        this.clear();
                    }, 3000);
                });

        },

        clear(){
            this.showalert = false;
            this.alertmsg = '';
        },

        

    }

}
</script>