$(document).ready(function() {
   // Stuff to do as soon as the DOM is ready
  geoWeather();

  function geoWeather() {

    // Declare all the element variables
    var msgEl = $('#customMsg');
    var town = $('.town');
    var country = $('#country');
    var weather = $('#weather');
    var icon = $('#icon');
    var description = $('#description');
    var temperature = $('#temperature');

   // Get location of the user
    // Check if the user has geolocation enabled
    if (Modernizr.geolocation) {
      msgEl.text('Checking your location...');
      navigator.geolocation.getCurrentPosition(success, fail);
    } else {
      msgEl.html("<span class=\"error\">Couldn't find your location, make sure to accept the request to locate you.</span>");
    }

    // If geolocation is enabled & geodata retrieved
    function success(position){
      msgEl.fadeOut(500);

      // Store the geodata into variables
      var longitude = position.coords.longitude;
      var latitude = position.coords.latitude;

      // Make the API call

      ajaxReq('imperial'); // Default call when user load the page (with imperial units by default)

      function ajaxReq(unit) {
        var unit = unit; // Get the unit of the request
        // Build the request url with custom longitude/latitude and units
        var urlQuery = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=' + unit + '&appid=35187c9e07d9d7aa6b37ca9f15703bc5';

        $.ajax({
          type: "GET",
          url: urlQuery, //Pass the custom url
          timeout: 2000,
          beforeSend: function(){
            msgEl.text('Loading data...'); // Display a message while its loading
          },
          complete: function(){
            msgEl.text(''); // Delete the loading message
          },
          success: function(data){
            // Update content
            town.text(data.name);
            country.text(', ' + data.sys.country);
            weather.text(data.weather[0].main);
            icon.html('<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png" alt="' + data.weather[0].main + ' icon"</img>');
            description.text(data.weather[0].description);

              // Insert the right unit symbol after the temperature
            if (unit === 'metric') {
              temperature.text(data.main.temp + '°C');
            } else if (unit === 'imperial') {
              temperature.text(data.main.temp + '°F');
            } else {
              temperature.text(data.main.temp + 'K');
            }
          },
          error: function(data){
            msgEl.html("<span class=\"error\">An error occured while retrieving data. Please try again later.</span>"); // Display an error message if the ajax request failed
          }

        });  // end of ajax()

      };  // end of ajaxReq()

      // Button script
      var convert = $('a#convert'); // Get the button
      convert.on('click', function(e){ // On click
        e.preventDefault(); // Prevent default behavior
        if(convert.text() === 'To Celsius'){ // Change the text and call ajaxReq to get the corresponding unit data
          convert.text('To Fahrenheit');
          ajaxReq('metric');
        } else if (convert.text() === 'To Fahrenheit') {
          convert.text('To Celsius');
          ajaxReq('imperial');
        }
      })

    }  // end of success()

    // If geolocation is enabled & geodata failed
    function fail(msg){
      msgEl.html("<span class=\"error\">Couldn't find your location, make sure to accept the request to locate you.</span>");
      // More precise message for debug purpose
      console.log(msg);
      console.log('error code: ' + msg.code + ' / error message: ' + msg.message);
    }

  }  // end of geoWeather()

});  // end of ready()
