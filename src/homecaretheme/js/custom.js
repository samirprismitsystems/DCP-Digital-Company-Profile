// JavaScript Document

$(document).ready(function() {

  var $ = jQuery

	$(".navs_slider").owlCarousel({
		nav:true,
		items:5,
        dot: false
	})

  $(".navs_slider a").click(function() {
    var target = $(this).attr("href");
    $("body, html").animate({
      scrollTop: $(target).offset().top - 40
    }, 1500);
    return false;
  });


    jQuery('.whatsapp_share_btn').on('click', function() {
      jQuery('#wtsp_share').submit();
    })


});