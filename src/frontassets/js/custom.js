// JavaScript Document

$(document).ready(function() {

  var $ = jQuery

  jQuery(document).ready(function() {
    jQuery('.wtsp_share_btn').on('click', function() {
      jQuery('#wtsp_share').submit();
    })

  });

  /*1. back_to_top*/

  jQuery('.back_to_top').click(function() {
    jQuery('html, body').animate({
      scrollTop: 0
    }, 1500);
  });

  /*2. scrollspy*/

  $("a.scroll-to").click(function() {
    var target = $(this).attr("href");
    $("body, html").animate({
      scrollTop: $(target).offset().top
    }, 1500);
    return false;
  });

  var sectionIds = $('a.scroll-to');

  $(document).scroll(function() {
    sectionIds.each(function() {

      var container = $(this).attr('href');
      var containerOffset = $(container).offset().top;
      var containerHeight = $(container).outerHeight();
      var containerBottom = containerOffset + containerHeight;
      var scrollPosition = $(document).scrollTop();

      if (scrollPosition < containerBottom - 20 && scrollPosition >= containerOffset - 20) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }


    });
  });


  /*3.fixed navbar*/
  // $('#share').on('click', () => {
  //   if (navigator.share) {
  //     navigator.share({
  //         title: 'Web Share API Draft',
  //         text: 'Take a look at this spec!',
  //         url: 'https://wicg.github.io/web-share/#share-method',
  //       })
  //       .then(() => console.log('Successful share'))
  //       .catch((error) => console.log('Error sharing', error));
  //   } else {
  //     console.log('Share not supported on this browser, do it the old way.');
  //   }
  // });

  /*5.lazyLoad*/


  /*6. accordion*/


  /*7. Slider*/

  $('.product-slider').owlCarousel({
    rewind: true,
    margin: 0,
    nav: false,
    dot: false,
    items: 1.3,
    center: true,
    autoplay: true,
    autoplayTimeout: 3000,
    smartSpeed: 1000,
    autoplayHoverPause: true

  });

  $('.services-slider').owlCarousel({
    rewind: true,
    margin: 0,
    nav: false,
    dot: false,
    items: 1.3,
    center: true,
    autoplay: true,
    autoplayTimeout: 4000,
    smartSpeed: 1000,
    autoplayHoverPause: true

  });


  $('.gallery-slider').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dot: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    smartSpeed: 1200,
    autoplayHoverPause: true

  });

});