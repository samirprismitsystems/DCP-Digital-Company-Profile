<template>

<section class="main">
	<div class="container-fluid ">
		<div class="row no-wrap">

      	<DashData />

		<div v-if="getpagerequest == 1 && getcompanyid != ''" class=" right_sidebar_content">

			<div class="tabs-stage">
                <div id="tab-6" class="expand_tabs">
			    	<div class="tab_title">
				        <div class="h2">Payment Options</div>
				        <div class="h4">Please fill up the detail to create your profile</div>
			    	</div>
			    	<form id="" @submit.prevent="savepaymentoptions" class="payment_option_form form_shadow">
			    		<div class="row">
			    			<div class="col-xl-9  col-lg-8 col-md-7  col-sm-12 form-col">
				    			<div class="form_field">
									<label class="" >PayTm Number (Optional)</label>
									<input v-model="getpagedata.paytm_number" name="paytm" ref="paytm" class="" value="" type="text" placeholder="Paytm Number" >
								</div>
								<div class="form_field">
									<label class=" " >Google Pay (Optional)</label>
									<input v-model="getpagedata.googlepay_number" name="google-pay" ref="gpay" class="" value="" type="text" placeholder="Google Pay Number / UPI ID" >
								</div>
								<div class=" form_field">
									<label class="" >PhonePe (Optional)</label>
									<input v-model="getpagedata.phonepay_number" name="PhonePe" ref="phonepay" class="" value="" type="text" placeholder="PhonePe Number / UPI ID" >
								</div>
								
								
			    			</div>
			    			<!-- col-md-9 form-col-->
			    			<div class="col-xl-3 col-lg-4 col-md-5 col-sm-5 col-10 private_img_col">
			    				<div class="upload_private_img_box upi_qr_img">
			    					<div class="upload_here">
			    						<img id="" class="upload_img qr-code-img" :src="imgsrc" alt="image" />
			    					</div>
			    					<p class="red" >Image Required* 250KB max size</p>
			    					<div class="upload_btn btn_100 site_btn mb-0 w-100">
			    						<input type='file' @change="changepic($event)" class="choose" />
			    					Upload logo file
			    					</div>
			    				</div>
							</div>	
			    		</div>
			    		<!--  razorpay-->
			    		<div class="razorpay sub_form">
			    			<h3 class="form_sub_title">Razorpay Checkout Settings:</h3>
							<!-- 			    			<div class="activation"><h5>Enable Razorpay Checkout </h5>
				    			 <button type="button" class="switch">
										<input type="checkbox" checked="">
										<span class="slider round"></span>
								</button>
							 </div> -->
			    		<div class=" form_field">
							<label class="" >Key ID</label>
							<input name="key-id" v-model="getpagedata.razorpay_key_id" ref="rzpkeyid" class="" value="" type="text" placeholder="e.g. test_df0025g6s96s0rs" >
						</div>
						<div class=" form_field">
							<label class="" >Key Secret</label>
							<input name="key-secret" v-model="getpagedata.razorpay_key_secret" ref="rzpkeysecret" class="" value="" type="text" placeholder="e.g. test_df0025g6s96s0rs" >
						</div>

						</div>

						<!--  Bank Account-->
						<div class="bank_detail sub_form">
			    			<h3 class="form_sub_title">Bank Account Details:</h3>
			    		
						<div class=" form_field">
							<label class="" >Bank Name (Optional)</label>
							<input name="bank-name" v-model="getpagedata.bank_name" ref="bankname" class="" value="" type="text" placeholder="Bank Name. Ex. HDFC, SBI etc" >
						</div>
						<div class=" form_field">
							<label class="" >Account Holder Name (Optional)</label>
							<input name="holder-name" v-model="getpagedata.account_holder_name" ref="acchname" class="" value="" type="text" placeholder="Account Holder Name" >
						</div>
						<div class=" form_field">
							<label class="" >Bank Account Number (Optional)</label>
							<input name="account-number" v-model="getpagedata.bank_account_number" ref="accno" class="" value="" type="text" placeholder="Account Number" >
						</div>
						<div class=" form_field">
							<label class="" >Bank IFSC Code (Optional)</label>
							<input name="ifsc code" v-model="getpagedata.bank_ifsc_code" class="" ref="ifsc" value="" type="text" placeholder="IFSC Code" >
						</div>
						<div class=" form_field">
							<label class="" >Account Type (Optional)</label>
							<select v-model="acctype" class="account-type">
								<option value="saving">Saving Account</option>
								<option value="current">Current Account</option>
								<option value="salary">Salary Account</option>
							</select>
						</div>

						</div>
						
						<div class="form_btn_field">
							<button type="submit" class="form_btn btn_200  ">Save Changes</button>
							<button type="submit" class=" form_btn btn_100  ">Done</button>
						</div>

			    	</form>

			    </div>


            </div>
            </div>
        </div>
        
    </div>
	</section>
    
</template>

<script>
import axios from 'axios'
import DashData from './DashData'
export default {
    name:'PaymentOptions',
    components:{
        DashData
    },
    data(){
        return{
            acctype:'saving',
            isupdate:false,
			imgsrc:require('../assets/img/qr-code.png'),
			ischangepic:false,
			qrcode:null,
			logo:'',
        }
    },

    computed:{
        getuserid(){
          return this.$store.getters.getuserid;
        },
        getpageinfo(){
          return this.$store.getters.getsitetitle;
        },

		getcompanyid(){
			return this.$store.getters.getcompanyid;
		},

        getpagerequest(){
          return this.$store.getters.getpaymentpage;
        },
        getpagedata(){
            let data =  this.$store.getters.getpaymentoptionsdata;
            // console.log(data);
            if(data.length != 0 && this.getcompanyid != ''){
                if(data != null){
                    this.acctype = data.account_type;
                    this.isupdate = true;
					if(data.qrcode != null && data.qrcode != ''){
						this.logo = data.qrcode;
						let path = this.$imgpath+ this.getcompanyid +'/qrcode/'+data.qrcode;
                		this.imgsrc = path;
					}
                }
            }
            return data;
        },
    },

    created(){
		if(this.getcompanyid == ''){
            this.$router.push('/dashboard/company');
        }
		this.$store.dispatch('changetitle',{title:localStorage.getItem('sitetitle')});
        if(this.getpagerequest == 0){
            this.$store.dispatch('setcompanydata',{id: this.getuserid});
            this.$store.dispatch('setallsocialdata');
            this.$store.dispatch('setsocialdata',{id: this.getuserid});
            this.$store.dispatch('setcitiesdata');
            this.$store.dispatch('setproductdata',{id: this.getuserid });
            this.$store.dispatch('setservicedata',{id: this.getuserid });
            this.$store.dispatch('setClientData',{id: this.getuserid } );
            this.$store.dispatch('setportfolioData',{id: this.getuserid });
            this.$store.dispatch('settestimonialData',{id: this.getuserid } );
            this.$store.dispatch('setinquiryData',{id: this.getuserid } );
            this.$store.dispatch('setpaymentoptions',{id:this.getuserid});
        }
    },

    methods:{

		changepic(event){
            this.qrcode = event.target.files[0];
            this.imgsrc = URL.createObjectURL(this.qrcode);
            this.ischangepic = true;
        },

        savepaymentoptions(){
            let fd = new FormData();
            fd.append('paytm_number',this.$refs.paytm.value);
            fd.append('googlepay_number',this.$refs.gpay.value);
            fd.append('phonepay_number',this.$refs.phonepay.value);
            fd.append('razorpay_key_id',this.$refs.rzpkeyid.value);
            fd.append('razorpay_key_secret',this.$refs.rzpkeysecret.value);
            fd.append('bank_name',this.$refs.bankname.value);
            fd.append('account_holder_name',this.$refs.acchname.value);
            fd.append('bank_account_number',this.$refs.accno.value);
            fd.append('bank_ifsc_code',this.$refs.ifsc.value);
            fd.append('account_type',this.acctype);
            fd.append('user_id',this.getuserid);

			if(this.ischangepic == true){
               fd.append('qrcode',this.qrcode);
               this.ischangepic = false;
            }

            if(this.isupdate == true){
                fd.append('isupdate',true);
				fd.append('logo',this.logo);
            }
            else{
                fd.append('isupdate',false);
            }

            axios.post('company/savepaymentoptions',fd).then((result) => {
                this.$store.dispatch('setpaymentoptions',{id:this.getuserid});
                this.$swal.fire('Data Updated', result.data.message, 'success');
            });
            
        }
    }
}
</script>