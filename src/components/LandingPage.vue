<template>
    <div>
            <!--icon-->
    <link rel="icon" href="#" />
    <!--	  fonts-->
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap"
            />
    <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap"
            media="print"
            onload="this.media='all'"
            />
    <noscript>
    <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap"
            />
    </noscript>

    <!--	  offline font-->

    <link href="/src/landingassets/fonts/font.css" rel="stylesheet" defer>
    <link rel="preload" href="/src/landingassets/webfonts/fa-brands-400.woff" as="font">
    <link rel="preload"  href="/src/landingassets/webfonts/fa-brands-400.woff" as="font" type="font/woff" crossorigin="anonymous">
    <link rel="preload"  href="/src/landingassets/webfonts/fa-brands-400.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload"  href="/src/landingassets/webfonts/fa-solid-900.woff" as="font" type="font/woff" crossorigin="anonymous">
    <link rel="preload"  href="/src/landingassets/webfonts/fa-solid-900.woff2" as="font" type="font/woff2" crossorigin="anonymous">

    <!--	  theme-->
    <link href="/src/landingassets/theme/media-query.css" rel="preload" as="style">
    <link href="/src/landingassets/theme/navbar.css" rel="preload" as="style">
    <link href="/src/landingassets/theme/icon.css" rel="preload" as="style">
    <link href="/src/landingassets/theme/animation-on-scroll.css" rel="preload" as="style">
    <link href="/src/landingassets/theme/owl.carousel.min.css" rel="preload" as="style">
    <!--	  style-->
    <link href="/src/landingassets/css/style.css" rel="preload" as="style">
    <link href="/src/landingassets/css/responsive.css" rel="preload" as="style">

    <!--	  theme-->
    <link href="/src/landingassets/theme/media-query.css" rel="stylesheet" defer>
    <link href="/src/landingassets/theme/navbar.css" rel="stylesheet" defer>
    <link href="/src/landingassets/theme/icon.css" rel="stylesheet" defer>
    <link href="/src/landingassets/theme/animation-on-scroll.css" rel="stylesheet" defer>
    <link href="/src/landingassets/theme/owl.carousel.min.css" rel="stylesheet" defer>
    <!--	  style-->
    <link href="/src/landingassets/css/style.css" rel="stylesheet" >
    <link href="/src/landingassets/css/responsive.css" rel="stylesheet">
   
   



<div id="particles-js"></div>

    <!--	  -->
<nav class="navbar navbar-expand-md " id="">
  <div class="container custom_container"> <a class="navbar-brand " href="index.html">
    <h1>DCP</h1>
    </a>
    <div class="navbar-collapse" id="main_nav">
      <div class="offcanvas-header mt-3">
        <button class="btn  btn-close float-right"><i class="fas fa-times"></i></button>
      </div>
      <ul class="navbar-nav ml-auto text-right" id="navbar-scrollspy">
        <li class="nav-item "> <a class="nav-link " href="#hero">Home</a> </li>
        <li class="nav-item "> <a class="nav-link " href="#features">Features</a> </li>
        <li class="nav-item "> <a class="nav-link " href="#contact">Contact</a> </li>
      </ul>
    </div>
    <ul class="login_menu">
      <li class="nav-item "> <router-link to="/login" target="_blank" class="login_btn btn_100 btncolor">login</router-link> </li>
    </ul>
    <button class="navbar-toggler" type="button" data-trigger="#main_nav"><i class="fas fa-bars"></i></button>
  </div>
</nav>


<!-- content -->
<!-- Home -->
<div class="container-fluid hero-section mb-140 " id="hero">
  <svg id="tringle-shape"
 xmlns="http://www.w3.org/2000/svg"
 xmlns:xlink="http://www.w3.org/1999/xlink"
 width="2134px" height="816px">
    <path fill-rule="evenodd"  stroke="rgb(14, 204, 0)" stroke-width="0px" stroke-linecap="butt" stroke-linejoin="miter" fill="rgb(216, 227, 231)"
 d="M1153.475,795.576 C1098.805,821.791 1035.195,821.791 980.525,795.576 L114.568,380.339 C-77.351,288.312 -11.800,-0.000 201.042,-0.000 L1932.958,-0.000 C2145.800,-0.000 2211.351,288.312 2019.432,380.339 L1153.475,795.576 Z"/>
  </svg>
  <div class="container">
    
    <h1>
      {{pagedata.hometitle}}<br>
      <strong v-html="pagedata.homesubtitle"></strong>
    </h1>
    <p v-html="pagedata.homedesc"></p>

    <div class="mobile_mockup ">
      <div class="digital_profile_theme">
        <picture class="d-block" width="378" height="3081">
          <!-- <source srcset="assets/img/mobile_frame_sm.webp" media="(max-width:767px)" type="image/webp"> -->
          <source :srcset="imgsrc+pagedata.homeimg" media="(max-width:1024px)" type="image/webp">
          <source :srcset="imgsrc+pagedata.homeimg" media="(min-width:1025px)" type="image/webp">
          <img  :src="imgsrc+pagedata.homeimg"  width="378" height="3081" alt="Digital Company Profile" title="Digital Company Profile" class="img-responsive  "> </picture>
      </div>
      <picture class="d-block" width="408" height="772" >
        <source srcset="/src/landingassets/img/mobile_frame_sm.webp" media="(max-width:767px)" type="image/webp">
        <source srcset="/src/landingassets/img/mobile_frame.webp" media="(max-width:1024px)" type="image/webp">
        <source srcset="/src/landingassets/img/mobile_frame.webp" media="(min-width:1025px)" type="image/webp">
        <img  src="/src/landingassets/img/mobile_frame.png"  width="408" height="772" alt="Digital Company Profile" title="Digital Company Profile" class="img-fit  "> </picture>
      <div > </div>
    </div>
    <div class="d-table mx-auto mt-3"> <a :href="pagedata.homebtnlink" target="_blank" class="site_btn btn_100 btncolor"> {{pagedata.homebtntitle}} </a> </div>
  </div>
</div>
<!-- Home End-->

<!-- Steps -->
<div class="container-fluid how-it-works mb-140 ">
  <div class="container">
    <div class="row">
      
      <div v-for="(step,index) in steps" :key="index" class="col-md-4 col-sm-4 col-12 scroll-element js-scroll fade-in-bottom">
        <div class="hiw_col gradient-col">
          <div class="hiw-head ">
            <div class="icon-box"><span> {{index+1}} </span></div>
            <h4 v-html="step.stepstitle"></h4>
          </div>
          <div class="hiw-content">
            <p v-html="step.stepsdesc"></p>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
<!-- Steps End -->

<!-- Cards -->
<div class="container-fluid profile_for mb-140">
  <div class="container">
    <div class="row align-items-center profile_for_row">
      <div class="col-md-6 col-sm-12 img-col scroll-element js-scroll fade-in-bottom">
        <div class="profile_for_img">
          <picture class="d-block">
            <source :srcset="imgsrc+pagedata.cardimg1" media="(max-width:767px)" type="image/webp">
            <source :srcset="imgsrc+pagedata.cardimg1" media="(max-width:991px)" type="image/webp">
            <source :srcset="imgsrc+pagedata.cardimg1" media="(min-width:992px)" type="image/webp">
            <img :src="imgsrc+pagedata.cardimg1"  width="623"
						  height="361" alt="Digital Company Profile" title="Digital Company Profile" loading="lazy" class="img-fluid lazyload  "> </picture>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 content-col scroll-element js-scroll fade-in-bottom">
        <div class="profile_for_content">
          <h3 v-html="pagedata.cardtitle1"></h3>
          <p id="listitems" v-html="pagedata.carddesc1"></p>
          <!-- <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
          <ul class="theme_list">
            <li>Lorem ipsum dolor sit amet, </li>
            <li>sed do eiusmod tempor incididunt ut labore</li>
            <li>et dolore magna aliqua Quis ipsum</li>
            <li>suspendisse ultrices gravida. </li>
          </ul> -->
        </div>
      </div>
    </div>
    <div class="row align-items-center profile_for_row">
      <div class="col-md-6 col-sm-12 img-col order_1 scroll-element js-scroll fade-in-bottom">
        <div class="profile_for_img">
          <picture class="d-block">
            <source :srcset="imgsrc+pagedata.cardimg2" media="(max-width:767px)" type="image/webp">
            <source :srcset="imgsrc+pagedata.cardimg2" media="(max-width:991px)" type="image/webp">
            <source :srcset="imgsrc+pagedata.cardimg2" media="(min-width:992px)" type="image/webp">
            <img  :src="imgsrc+pagedata.cardimg2" width="623"
						  height="361" alt="Digital Company Profile" title="Digital Company Profile" loading="lazy" class="img-fluid lazyload "> </picture>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 content-col order_2 scroll-element js-scroll fade-in-bottom">
        <div class="profile_for_content">
          <h3 v-html="pagedata.cardtitle2"></h3>
          <p id="listitems" v-html="pagedata.carddesc2"></p>
          <!-- <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
          <ul class="theme_list">
            <li>Lorem ipsum dolor sit amet, </li>
            <li>sed do eiusmod tempor incididunt ut labore</li>
            <li>et dolore magna aliqua Quis ipsum</li>
            <li>suspendisse ultrices gravida. </li>
          </ul> -->
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Cards End -->

<!-- Features -->
<div class="container-fluid digital_features mb-140" id="features">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-md-5 col-sm-12 col-12 content-col scroll-element js-scroll fade-in-bottom">
        <div class="hedding mb-5">
          <h4 v-html="pagedata.featuretitle"></h4>
          <h3 v-html="pagedata.featuresubtitle"></h3>
        </div>
        <p class="mb-5" v-html="pagedata.featuredesc"></p>
        <a :href="pagedata.featurebtnlink" class="site_btn btn_100 btncolor">{{pagedata.featurebtntitle}}</a> </div>
      <div class="col-md-7 col-sm-12 col-12">
        <div class="row">
          <div v-for="(feature,index) in features" :key="index" class="col-sm-4 col-6 features-col scroll-element js-scroll fade-in-bottom">
            <div class="icon-box"><i :class="feature.featurelogo"></i></div>
            <h5>{{feature.featuretext}}</h5>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
<!-- Features End -->

<!-- FAQ -->
<div class="container-fluid  mb-140">
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-sm-12 content-col"  >
        <div class="hedding mb-5 scroll-element js-scroll fade-in-bottom">
          <h3 v-html="pagedata.faqtitle"></h3>
        </div>
        <p class="mb-5 scroll-element js-scroll fade-in-bottom" v-html="pagedata.faqdesc"></p>
        <div class="accordion scroll-element js-scroll fade-in-bottom">
          
          
          <div class="accordion-item gradient-col" v-for="(acc,index) in accordion" :key="index">
            <button type="button" class="collapsible accordion-title" v-html="acc.title"></button>
            <div class="content">
              <p v-html="acc.desc"></p>
            </div>
          </div>
          
          
        </div>
      </div>
      <div class="col-md-6 col-sm-12 text-center scroll-element js-scroll fade-in-bottom">
        <picture class="d-block">
          <source :srcset="imgsrc+pagedata.faqimg" media="(max-width:767px)" type="image/webp">
          <source :srcset="imgsrc+pagedata.faqimg" media="(min-width:768px)" type="image/webp">
          <source :srcset="imgsrc+pagedata.faqimg" media="(min-width:992px)" type="image/webp">
          <img :src="imgsrc+pagedata.faqimg"  width="413"
						  height="585" alt="Digital Company Profile" title="Digital Company Profile" loading="lazy" class="img-responsive lazyload "> </picture>
      </div>
    </div>
  </div>
</div>
<!-- FAQ End -->

<!-- Free Trial -->
<div class="container-fluid free_trial mb-140">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-md-6 col-sm-12 text-center img-col scroll-element js-scroll fade-in-bottom">
        <picture class="d-block">
          <source :srcset="imgsrc+pagedata.ftimg" media="(max-width:767px)" type="image/webp">
          <source :srcset="imgsrc+pagedata.ftimg" media="(min-width:768px)" type="image/webp">
          <source :srcset="imgsrc+pagedata.ftimg" media="(min-width:992px)" type="image/webp">
          <img  :src="imgsrc+pagedata.ftimg"  width="413"
						  height="585" alt="Digital Company Profile" title="Digital Company Profile" loading="lazy" class="img-responsive lazyload "> </picture>
      </div>
      <div class="col-md-6 col-sm-12 content-col scroll-element js-scroll fade-in-bottom"  >
        <h3 v-html="pagedata.fttitle"></h3>
        <p class="mb-5" v-html="pagedata.ftdesc"></p>
        <a :href="pagedata.ftbtnlink" class="site_btn btn_100 btncolor">Start Now</a> </div>
    </div>
  </div>
</div>
<!-- Free Trail End -->

<!-- testimonial  -->
<div class="container-fluid testimonial_section mb-140">
  <div class="container testimonial_container scroll-element js-scroll fade-in-bottom">
    <div class="row align-items-center">
      <div class="col-md-5 col-sm-12 content-col">
        <div class="hedding mb-5">
          <h4 v-html="pagedata.reviewtitle"></h4>
          <h3 v-html="pagedata.reviewsubtitle"></h3>
        </div>
        <p v-html="pagedata.reviewdesc"></p>
      </div>
      <div class="col-md-7 col-sm-12 slider-col">
        <div class="testimonial-slider owl-carousel owl-theme">
          
          <div class="item" v-for="(review,index) in getreviewdata" :key="index">
            <p class="comment-text" v-html="review.user_message"></p>
            <div class="comment-by"><i class="fas fa-user-circle " style="font-size: 3.6rem;"></i>
              <h4 v-html="review.user_name"></h4>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</div>
<!-- testimonial End -->

<!-- Contact -->
<div class="container-fluid contact mb-140" id="contact">
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 col-sm-12 mx-auto scroll-element js-scroll fade-in-bottom">
        <div class="hedding ">
          <h3 class="text-center" v-html="pagedata.contacttitle"></h3>
          <p class="text-center" v-html="pagedata.contactdesc"></p>
        </div>
      </div>
      <div class="col-lg-8 col-md-10 col-sm-12 mx-auto scroll-element js-scroll fade-in-bottom">
        <form id="get-in-touch" @submit.prevent="submitform">
          <div class="row">
            <div class="col-md-6 col-sm-12">
              <input type="text" v-model="contactname" name="name" placeholder="Your Name" required="">
            </div>
            <div class="col-md-6 col-sm-12">
              <input type="text" v-model="contactemail" name="name" placeholder="Your Email Address" required="">
            </div>
            <div class="col-12">
              <textarea v-model="message" placeholder="Type Message" rows="6" required=""></textarea>
            </div>
            <div class="col-12">
              <button type="submit" value="send" class="site_btn btn_100 d-table mx-auto">SEND</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- {{getsettingdata[1].setting_value}} -->
<!-- Contact End -->

<!-- content --> 

<a href="javascript:void(0)" class="back_to_top"><i class="fas fa-caret-up" style="font-size: 3rem;"></i></a>
<footer v-if="getsettingrequest == 1">
  <section class="first-section">
    <div class="container">
      <div class="row ">
        <div class="col-12 text-center footer-col brand-col scroll-element js-scroll fade-in-bottom">
          <div class="h1 company-logo"><a href="#!"> {{getsettingdata[1].setting_value}} </a></div>
          <h4 class="company-name"> {{getsettingdata[2].setting_value}} </h4>
        </div>
        <div class="col-12 text-center footer-col  social-media-col scroll-element js-scroll fade-in-bottom">
          <ul class="social_media_nav">
            <li class="social_media_item"><a :href="getsettingdata[3].setting_value" class="social_media_link fab fa-facebook-f"></a></li>
            <li class="social_media_item"><a :href="getsettingdata[4].setting_value" class="social_media_link fab fa-instagram"></a></li>
            <li class="social_media_item"><a :href="getsettingdata[5].setting_value" class="social_media_link fab fa-linkedin-in"></a></li>
          </ul>
        </div>
        <div class="col-12 text-center footer-col  quick-menu-col scroll-element js-scroll fade-in-bottom">
          <ul class="footer_nav">
            <li v-for="(pagedata,index) in footerpagesdata" :key="index" class="footer_nav_item"><a :href="'/'+pagedata.page_slug" target="_blank" class="footer_nav_link ">{{pagedata.page_name}}</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <section class="copyright-footer">
    <div class="container custom_container">
      <div class="row align-items-center">
        <div class="col-md-6 col-sm-12  left-col">
          <p>Copyright @2021 <a href="index.html">Digital Company Profile</a>. All rights reserved</p>
        </div>
        <div class="col-md-6 col-sm-12 right-col">
          <p><a href="https://www.prismitsystems.com/">A Prism I. T. Systems Enterprise</a> <img src="/src/landingassets/img/prismitsystems_logo.png"  width="57"
						  height="38" alt="Prism I. T. Systems" title="Prism I. T. Systems"></p>
        </div>
      </div>
    </div>
  </section>
</footer>


   
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'LandingPage',
    data(){
      return{
        data:[],
        pagedata:[],
        steps:[],
        features:[],
        accordion:[],
        pages:[],
        isdata:0,
        imgsrc : this.$imgpath + 'landingpageoriginal/',
        contactname:'',
        contactemail:'',
        message:'',
        footerpagesdata:[],
      }
    },

    computed:{
      getpagedata(){
        let data =  this.$store.getters.getpagesdata;
        return data;
      },
      getpagerequest(){
        return this.$store.getters.getpagesrequest;
      },
      getsettingdata(){
        let data =  this.$store.getters.getsettingdata;
        return data;
      },
      getsettingrequest(){
        return this.$store.getters.getsettingrequest;
      },

      getreviewdata(){
        return this.$store.getters.getuserreviewdata;
      },

    },


    created(){

        let owl = document.createElement('script')
        owl.setAttribute('src', '/src/landingassets/theme/owl.carousel.min.js')
        document.head.appendChild(owl);

        // let owltheme = document.createElement('script')
        // owltheme.setAttribute('src', '/src/landingassets/theme/owl.theme.default.min.js')
        // document.head.appendChild(owltheme);

        let particles = document.createElement('script')
        particles.setAttribute('src', 'http://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js')
        document.head.appendChild(particles);

        let app = document.createElement('script')
        app.setAttribute('src', '/src/landingassets/app.js')
        document.head.appendChild(app);

        let custom = document.createElement('script')
        custom.setAttribute('src', '/src/landingassets/js/custom.js')
        document.head.appendChild(custom);

        let animation = document.createElement('script')
        animation.setAttribute('src', '/src/landingassets/theme/animation-on-scroll.js')
        document.head.appendChild(animation);

        this.$store.dispatch('setsettingdata');
        this.$store.dispatch('setpagesdata');
        this.$store.dispatch('setuserreviewdata',{data:'active'});

        axios.get('pages/getsinglepage/landing-page').then((result)=>{
          // console.log(result.data);
          // this.data = result.data;
          this.pagedata = result.data.page_content;
          this.steps = JSON.parse(result.data.page_content.steps);
          this.features = JSON.parse(result.data.page_content.logoandtext);
          this.accordion = JSON.parse(result.data.page_content.accordian);
          this.pages = JSON.parse(result.data.page_content.footerpages);
          // console.log(this.pages);
          this.isdata = 1;

          let pagelist = new FormData();
          pagelist.append('pages[]',this.pages);
          axios.post('pages/getsomepagedata',pagelist).then((result) => {
            this.footerpagesdata = result.data.pages;
          });

        
        });

    },

    methods:{
      submitform(){
        let email = this.getsettingdata[8].setting_value;
        let fd = new FormData();

        fd.append('email',email);

        fd.append('contactemail',this.contactemail);
        fd.append('name',this.contactname);
        fd.append('message',this.message);

        axios.post('pages/sendemail',fd).then((result)=>{
          this.$swal.fire('Email Sent', result.data.message, 'success');
          this.message = '';
          this.contactname = '';
          this.contactemail = '';
        });

      }
    }


}
</script>

<style scoped>
  .btncolor{
    color: white;
  }
</style>