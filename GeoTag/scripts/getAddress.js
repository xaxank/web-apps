var geocoder;
var map;
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(28.6139391, 77.20902120000005);
  var mapOptions = {
    zoom: 15,
    center: latlng
  }
  map = new google.maps.Map( $('#map-canvas').get(0) , mapOptions);
}


function codeAddressAjax() {
  var address = $('#address').val();
$('#info').css("visibility","hidden");
  $.ajax({
    url:'http://maps.googleapis.com/maps/api/geocode/json',
    dataType : 'json',
    type:'GET',
    data:{
      'address': address
    },
    success : function(results,status){
      $('#lat').val(results['results'][0].geometry.location.lat);
      $('#long').val(results['results'][0].geometry.location.lng);
      $('#fullAddress').val(results['results'][0].formatted_address);

      map.setCenter(results['results'][0].geometry.location);
      var marker = new google.maps.Marker({
       map: map,
       position: results['results'][0].geometry.location
     });
    },
    error : function(error){
      alert("but nothing happened"+error.status);
    }
  });
}

function codeAddressAPI(){
 var address = $('#address').val();
 $('#info').css("visibility","hidden");
 geocoder.geocode( { 'address': address}, function(results, status) {

  if (status == google.maps.GeocoderStatus.OK) {
    map.setCenter(results[0].geometry.location);
    var marker = new google.maps.Marker({
      map: map,
      position: results[0].geometry.location
    });

    $('#lat').val(results[0].geometry.location.lat());
    $('#long').val(results[0].geometry.location.lng());
    cordAddress();
    $('#fullAddress').val(results[0].formatted_address);
  } else {
    alert('Geocode was not successful for the following reason: ' + status);
  }
});
}

function myAddress(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success);

  }else{
    error('geolocation not available');
  }
}

function success(position){
 $('#info').css("visibility","visible");
 $('#lat').val(position.coords.latitude);
 $('#long').val(position.coords.longitude);
}

function cordAddressAjax() {
  var lat = $('#lat').val();
  var lng = $('#long').val();

  $.ajax({
    url:'http://maps.googleapis.com/maps/api/geocode/json',
    dataType : 'json',
    type:'GET',
    data:{
      'latlng': lat+","+lng
    },
    success : function(results,status){
      $('#fullAddress').val(results['results'][0].formatted_address);
      map.setCenter(results['results'][0].geometry.location);
      var marker = new google.maps.Marker({
       map: map,
       position: results['results'][0].geometry.location
     });
    },
    error : function(error){
      alert("but nothing happened"+error.status);
    }
  });
}

function cordAddressAPI(){

 var lat = $('#lat').val();
 var lng = $('#long').val();
 var latlng = new google.maps.LatLng(lat,lng);

 geocoder.geocode( { 'latLng': latlng }, function(results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
    map.setCenter(results[1].geometry.location);
    map.setZoom(15);
    
    var marker = new google.maps.Marker({
      map: map,
      position: results[1].geometry.location
    }); 
    $('#fullAddress').val(results[1].formatted_address);
  } else {
    alert('Geocode was not successful for the following reason: ' + status);
  }
});
 
}


google.maps.event.addDomListener(window, 'load', initialize);
