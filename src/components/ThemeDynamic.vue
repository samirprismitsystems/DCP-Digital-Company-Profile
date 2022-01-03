<template>
<div>
<link rel="icon" href="#" />
<!--	  fonts--> 
<!--	  offline font-->
<link rel=""  href="/src/homecaretheme/webfonts/fa-brands-400.woff" as="font">
<link rel=""  href="/src/homecaretheme/webfonts/fa-brands-400.woff" as="font" type="font/woff" crossorigin="anonymous">
<link rel=""  href="/src/homecaretheme/webfonts/fa-brands-400.woff2" as="font" type="font/woff2" crossorigin="anonymous">
<link rel=""  href="/src/homecaretheme/webfonts/fa-solid-900.woff" as="font" type="font/woff" crossorigin="anonymous">
<link rel=""  href="/src/homecaretheme/webfonts/fa-solid-900.woff2" as="font" type="font/woff2" crossorigin="anonymous">

<!--	  theme-->
<link href="/src/homecaretheme/theme/media-query.css" rel="stylesheet" defer>
<link href="/src/homecaretheme/theme/icon.css" rel="stylesheet" defer>
<link href="/src/homecaretheme/theme/owl.carousel.min.css" rel="stylesheet" defer>

<!--	  style-->
<link href="/src/homecaretheme/style.css" rel="stylesheet" >



<div class="main">
  <div class="main-container">
    <div class="section  section-1" id="home">
      <div class="col-12 text-center">
        <div class="brand_image">
          <div class="brand-img"> <img src="/src/homecaretheme/img/home-care-logo.png"  alt=" " title="" class="img-logo"> </div>
        </div>
        <h5 class="head-6">Home Care Products</h5>
        <h5 class="link_title">Founder &amp; CEO</h5>
      </div>
    </div>
    <div class="section  section-2 text-center" >
      <div class="row no-wrap">
        <div class="col"> <a href="tel:[9876543210]" class="per_link"> <i class="fas icon-circle fa-phone-alt" ></i> <span class="link_title">Call</span> </a> </div>
        <div class="col"> <a target="_blank"  href="https://api.whatsapp.com/send?phone=9876543210&text=hi" class="per_link"> <i class="fab icon-circle fa-whatsapp"></i> <span class="link_title" > Whatsapp</span> </a> </div>
        <div class="col"> <a target="_blank" href="mailto:example@gmail.com?subject=Enquiry&body=hi" class="per_link"> <i class="fas icon-circle fa-envelope" ></i> <span class="link_title">Mail Us</span> </a> </div>
        <div class="col"> <a target="_blank" href="https://msng.link/o/?Example=fm" class="per_link"> <i class="fab icon-circle fa-facebook-messenger"></i> <span  class="link_title">Website</span> </a> </div>
        <div class="col"> <a target="_blank" href="https://www.google.com/maps?q=example" class="per_link"> <i class="fas icon-circle fa-map-marker-alt" ></i> <span class="link_title">Location</span> </a> </div>
      </div>
    </div>
    <div class="section  section-3"> <a class="personal_info no_column border-top-0 pt-0" style="cursor: default;">
      <div class="per_link "> <i class="fas icon-circle fa-phone-alt "></i> </div>
      <div class="per_text">9876543210</div>
      </a> <a class="personal_info   no_column " style="cursor: default;">
      <div class="per_link"> <i class="fas icon-circle fa-envelope"></i> </div>
      <div class="per_text">contact@example.com</div>
      </a>
      <div class="personal_info   no_column ">
        <div class="per_link"> <i class="fas icon-circle fa-envelope"></i> </div>
        <div class="per_text">Mon - Sat Day: 09.30 to 6.30 - Sunday Closed</div>
      </div>
      <a class="personal_info no_column pb-0" style="cursor: default;">
      <div class="per_link"> <i class="fas icon-circle fa-map-marker-alt "></i> </div>
      <div class="per_text">Surat</div>
      </a> </div>
    <div class="section  section-5 text-center" id="share">
      <form action="https://api.whatsapp.com/send" id="wtsp_share" target="_blank">
        <h4 class="text-center heading">Share your Card</h4>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Name" name="name" value="" >
        </div>
        <div class="form-group">
          <input class="form-control" placeholder="Mobile" name="mobile" value="+91">
        </div>
        <div class="d-table mx-auto">
          <button type="submit" class="btn-primary whatsapp_share_btn"  onclick="subForm()"><i class="fab fa-whatsapp"></i>Share now</button>
        </div>
      </form>
    </div>
    <div class="row mt-4 mb-4">
      <div class="col-6"><a href="nitin_patel.vcf" class="span btn btn-primary w-100 "  download>SAVE CONTACT</a> </div>
      <div class="col-6">
        <div class="dropdown">
          <details class="dropdown_menu">
            <summary class="btn-outline-primary btn-primary">SHARE <i class="fas fa-caret-down" ></i></summary>
            <div class="dropdown_list">
                <a class="dropdown-item" href="whatsapp://send?text=The text to share!"  data-action="share/whatsapp/share">
                    <i class="fab fa-whatsapp "></i>Whatsapp</a>
                <a class="dropdown-item" href="https://facebook.com/sharer/sharer.php?u=#" >
                    <i class="fab fa-facebook-f"></i>Facebook</a>
                <a class="dropdown-item" href="https://twitter.com/share?url=#" >
                    <i class="fab fa-twitter"></i>Twitter</a>
               
              </div>
          </details>
        </div>
      </div>
    </div>
    <div class="section  section-6" id="about">
      <h4 class="text-center heading">About Us</h4>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        <br>
      </p>
      <p class="gst-text"> GST: 29XXXXXXXXX1006</p>
    </div>
    <div class="section  section-7" id="product">
      <h4 class="text-center heading">Our Products</h4>
      <div class="row">
        <div class="col-6 text-center mb-3">
          <div class="product-image"> <img src="/src/homecaretheme/img/Active-Wheel.webp" class="img-fluid"> </div>
          <p class="para-1">Lorem Ipsum</p>
          <p class="para-2">₹ 1200 /<span>1800</span> </p>
          <div class="open">
            <div class="btn-margin btn-group  mb-3">
              <button class="btn-small  btn-primary w-100 mr-1">Quick Enquiry</button>
              <a class="btn-small btn-outline-primary btn-primary w-100" href="#!" target="_blank">Shop Now</a> </div>
          </div>
        </div>
        <div class="col-6 text-center mb-3">
          <div class="product-image"> <img src="/src/homecaretheme/img/additive.jpg" class="img-fluid"> </div>
          <p class="para-1">Lorem Ipsum</p>
          <p class="para-2">₹ 1300 /<span>2000</span> </p>
          <div class="open">
            <div class="btn-margin btn-group  mb-3">
              <button class="btn-small  btn-primary w-100 mr-1">Quick Enquiry</button>
              <a class="btn-small btn-outline-primary btn-primary w-100" href="#!" target="_blank">Shop Now</a> </div>
          </div>
        </div>
        <div class="col-6 text-center mb-3">
          <div class="product-image"> <img src="/src/homecaretheme/img/resized-1.jpeg" class="img-fluid"> </div>
          <p class="para-1">Lorem Ipsum</p>
          <p class="para-2">₹ 2100 /<span>2300</span> </p>
          <div class="open">
            <div class="btn-margin btn-group  mb-3">
              <button class="btn-small  btn-primary w-100 mr-1">Quick Enquiry</button>
              <a class="btn-small btn-outline-primary btn-primary w-100" href="#!" target="_blank">Shop Now</a> </div>
          </div>
        </div>
        <div class="col-6 text-center mb-3">
          <div class="product-image"> <img src="/src/homecaretheme/img/resized-2.jpeg" class="img-fluid"> </div>
          <p class="para-1">Lorem Ipsum</p>
          <p class="para-2">₹ 2300 /<span>2500</span> </p>
          <div class="open">
            <div class="btn-margin btn-group  mb-3">
              <button class="btn-small  btn-primary w-100 mr-1">Quick Enquiry</button>
              <a class="btn-small btn-outline-primary btn-primary w-100" href="#!" target="_blank">Shop Now</a> </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section  section-8" id="document">
      <h4 class="text-center heading">Documents</h4>
      <div class="doc">
        <div class="fa-icon-text"> <i class="fas icon-circle  fa-file-alt "></i> Company Profile </div>
        <div class=" btn-group mt-3"> <a href="#!" class="btn-small  btn-primary w-100 mr-1" target="_blank">View</a> <a href="#!" class=" btn-small btn-outline-primary btn-primary w-100" target="_blank" download>Download</a> </div>
      </div>
      <div class="doc">
        <div class="fa-icon-text"> <i class="fas icon-circle fa-file-alt"></i> ISO Certificate </div>
        <div class=" btn-group mt-3"> <a href="#!" class="btn-small  btn-primary w-100 mr-1" target="_blank">View</a> <a href="#!" class=" btn-small btn-outline-primary btn-primary w-100" target="_blank" download>Download</a> </div>
      </div>
      <div class="doc">
        <div class="fa-icon-text"> <i class="fas icon-circle fa-file-alt"></i> GST Certificate </div>
        <div class=" btn-group mt-3"> <a href="#!" class="btn-small  btn-primary w-100 mr-1" target="_blank">View</a> <a href="#!" class=" btn-small btn-outline-primary btn-primary w-100" target="_blank" download>Download</a> </div>
      </div>
    </div>
    <div class="section  section-9" id="gallery">
      <h4 class="text-center heading">Gallery</h4>
      <div class="row">
        <div class="col-6 col-md-6 pr-smm-1 mb-3">
          <div class="gallery-image "> <img src="https://via.placeholder.com/198x120"> </div>
        </div>
        <div class="col-6 col-md-6 pr-smm-1 mb-3">
          <div class="gallery-image "> <img src="https://via.placeholder.com/198x120"> </div>
        </div>
        <div class="col-6 col-md-6 pr-smm-1 mb-3">
          <div class="gallery-image "> <img src="https://via.placeholder.com/198x120"> </div>
        </div>
        <div class="col-6 col-md-6 pr-smm-1 mb-3">
          <div class="gallery-image "> <img src="https://via.placeholder.com/198x120"> </div>
        </div>
        <div class="col-6 col-md-6 pr-smm-1 mb-3">
          <div class="gallery-image "> <img src="https://via.placeholder.com/198x120"> </div>
        </div>
        <div class="col-6 col-md-6 pr-smm-1 mb-3">
          <div class="gallery-image "> <img src="https://via.placeholder.com/198x120"> </div>
        </div>
      </div>
      <ul class="pagination">
        <li class="disabled"><a class="" href="#" aria-label="Go to first page">«</a> </li>
        <li class="disabled"><a class="" href="#" aria-label="Go to previous page">⟨</a> </li>
        <li class="active"><a class="undefined" href="#" aria-label="Go to page number 1">1</a> </li>
        <li class=""><a class="" href="#" aria-label="Go to page number 2">2</a> </li>
        <li class=""><a class="" href="#" aria-label="Go to next page">⟩</a> </li>
        <li class=""><a class="" href="#" aria-label="Go to last page">»</a> </li>
      </ul>
    </div>
    <div class="section  " id="services">
      <h4 class="text-center heading">services</h4>
      <div class="row">
        <div class="col-6 col-md-6 pr-smm-1 mb-3">
          <div class="gallery-image "> <img src="https://via.placeholder.com/198x120"> </div>
          <p>Lorem Ipsum</p>
        </div>
        <div class="col-6 col-md-6 pr-smm-1 mb-3">
          <div class="gallery-image "> <img src="https://via.placeholder.com/198x120"> </div>
          <p>Lorem Ipsum</p>
        </div>
        <div class="col-6 col-md-6 pr-smm-1 mb-3">
          <div class="gallery-image "> <img src="https://via.placeholder.com/198x120"> </div>
          <p>Lorem Ipsum</p>
        </div>
        <div class="col-6 col-md-6 pr-smm-1 mb-3">
          <div class="gallery-image "> <img src="https://via.placeholder.com/198x120"> </div>
          <p>Lorem Ipsum</p>
        </div>
        <div class="col-6 col-md-6 pr-smm-1 mb-3">
          <div class="gallery-image "> <img src="https://via.placeholder.com/198x120"> </div>
          <p>Lorem Ipsum</p>
        </div>
        <div class="col-6 col-md-6 pr-smm-1 mb-3">
          <div class="gallery-image "> <img src="https://via.placeholder.com/198x120"> </div>
          <p>Lorem Ipsums</p>
        </div>
      </div>
    </div>
    <div class="section  section-10" id="video">
      <h4 class="text-center heading">Videos</h4>
      <div class="row">
        <div class="col-6 col-md-6 pr-smm-1 mb-3">
          <video width="198" height="120" autoplay muted poster="assets/img/video-placeholder.jpg">
            <source src="#" type="videp/mp4">
          </video>
        </div>
        <div class="col-6 col-md-6 pr-smm-1 mb-3">
          <video width="198" height="120" autoplay muted poster="assets/img/video-placeholder.jpg">
            <source src="#" type="videp/mp4">
          </video>
        </div>
        <div class="col-6 col-md-6 pr-smm-1 mb-3">
          <video width="198" height="120" autoplay muted poster="assets/img/video-placeholder.jpg">
            <source src="#" type="videp/mp4">
          </video>
        </div>
        <div class="col-6 col-md-6 pr-smm-1 mb-3">
          <video width="198" height="120" autoplay muted poster="assets/img/video-placeholder.jpg">
            <source src="#" type="videp/mp4">
          </video>
        </div>
        <div class="col-6 col-md-6 pr-smm-1 mb-3">
          <video width="198" height="120" autoplay muted poster="assets/img/video-placeholder.jpg">
            <source src="#" type="videp/mp4">
          </video>
        </div>
        <div class="col-6 col-md-6 pr-smm-1 mb-3">
          <video width="198" height="120" autoplay muted poster="assets/img/video-placeholder.jpg">
            <source src="#" type="videp/mp4">
          </video>
        </div>
      </div>
    </div>
    <div class="section payment_detail_sec  section-11" id="payment">
      <h4 class="text-center heading">Payment Details</h4>
      <div class="row no-gutter mb-3"	> <i class="fas icon-circle  fa-user-circle "></i>
        <div class="payment_label"><strong>A/C Name:</strong> Acount Holder Name</div>
      </div>
      <div class="row no-gutter mb-3"> <i class="fas icon-circle  fa-hashtag "></i>
        <div class="payment_label"><strong>A/C Number:</strong> 0082802030410</div>
      </div>
      <div class="row no-gutter mb-3"> <i class="fas icon-circle  fa-university "></i>
        <div class="payment_label"><strong>Bank Name:</strong> Nation Bank</div>
      </div>
      <div class="row no-gutter mb-3"> <i class="fas icon-circle  fa-money-check "></i>
        <div class="payment_label"><strong>IFSC:</strong> NAT0002505</div>
      </div>
      <div class="row no-gutter mb-3">
        <div class="icon-circle"> <img class="" src="assets/img/gpay.svg"> </div>
        <div class="payment_label"><strong>Google Pay:</strong>ex@okicici</div>
      </div>
      <div class="row no-gutter mb-3">
        <div class="icon-circle"> <img class="" src="assets/img/phonepe.svg"> </div>
        <div class="payment_label"><strong>PhonePe:</strong>98 765 43 210</div>
      </div>
      <div class="row no-gutter mb-3">
        <div class="icon-circle"> <img class="" src="assets/img/paytm.svg"> </div>
        <div class="payment_label border-0"><strong>Paytm:</strong> 1000000006</div>
      </div>
    </div>
    <div class="section  section-13" id="location">
      <h4 class="text-center heading">Google Map</h4>
      <div class="row">
        <div class="col-md-12">
          <iframe src="https://maps.google.com/maps?q=41.8781136,-87.6297982&amp;z=15&amp;output=embed" width="100%" height="450" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0" style="border: 0px;"></iframe>
        </div>
      </div>
    </div>
    <div class="section  section-15" id="enquiry">
      <h4 class="text-center heading">Enquiry Form</h4>
      <form>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Name" name="name" value="">
        </div>
        <div class="form-group">
          <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
          <input type="number" class="form-control" placeholder="Mobile" name="mobile" value="">
        </div>
        <div class="form-group">
          <textarea class="form-control" rows="4" placeholder="Message" name="message"></textarea>
        </div>
        <div class=" form-group d-table mx-auto">
          <button type="submit" class="btn-primary"><i class="fas fa-paper-plane"></i>Submit</button>
        </div>
      </form>
    </div>
    <div class="section footer text-center">
      <p class="mb-0"><span>Made with <i class="fas fa-heart" style="color: red"></i> by </span> <a href="#" target="_blank"> <img src="/src/homecaretheme/img/home-care-logo.png" width="120px"> </a> </p>
    </div>
    <div class="section  section-16 text-center">
      <div class="owl-carousel owl-theme navs_slider">
        <div class="item "> <a href="#home"> <i class="fas icon-circle  fa-home "></i> <span class="link_title">Home</span> </a> </div>
        <div class="item "> <a href="#about"> <i class="fas icon-circle  fa-info "></i> <span class="link_title">About Us</span> </a> </div>
        <div class="item "> <a href="#product"> <i class="fas icon-circle  fa-box-open "></i> <span class="link_title">Products</span> </a> </div>
        <div class="item "> <a href="#document"> <i class="fas icon-circle  fa-file-alt "></i> <span class="link_title">Documents</span> </a> </div>
        <div class="item "> <a href="#gallery"> <i class="fas icon-circle  fa-images "></i> <span class="link_title">Gallery</span> </a> </div>
        <div class="item "> <a href="#services"> <i class="fas icon-circle  fa-cog "></i> <span class="link_title">Services</span> </a> </div>
        <div class="item "> <a href="#video"> <i class="fab icon-circle  fa-youtube "></i> <span class="link_title">Video</span> </a> </div>
        <div class="item "> <a href="#payment"> <i class="fas icon-circle  fa-credit-card "></i> <span class="link_title">Payment</span> </a> </div>
        <div class="item "> <a href="#location"> <i class="fas icon-circle  fa-map-marker-alt "></i> <span class="link_title">location</span> </a> </div>
        <div class="item "> <a href="#enquiry"> <i class="far icon-circle  fa-question-circle "></i> <span class="link_title">Enquiry</span> </a> </div>
      </div>
    </div>
  </div>
</div>




</div>
</template>

<script>
export default {
    name:"ThemeDynamic",

    created(){

        let jquery = document.createElement('script')
        jquery.setAttribute('src', '/src/homecaretheme/theme/jquery.min.js')
        document.body.appendChild(jquery);

        let carousel = document.createElement('script')
        carousel.setAttribute('src', '/src/homecaretheme/theme/owl.carousel.min.js')
        document.body.appendChild(carousel);

        let custom = document.createElement('script')
        custom.setAttribute('src', '/src/homecaretheme/js/custom.js')
        document.body.appendChild(custom);

    }
}
</script>


<style>
:root {
    --primaryClr: 15, 159, 123;
    --textClr: #93959d;
}
</style>