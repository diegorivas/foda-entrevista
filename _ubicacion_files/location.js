 var map = false;
    var marker;
    var geocoder;
    var myLatlng = new google.maps.LatLng(-16.4032354, -71.50478348);   
    var array;
    var count = 0;
    var n;
    function load() {

      geocoder = new google.maps.Geocoder();
      array = new Array();
      var myOptions = 
      {
        center: myLatlng,
        zoom: 16,
        navigationControlOptions: {
          style: google.maps.NavigationControlStyle.SMALL
        },
        disableDefaultUI        : true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
        
       map = new google.maps.Map( document.getElementById("location-map") , myOptions);
      
      drawmarker();
      }

   function drawmarker() {     
        
      geocoder.geocode({'latLng': myLatlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          marker = new google.maps.Marker({
           position: myLatlng,
           map: map,              
           draggable:true,
           icon: 'http://maps.google.com/mapfiles/kml/pushpin/purple-pushpin.png'
          });

          google.maps.event.addListener(marker, 'dragend', function() {
            geocodePosition(marker.getPosition());
          });
          geocodePosition(marker.getPosition());
        } else {
          alert('No results found');
        }
      } else {
          alert('Geocoder failed due to: ' + status);
        }
      });
   }

  function geocodePosition(pos) {
    var address, district, city;
    geocoder.geocode({
      latLng: pos
    }, function(responses) {
      if (responses && responses.length > 0) {

        if (responses[1]) {
          for (var i = 0; i < responses.length; i++) {
              if (responses[i].types[0] == "locality") {
                district = responses[i].address_components[0].short_name;
                city = responses[i].address_components[1].short_name;
              }
            
          }
        }

       address = responses[0].formatted_address.split(',', 1);    
       
      } 

      $('#inputAddress').val(address);
      $('#inputDistrict').val(district);
      $('#inputCity').val(city);
      var item = [pos, address, district, city];
      n = count;
      array[count] = item;
      count++;

    });
  }

  function back() {
    
    if(0 < n)
    {
      n--;
      var pos = array[n][0];
      var address = array[n][1];
      var district = array[n][2];
      var city = array[n][3];

      marker.setPosition(pos);
      $('#inputAddress').val(address);
      $('#inputDistrict').val(district);
      $('#inputCity').val(city);
      map.setCenter(pos);
      map.setZoom(16);
      count = n + 1;
    }
  }
