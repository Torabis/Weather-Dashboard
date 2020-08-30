var currentDate = moment().format("LL");
let apiKey = "f61c25ccc3ebc66abfbc574449b8e000";

$("#btn-citySearch").click(function () {
  event.preventDefault();
  let searchedCity = $("#citySearch-inp").val().trim();
  let todayUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}`;
  fetch(todayUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      let lat = response.coord.lat;
      let lon = response.coord.lon;
      let cityName = response.name + ` : ` + response.sys.country;
      let tempF = ((response.main.temp - 273.15) * 1.8 + 32).toFixed();
      let humidity = response.main.humidity;
      let windSpeed = response.wind.speed;
      let icon = response.weather[0].icon;
      let iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;

      $("#current-date").text(currentDate + " ");;
      $("#currentCity").text(cityName + ",  ");
      $("#img").attr("src", iconUrl);
      $("#temperature").text("temperature:  " + tempF + "  °F");
      $("#humidity").text("humidity:  " + humidity + "  %");
      $("#windspeed").text("windspeed:  " + windSpeed + "  MPH");
    });
});
