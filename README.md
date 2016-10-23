# Local Weather App
*(Part of [FreeCodeCamp](http://www.freecodecamp.com/) challenges)*

A simple app to display the weather based on your geolocation data.
Using Modernizr to check if the user has the geolocation feature and then checking if the data has been retrieved.
With the retrieved location data, make an AJAX call to openweathermap API, retrieve the corresponding weather data, and display it.
Add a button to convert from Celsius to Fahrenheit (by passing it to the ajax call with a different parameter).

(You might get an error on github pages because of https security layer).

(I had to make multiples branches because of the way GitHub and CodePen manage assets paths. I also had to make some modifications to get the geolocation data on CodePen because Chrome deprecated the geolocation method over http and I couldn't use the weather API with https so I was getting errors. I used instead http://ip-api.com/json to retrieve the geodata, but the data are a bit less precise.)

You can check the app working on [GitHub](https://fabiendeborde.github.io/Local-Weather/) or on [CodePen] (http://codepen.io/fabien_d/full/vXbKYv/)
