<template>

    <div class="row justify-content-center">
        <div class="col-lg-6">

        <form @submit.prevent="addcompanydata()" enctype="multipart/form-data">
            
            <div class="form-group">
                <label>Company Logo</label>
                <input type="file" @change="changepic($event)">
            </div>
            
            <div class="form-group">
                <label>Company Name</label>
                <input type="text" name="cname" v-model="companydata.cname" class="form-control" placeholder="Enter Company name">
            </div>

            <div class="form-group">
                <label>Company Description</label>
                <textarea class="form-control" v-model="companydata.cdesc" name="cdesc" rows="4" cols="100" placeholder="Enter Company Description"></textarea>
            </div>


            <div class="form-group">
                <label>Company Social Links</label>
                <select id="socialnames" class="form-control" v-model="companydata.socialnames" multiple>
                    <option v-for="(smedia,index) in social" :key="index" v-bind:value="smedia.socialmedia_id">{{smedia.socialmedia_name}}</option>
                </select>
            </div>
            
            
            <div class="form-group">
                <div id="wraper">
                <!-- <div v-for="(smedia,index) in social" :key="index">
                    <span class="col-4">{{smedia.socialmedia_name}}</span><input v-model="companydata.social[index]" type="text" class="col-8 form-control" name="socialmedia[]"><br>
                </div> -->
                </div>
            </div>


            <div class="form-group">
                <label>Working Area</label>
                <select name="cities[]" class="workareacity form-control" v-model="companydata.cities" multiple>
                    <option value="all">All India</option>
                    <option v-for="(city,index) in cities" :key="index" :value="city.id">{{city.name}}</option>
                </select>
            </div>
            
            <div class="row">
                <div class="col-lg-6">
                    <div class="form-group">
                        <label>Established In</label>
                        <input type="date" v-model="companydata.esdate" name="esdate" class="form-control">
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label>business_segment</label>
                        <input type="text" v-model="companydata.bsegment" name="bsegment" class="form-control" placeholder="Enter Company Segment">
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Address</label>
                <textarea class="form-control" v-model="companydata.address" name="address" rows="3" cols="100" placeholder="Enter Company Address"></textarea>
            </div>

            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" name="cemail" v-model="companydata.cemail" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            
            <div class="form-group">
                <label>Contact No</label>
                <input type="number" name="cnumber" v-model="companydata.cnumber" class="form-control" placeholder="Enter Contact No">
            </div>
            
            <div class="form-group">
                <label>Working Hours</label>
                <input type="number" name="cwhours" v-model="companydata.cwhours" class="form-control" placeholder="Enter Working Hours">
            </div>
            
            <!-- <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div> -->

            <button type="submit" class="btn btn-primary mb-4">Submit</button>
        </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'AddCompany',
    data(){
        return{
            cities:[],
            social:[],
            companydata:{
                logo:null,
                cname:'',
                cdesc:'',
                socialnames:[],
                sociallinks:[],
                cities:[],
                esdate:'',
                bsegment:'',
                address:'',
                cemail:'',
                cnumber:'',
                cwhours:''
            },
        }
    },

    created(){
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

    computed:{
        getuserid(){
          return this.$store.getters.getuserid;
        },
    },

    methods:{
        changepic(event){
            this.companydata.logo = event.target.files[0];
            console.log(event.target.files[0]);
        },
        addcompanydata(){
            let fd = new FormData();
            fd.append('user_id',this.getuserid);
            fd.append('company_name',this.companydata.cname);
            fd.append('company_logo',this.companydata.logo);
            fd.append('company_desc',this.companydata.cdesc);
            fd.append('socialnames',this.companydata.socialnames);
            fd.append('sociallinks',this.companydata.sociallinks);
            fd.append('cities',this.companydata.cities);
            fd.append('established_in',this.companydata.esdate);
            fd.append('business_segment',this.companydata.bsegment);
            fd.append('address',this.companydata.address);
            fd.append('company_email',this.companydata.cemail);
            fd.append('company_contact',this.companydata.cnumber);
            fd.append('working_hours',this.companydata.cwhours);
 
            axios.post('company/createcompany',fd).then((response)=>{
            });
        }
    }

}
</script>