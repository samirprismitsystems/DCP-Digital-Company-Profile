$(document).ready(function(){

	// $('.workareacity').select2();
	// $("#socialnames").select2();

	// $('#socialnames').change(function(){
	// 	let val = $('#socialnames option:selected').text();
	// 	alert(val);
	// 	$('#wraper').html(val);	
	// });

	// $('#socialnames').change(function(){
	// 	// alert($('#socialnames').val());
	// 	// var selected = [];
	// 	// selected = $('#socialnames').val();
	// 	let divs = '';
	// 	// if ($("#socialnames").select2('data').length){
	// 	  $i = 0;
		  // $.each($("#socialnames").val(), function(key, item){
		  // 	divs += "<div class= form-group><label>"+item+"<span class=text-danger> *</span></label><input class=form-control type=text v-model=companydata.sociallinks["+[$i]+"]/></div>";
		  // 	$i++;
		  // });
	// 	  $('#wraper').html(divs);
	// 	// }
	// });



	function displayResult() {
    var x = document.getElementById("socialnames");
    if(x != null){
      var txt=[];
      var i;
      for (i = 0; i < x.length; i++) {
          txt[i] =  x.options[i].value;
      }
      return txt;
    }
  }


  function arrdiff(a1, a2) {
    var a = [], diff = [];
    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }
    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }
    for (var k in a) {
        diff.push(k);
    }
    return diff;
  }


  // var datahide = displayResult();
  //     for(var i=0;i<datahide.length;i++){
  //         var a3 = "#".concat(datahide[i]);
  //           $("#wraper").find(a3).hide();
  //     }

  // Social box hide
    var data = displayResult();
      if(data != null){
  
      data = data.toString();
      var splitarraydata = data.split(',');
      var valuedata = $('#socialnames').val();

      valuedata = valuedata.toString();
      
      var splitdata = valuedata.split(',');
      if(valuedata==""){
        splitdata="";
      }

      var datahide = displayResult();
      for(var i=0;i<datahide.length;i++){
          var a3 = "#".concat(datahide[i]);
            $("#wraper").find(a3).hide();
      }

      for(var i=0;i<splitarraydata.length;i++){
          var divval = splitdata[i];
            if(typeof(divval) == "undefined"){
              divval = 0;
            }
            if($.inArray(divval,splitarraydata)>-1){
              //alert(divval);
              var a1="#".concat(divval);
              $("#wraper").find(a1).show();
            } 
        }
      }




    $('#socialnames').change(function(){
      
      var data = displayResult();
      data = data.toString();
      var splitarraydata = data.split(',');
      
      var valuedata = $('#socialnames').val();

      valuedata = valuedata.toString();
      var splitdata = valuedata.split(',');
      if(valuedata==""){
        splitdata="";
      }

      // social cost hour hide
      var datahide = displayResult();
      for(var i=0;i<datahide.length;i++){
          var a3 = "#".concat(datahide[i]);
            $("#wraper").find(a3).hide();
      }

      for(var i=0;i<splitarraydata.length;i++){
          var divval = splitdata[i];
        
            if(typeof(divval) == "undefined"){
              divval = 0;
            }
            if($.inArray(divval,splitarraydata)>-1){
              //alert(divval);
              var a1="#".concat(divval);
              $("#wraper").find(a1).show();
            } 
        }

        var ardiff = arrdiff(splitdata,splitarraydata);
        
        for(var j=0;j<ardiff.length;j++){
          value = "#".concat(ardiff[j]);
          var valset ="#wraper > div#".concat(ardiff[j]+" > input:text");
          $(valset).val('');
        }
        
        });


  // console.log(displayResult());








});