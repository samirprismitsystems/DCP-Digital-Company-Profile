// JavaScript Document

jQuery(document).ready(function () {

    var $ = jQuery

/*1. back_to_top*/

  jQuery(window).scroll(function(){
    if (jQuery(this).scrollTop()>300){
       jQuery('.back_to_top').fadeIn('1000');
    }else{
      jQuery('.back_to_top').fadeOut('1000');
    }

  });

  jQuery('.back_to_top').click(function(){
    jQuery('html, body').animate({scrollTop:0}, 1500);
  });

/*2. scrollspy*/

    $(".navbar a.nav-link").click( function() {

      var target = $(this).attr("href");
      $("body, html").animate({
        scrollTop: $(target).offset().top - 150
      }, 1000);
      return false;
    });






/*3.fixed navbar*/ 
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
          $(".navbar").addClass("fixed");
        } else {
            $(".navbar").removeClass("fixed");
        }
    });

  
  /*4. responsivev menu*/
  jQuery("[data-trigger]").on("click", function () {
    var trigger_id = jQuery(this).attr('data-trigger');
    jQuery(trigger_id).toggleClass("show");
    jQuery('body').toggleClass("offcanvas-active");
  });

  // close button 
  jQuery(".btn-close").click(function (e) {
   jQuery(".navbar-collapse").removeClass("show");
    jQuery("body").removeClass("offcanvas-active");
  });

  jQuery("nav.navbar .nav-link").click(function (e) {
    jQuery(".navbar-collapse").removeClass("show");
    jQuery("body").removeClass("offcanvas-active");
  });


/*5.lazyLoad*/

	document.addEventListener("DOMContentLoaded", function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  let active = false;

  const lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");

            lazyImages = lazyImages.filter(function(image) {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          }
        });

        active = false;
      }, 200);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
});

	
/*6. accordion*/

var acc = document.getElementsByClassName("collapsible")
const toggleAccordian = (acc, open = !acc.classList.contains('active')) => {
  acc.classList.toggle('active', open)
  const panel = acc.nextElementSibling
  panel.style.maxHeight = open ? panel.scrollHeight + "px" : null
}
const elems = Array.from(acc)
elems.forEach(a => {
  a.addEventListener('click', () => {
    elems
      .filter(e => e !== a)
      .forEach(e => toggleAccordian(e, false))
    toggleAccordian(a)
  })
})


/*7. Slider*/ 

$('.testimonial-slider').owlCarousel({
    rewind:true,
    margin:10,
    nav:false,
    items:1,
    autoplay:true,
    autoplayTimeout:3000,
    smartSpeed:1000,
    autoplayHoverPause:true

})



  });

/*scrollspy*/	

window.addEventListener('DOMContentLoaded', () => {

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (entry.intersectionRatio > 0) {
        document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('active');
      } else {
        document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('active');
      }
    });
  });

  // Track all sections that have an `id` applied
  document.querySelectorAll('div[id]').forEach(section => {
    observer.observe(section);
  });

});
//# sourceURL=pen.js