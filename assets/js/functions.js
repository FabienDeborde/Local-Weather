$(document).ready(function() {
   // Stuff to do as soon as the DOM is ready
  geoWeather();

   function geoWeather() {
   // Get location of the user
   if (Modernizr.geolocation) {
     $('.msg').text('Checking your location...');
     navigator.geolocation.getCurrentPosition(success, fail);
   } else {
     console.log("Couldn't find your location, make sure to enable JavaScript and accept the request to locate you.");
   }

   // Make the API call


   // Update content


  }


});

/*


http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&units=metric&appid=35187c9e07d9d7aa6b37ca9f15703bc5
http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&units=imperial&appid=35187c9e07d9d7aa6b37ca9f15703bc5
*/
