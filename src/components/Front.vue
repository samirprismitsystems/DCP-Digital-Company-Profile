<template>
<div>
	<!--icon-->
<link rel="icon" href="#" />
<!--	  fonts--> 

<!--	  offline font-->
<link rel="preload"  href="/src/frontassets/webfonts/fa-brands-400.woff" as="font">
<link rel="preload"  href="/src/frontassets/webfonts/fa-brands-400.woff" as="font" type="font/woff" crossorigin="anonymous">
<link rel="preload"  href="/src/frontassets/webfonts/fa-brands-400.woff2" as="font" type="font/woff2" crossorigin="anonymous">
<link rel="preload"  href="/src/frontassets/webfonts/fa-solid-900.woff" as="font" type="font/woff" crossorigin="anonymous">
<link rel="preload"  href="/src/frontassets/webfonts/fa-solid-900.woff2" as="font" type="font/woff2" crossorigin="anonymous">

<!--	  theme-->
<link href="/src/frontassets/theme/media-query.css" rel="preload" as="style">
<link href="/src/frontassets/theme/icon.css" rel="preload" as="style">
<link href="/src/frontassets/theme/owl.carousel.min.css" rel="preload" as="style">
<!--	  style-->
<link href="/src/frontassets/css/style.css" rel="preload" as="style">
<!--	  theme-->
<link href="/src/frontassets/theme/media-query.css" rel="stylesheet" defer>
<link href="/src/frontassets/theme/icon.css" rel="stylesheet" defer>
<link href="/src/frontassets/theme/owl.carousel.min.css" rel="stylesheet" defer>
<!--	  style-->
<link href="/src/frontassets/css/style.css" rel="stylesheet" >



<div class="container-fluid p-0 " id="" v-if="getpagerequest == 1">
  <section id="profile" class="profile-section">
    <div class="container h-100 ">
      <div class="row profile-row">
        <div class=" col-12 text-center">
            <div class="store-logo"> <img :src="imgpath+getfrontdata.company.company_id+'/logo/'+getfrontdata.company.company_logo" width="62" height="49" alt="logo" title="logo-img"  class="img-responsive" /> </div>
          <!-- <div class="store-logo"> <img src="/src/frontassets/img/logo.png" width="62" height="49" alt="logo" title="logo-img"  class="img-responsive" /> </div> -->
        </div>
        <div class="col-12 text-center">
          <h1 class="store-name">{{getfrontdata.company.company_name}}</h1>
          <h4 class="store-tagline">“ {{getfrontdata.company.business_segment}} ”</h4>
        </div>
      </div>
    </div>
  </section>
  <div class="profile-body pt-30" id="top">
    <div class="container store-contact">
      <div class="row justify-content-center">
        
        <div class="col-3 contact-link"> <a :href="'tel:'+getfrontdata.company.company_contact" class="link-icon call-icon"> <i class="fas fa-phone-alt" ></i> </a>
          <p>Call</p>
        </div>
        
        <div class="col-3 contact-link"> <a :href="'https://wa.me/+'+getfrontdata.company.company_contact" class="link-icon whatsapp-icon" target="_blank" rel="noopener"> <i class="fab fa-whatsapp"></i> </a>
          <p>Whatsapp</p>
        </div>

        <div class="col-3 contact-link"> <a :href="'https://www.google.com/maps/search/?api=1&query='+getfrontdata.company.address" class="link-icon location-icon" target="_blank" rel="noopener"> <i class="fas fa-map-marker-alt" ></i> </a>
          <p>Location</p>
        </div>
        <div class="col-3 contact-link"> <a :href="'mailto:'+getfrontdata.company.company_email" class="link-icon mail-icon" > <i class="fas fa-envelope" ></i> </a>
          <p>Mail</p>
        </div>
        <div class="col-3 contact-link">
          <div @click="sharelink('link')" class="link-icon share-icon"  id="share"> <i class="fas fa-share-square" ></i> </div>
          <p>Share</p>
        </div>
        <div class="col-3 contact-link"> <a href="nitin_patel.vcf" class="link-icon save-icon" download > <i class="fas fa-save" ></i> </a>
          <p>Save</p>
        </div>
      </div>
    </div>
    <div class="container"> 
      <!--			whatsapp share-->
      <div class="whatsapp-share-form">
        <form action="https://api.whatsapp.com/send" id="wtsp_share" target="_blank">
          <!--				<label>+91</label>-->
          <input type="text" name="phone" placeholder="WhatsApp Number with Country code	" value="+91">
          <input type="hidden" name="text" :value="companyurl">
          <button type="submit" class="wtsp_share_btn">Share <i class="fab fa-whatsapp"></i> </button>
        </form>
       
      </div>
      
      <!--			Follow us-->
      <div class="follow-us-block mt-30">
        <h3 class="text-center titleClr">Follow Us On</h3>
        <div class="social-links"> 
          <a v-for="(social,index) in getfrontdata.social" :key="index" href="#!" class="social-link fb-icon">
            <i :class="social.socialmedia_logo"></i>
          </a> 
          <!-- <a href="#!" class=" social-link twt-icon"><i class="fab fa-twitter"></i></a> 
          <a href="#!" class=" social-link insta-icon"><i class="fab fa-instagram"></i></a>
          <a href="#!" class=" social-link in-icon"><i class="fab fa-linkedin-in"></i></a> 
          <a href="#!" class=" social-link yt-icon"><i class="fab fa-youtube"></i></a> 
          <a href="#!" class=" social-link tele-icon"><i class="fab fa-telegram-plane" ></i></a> 
          <a href="#!" class=" social-link tumblr-icon"><i class="fab fa-tumblr" ></i></a>  -->
        </div>
      </div>
      
      <!-- about -->
      <div class="about-block " id="about-us">
        <div class="block-title mt-30 mb-30">
          <h3 class="">About</h3>
        </div>
        <div class="content-box">
          <p><strong> Since  {{ dateformat(getfrontdata.company.established_in) }} </strong></p>
          <p>{{getfrontdata.company.company_desc}}</p>
        </div>
      </div>

      <div class="product-block " id="products">
        <div class="block-title mt-30 mb-30">
          <h3 class="">Product</h3>
        </div>
        <div class="row">
          <div class="owl-carousel owl-theme product-slider"> 
          
            <div class="item" v-for="(product,index) in getfrontdata.product" :key="index">
              <div class="content-box product-box">
                <div class="product-img"> <img :data-src="imgpath+getfrontdata.company.company_id+'/product/'+product.product_image" width="156" height="190" alt="product-img" title="product-img" class="lazyload "> </div>
                <div class="product-info">
                  <h4 class="product-title">{{product.product_name}}</h4>
                  <p class="product-description"> {{product.product_desc}} </p>
                  <div class="product-action"> <span class="product-price">Rs. {{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(product.product_price)}} </span> <a href="#" class="site_btn">Buy Now</a> </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      <!--			Services-->
      <div class="services-block " id="services">
        <div class="block-title mt-30 mb-30">
          <h3 class="">Services</h3>
        </div>
        <div class="row">
          <div class="owl-carousel owl-theme services-slider"> 
            
            <div class="item" v-for="(service,index) in getfrontdata.service" :key="index">
              <div class="content-box services-box">
                <div class="services-img"> <img :data-src="imgpath+getfrontdata.company.company_id+'/service/'+service.service_image" width="298" height="199"  alt="services-img" title="services-img" class="lazyload img-fluid"> </div>
                <div class="services-info">
                  <h4 class="services-title titleClr"> {{service.service_name}} </h4>
                  <p class="services-description">{{service.service_desc}}</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      <!--		Gallery-->
      <div class="gallery-block " id="gallery">
        <div class="block-title mt-30 mb-30">
          <h3 class="">Gallery</h3>
        </div>
        <div class="row">
          <div class="owl-carousel owl-theme gallery-slider"> 
            
            <div class="item" v-for="(image,index) in getfrontdata.portfolio" :key="index">
              <div class="content-box gallery-box p-0"> <img :data-src="imgpath+getfrontdata.company.company_id+'/portfolio/'+image.portfolio_image" width="335" height="335"  alt="gallery-img" title="gallery-img" class="lazyload img-fluid" > </div>
            </div>
            
          </div>
        </div>
      </div>
      
      <!--		payment-info-->
      <div class="payment-info-block " id="payment-info">
        <div class="block-title mt-30 mb-30">
          <h3 class="">Payment Info</h3>
        </div>
        <div class="row"> 
          <!--					google pay-->
          <div class="col-12">
            <div class="pay-detail"> <span class="app-name">Google Pay</span>
              <div class="link-icon google-icon"> <img data-src="/src/frontassets/img/google-pay.png" width="35" height="30" alt="Digital Profile" title="Digital Profile" class="lazyload "/> </div>
              <div class="pay-info">
                <dl>
                  <dt>No / UPI .:&nbsp;</dt>
                  <dd> {{getfrontdata.paymentinfo.googlepay_number}} </dd>
                </dl>
              </div>
            </div>
          </div>
          <!--					phone-pe-->
          <div class="col-12">
            <div class="pay-detail"> <span class="app-name">Phone Pe</span>
              <div class="link-icon google-icon"> <img data-src="/src/frontassets/img/phone-pe.png" width="30" height="30" alt="Digital Profile" title="Digital Profile" class="lazyload "/> </div>
              <div class="pay-info">
                <dl>
                  <dt>No / UPI .:&nbsp;</dt>
                  <dd>{{getfrontdata.paymentinfo.phonepay_number}}</dd>
                </dl>
              </div>
            </div>
          </div>
          <!--					Paytm-->
          <div class="col-12">
            <div class="pay-detail"> <span class="app-name">Paytm</span>
              <div class="link-icon google-icon"> <img data-src="/src/frontassets/img/paytm.png" width="35" height="12" alt="Digital Profile" title="Digital Profile" class="lazyload "/> </div>
              <div class="pay-info">
                <dl>
                  <dt>No / UPI .:&nbsp;</dt>
                  <dd>{{getfrontdata.paymentinfo.paytm_number}}</dd>
                </dl>
              </div>
            </div>
          </div>
          <!--					bank info-->
          <div class="col-12">
            <div class="content-box bank-info">
              <h3>Bank Account Details</h3>
              <dl>
                <dt>Name:</dt>
                <dd>{{getfrontdata.paymentinfo.account_holder_name}}</dd>
                <dt>Bank Name:</dt>
                <dd>{{getfrontdata.paymentinfo.bank_name}}</dd>
                <dt>Account Number:</dt>
                <dd>{{getfrontdata.paymentinfo.bank_account_number}}</dd>
                <dt>IFSC Code:</dt>
                <dd>{{getfrontdata.paymentinfo.bank_ifsc_code}}</dd>
                <dt>Account Type:</dt>
                <dd>{{getfrontdata.paymentinfo.account_type}}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      <!--		feedback	-->
      <div class="feedback-block " id="feedback">
        <div class="block-title mt-30 mb-30">
          <h3 class="">Feedback</h3>
        </div>
        <!--				comments-->
        <div class="comments">
          
          <div class="comment-item" v-for="(testimonialdata,index) in getfrontdata.testimonial" :key="index">
            <h5 class="user-name primary">{{testimonialdata.client_name}}</h5>
            <div class="ratings">
              <div class="rat-stars">
                <span v-for="(ratting,index) in parseInt(testimonialdata.ratting)" :key="index" class="rating-star" ><i class="fas fa-star" ></i></span> 
                <!-- <span class="rating-star" ><i class="fas fa-star" ></i></span>
                <span class="rating-star" ><i class="fas fa-star" ></i></span>
                <span class="rating-star" ><i class="fas fa-star" ></i></span>
                <span class="rating-star" ><i class="fas fa-star" ></i></span> -->
              </div>
              <span class="comment-date"> {{ datedayformat(testimonialdata.created_on) }} days ago </span> </div>
            <p class="comment-text"> {{testimonialdata.comment}} </p>
          </div>
         
        </div>
        <div class="content-box feedback-box">
          <h3 class="text-center">Give Your Feedback</h3>
          <form @submit.prevent="addtestimonial" id="feedback-form" class="form">
            <p style="margin-left:40%" class="star-ratings mb-4">
            <star-rating :show-rating="false" :glow="10" :star-size="30" v-model="boundRating"></star-rating>
            </p>
            <input type="text"  id="name" ref="name" name="name" placeholder="Enter Your Name" required>
            <input type="email" id="email" ref="email" name="email" placeholder="Enter Your Email" required>
            <textarea name="comment" ref="comment" placeholder="Enter Your Feedback" rows="5" required></textarea>
            <button type="submit" class="submit-btn">Give Feedback</button>
          </form>
        </div>
      </div>
      
      <!--	enquiry  -->
      <div class="enquiry-block " id="enquiry">
        <div class="block-title mt-30 mb-30">
          <h3 class="">Enquiry Form</h3>
        </div>
        <div class="content-box enquiry-box">
          <h3 class="text-center">Get In Touch</h3>
          <form @submit.prevent="addinquiry" id="enquiry-form" class="form">
            <input type="text" id="iname" ref="iname" name="iname" placeholder="Enter Your Name" required>
            <input type="number" id="iphone" ref="iphone" name="iphone" placeholder="Enter Your Mobile no." required>
            <input type="Email" id="iemail" ref="iemail" name="iemail" placeholder="Enter Your Email " required>
            <textarea placeholder="Enter Your Feedback" rows="5" name="imessage" ref="imessage" required> </textarea>
            <button type="submit" class="submit-btn">Send</button>
          </form>
        </div>
      </div>
      
      <!--			 Direction-->
      <div class="direction-block mt-30" id=" direction">
        <div class="content-box direction-box p-0">
          <div id="map" style="width: 100%; height: 25rem">
            <iframe :src="'https://www.google.com/maps/embed/v1/place?key=AIzaSyBZwDt7DaRbnnOX-Glzg7FJvZ9yCbVHkBQ&q='+getfrontdata.company.address" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
           </div>
        </div>
      </div>
    </div>
  </div>
</div>

<ul class="bottom-nav fixed-bottom">
  <a href="#back" class="site-link back_to_top"> <i class="far fa-arrow-alt-circle-up" ></i> <span>Back to top</span> </a>
  <a href="#about-us" class="site-link scroll-to"> <i class="far fa-user-circle" ></i> <span>About-us</span> </a>
  <a href="#products" class="site-link scroll-to"> <i class="fas fa-shopping-basket" ></i> <span>Products</span> </a>
  <a href="#gallery" class="site-link scroll-to"> <i class="far fa-images" ></i> <span>Gallery</span> </a>
  <a href="#feedback" class="site-link scroll-to"> <i class="far fa-comment-dots"></i> <span>Feedback</span> </a>
</ul>




</div>


</template>

<script>
import axios from 'axios'
import StarRating from 'vue-star-rating'
import moment from 'moment'
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
            options:[
                {id:1,text:'one'},
                {id:2,text:'two'},
                {id:3,text:'three'},
            ],
            getdata:[],
            companyurl:window.location.href,
            imgpath:this.$imgpath
        }
    },
    components:{
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
        },

        getpagerequest(){
          let req =  this.$store.getters.getcompanyfrontreq;
          if(req == 1){
            let carousel = document.createElement('script')
            carousel.setAttribute('src', '/src/frontassets/theme/owl.carousel.min.js')
            document.head.appendChild(carousel);

            let custom = document.createElement('script')
            custom.setAttribute('src', '/src/frontassets/js/custom.js')
            document.head.appendChild(custom);

            let lazysizes = document.createElement('script')
            lazysizes.setAttribute('src', '/src/frontassets/theme/lazysizes.min.js')
            document.head.appendChild(lazysizes);
          }
          return req;
        }
    },

    created(){
        this.$store.dispatch('changetitle',{ title: localStorage.getItem('sitetitle') });
        this.$store.dispatch('setcompanyfront',{slug: this.companyslug });
    },

    methods:{

      datedayformat(date){
        var given = moment(date, "YYYY-MM-DD");
        var current = moment().startOf('day');
        return moment.duration(current.diff(given)).asDays();
      },

      dateformat(date){
       return moment(date).format('YYYY');
      },

      sharelink(link){
        document.getElementById('share').click(function(){
          if (navigator.share) {
            navigator.share({
                title: 'Web Share API Draft',
                text: 'Take a look at this spec!',
                url: 'https://wicg.github.io/web-share/#share-method',
              })
              .then(() => console.log('Successful share'))
              .catch((error) => console.log('Error sharing', error));
          } else {
            console.log('Share not supported on this browser, do it the old way.');
          }
        });
      },

        addtestimonial(){
          
            let fd = new FormData();
            fd.append('client_name',this.$refs.name.value);
            fd.append('email_address',this.$refs.email.value);
            fd.append('ratting',this.boundRating);
            fd.append('comment',this.$refs.comment.value);
            fd.append('company_id',this.getfrontdata.company.company_id);
            fd.append('isupdate',false);

            axios.post('testimonial/createtestimonial',fd).then((result)=>{
              
              this.$swal.fire('FeedBack Submitted Succesfull','' , 'success');
              this.boundRating = 0;
              this.$refs.name.value = '';
              this.$refs.email.value = '';
              this.$refs.comment.value = '';

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
                this.$swal.fire('Inquiry Submitted Succesfull','' , 'success');
                this.$refs.iname.value = '';
                this.$refs.iemail.value = '';
                this.$refs.iphone.value = '';
                this.$refs.imessage.value = '';
            });
        },

    }
}
</script>