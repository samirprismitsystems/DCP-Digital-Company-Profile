<template>

<div class="container mt-5">
   <div class="row justify-content-center">
    <div class="col-lg-6">

   <form class="text-justify" @submit.prevent="saveprofile()">
        
        <div class="form-group">
            <label>Profile Pic</label>
            <img class="ml-3" @click="openbox" :src="imgsrc" height="100" width="100">
            <input id="imgchange" v-show="false" type="file" @change="changepic($event)">
        </div>

        <div class="row">
            <div class="col-lg-6">
                <div class="form-group">
                <label>First Name</label>
                <input type="text" class="form-control" v-model="getdata.first_name"  ref="first_name" name="firstname" placeholder="First Name">
        </div>
            </div>

            <div class="col-lg-6">
                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control" v-model="getdata.last_name" ref="last_name" name="lastname" placeholder="Last Name">
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" v-model="getdata.email_id" ref="email_id" name="email" placeholder="Email Address">
        </div>

        <!-- <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" ref="password" name="password" id="exampleInputPassword1" placeholder="Password">
        </div> -->

        <div class="form-group">
            <label>Contact Number</label>
            <input type="text" class="form-control" v-model="getdata.contact_no" ref="contact_no" name="phone" placeholder="Contact Number">
        </div>

        <button type="submit" class="btn btn-primary">Update</button>
    </form>

    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios'
export default {
    name:'Profile',
    data(){
        return{
            profilepic:'',
            imgsrc:this.$imgpath+'profile_pic.png',
        }
    },

    created(){
        this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        this.$store.dispatch('setuserdata',{userid: this.getuserid });
    },

    computed:{
        getuserid(){
          return this.$store.getters.getuserid;
        },
        getdata(){
            let data =  this.$store.getters.getuserdata;
            if(data.profile_photo != '' || data.profile_photo != null){
                this.imgsrc = this.$imgpath+'users/'+data.profile_photo;
            }
            return data;
        }
    },

    methods:{

        openbox(){
            document.getElementById('imgchange').click();
        },

        changepic(event){
            this.profilepic = event.target.files[0];
            this.imgsrc = URL.createObjectURL(this.profilepic);
        },

        saveprofile(){
            let fd = new FormData();
            fd.append('first_name',this.$refs.first_name.value);
            fd.append('last_name',this.$refs.last_name.value);
            fd.append('email_id',this.$refs.email_id.value);
            fd.append('contact_no',this.$refs.contact_no.value);
            fd.append('profile_photo',this.profilepic);
            fd.append('isupdate',true);

            // axios.post('user/registeruser',fd).then((result) => {
                
            // });
        }
    }
}
</script>