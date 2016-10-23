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

    // Store the geodata into variables
      var longitude = '';
      var latitude = '';
      var townName = '';
      var countryName = '';
    // Make the AJAX call
      $.ajax({
        type: "GET",
        url: "http://ip-api.com/json",
        timeout: 2000
      ,
      beforeSend: function(){
        msgEl.text('Checking your location...');
      },
      success: function(data){
        longitude = data.lon;
        latitude = data.lat;
        townName = data.city;
        countryName = data.country;
        weatherQuery(longitude, latitude, townName, countryName);
      },
      error: function(data){
        msgEl.html("<span class=\"error\">Couldn't find your location, make sure to accept the request to locate you.</span>");
        // More precise message for debug purpose
        console.log(msg);
        console.log('error code: ' + msg.code + ' / error message: ' + msg.message);
      }
      });


    // If geolocation is enabled & geodata retrieved
    function weatherQuery(longitude, latitude, townName, countryName){
      msgEl.fadeOut(500);

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
            town.text(townName);
            country.text(', ' + countryName);
            weather.text(data.weather[0].main);
            icon.html('<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png" alt="' + data.weather[0].main + ' icon"</img>');
            description.text(data.weather[0].description);
            $('.temperature').css('display', 'block');

              // Insert the right unit symbol after the temperature
            if (unit === 'metric') {
              temperature.text(data.main.temp + '°C');
            } else if (unit === 'imperial') {
              temperature.text(data.main.temp + '°F');
            } else {
              temperature.text(data.main.temp + 'K');
            }
              // Display time
              var dt = new Date();
              var minutes = dt.getMinutes();
              if (minutes < 10){
                minutes = '0' + minutes;
              }
              var time = dt.getHours() + ':' + minutes;
              $('#time').text(time);

              // Change background image depending of the weather
            var imgUrl = '';
            switch (data.weather[0].icon) {
              case '01d':
              case '01n':
                imgUrl = 'https://fabiendeborde.github.io/Local-Weather/assets/img/sunny.jpg';
                break;
              case '02d':
              case '02n':
              case '03d':
              case '03n':
              case '04d':
              case '04n':
                imgUrl = 'https://fabiendeborde.github.io/Local-Weather/assets/img/cloudy.jpg';
                break;
              case '09d':
              case '09n':
              case '10d':
              case '10n':
                imgUrl = 'https://fabiendeborde.github.io/Local-Weather/assets/img/rainy.jpg';
                break;
              case '11d':
              case '11n':
                imgUrl = 'https://fabiendeborde.github.io/Local-Weather/assets/img/storm.jpg';
                break;
              case '13d':
              case '13n':
                imgUrl = 'https://fabiendeborde.github.io/Local-Weather/assets/img/snow.jpg';
                break;
              case '50d':
              case '50n':
                imgUrl = 'https://fabiendeborde.github.io/Local-Weather/assets/img/mist.jpg';
                break;
              default:
                imgUrl = 'https://fabiendeborde.github.io/Local-Weather/assets/img/weather.jpeg';
            }
            $('.container').css('background-image', 'url(' + imgUrl + ')');
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

    }  // end of weatherQuery()

  }  // end of geoWeather()

});  // end of ready()
