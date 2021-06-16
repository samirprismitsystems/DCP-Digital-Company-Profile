// JavaScript Document

$(document).ready(function () {

var $ = jQuery
  
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
	

/*.tabs-nav*/
// $('.tabs-nav a').on('click', function (event) {
//     event.preventDefault();
    
//     $('.tab-active').removeClass('tab-active');
//     $(this).parent().addClass('tab-active');
//     $('.tabs-stage > .expand_tabs').hide();
//     $($(this).attr('href')).show();
// });
//     $('.btnNext').click(function(){
//     $('.tabs-nav > .tab-active').next('li').find('a').trigger('click');
//   });

//     $('.btnBack').click(function(){
//       $("body").scrollTop(0);
//     $('.tabs-nav > .tab-active').prev('li').find('a').trigger('click');
    
//   });


// $('.tabs-nav a:first').trigger('click'); // Default
	







  });


/*.upload img*/
    function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#get_img').show()
                        .attr('src', e.target.result);
                    $(".upload_img ~ .placeholder_tex").hide();  
                };

                reader.readAsDataURL(input.files[0]);
            }
        }
