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
      let lat = response.coord.lat;
      let lon = response.coord.lon;
      let cityName = response.name + ` : ` + response.sys.country;
      let tempF = ((response.main.temp - 273.15) * 1.8 + 32).toFixed();
      let humidity = response.main.humidity;
      let windSpeed = response.wind.speed;
      let icon = response.weather[0].icon;
      let iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;

      $("#city-list").after(`<li>${cityName}</li>`);

      $("#current-date").text(currentDate + " ");
      $("#currentCity").text(cityName + ",  ");
      $("#img").attr("src", iconUrl);
      $("#temperature").text("temperature:  " + tempF + "  °F");
      $("#humidity").text("humidity:  " + humidity + "  %");
      $("#windspeed").text("windspeed:  " + windSpeed + "  MPH");
      let uvUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
      fetch(uvUrl)
        .then(function (response1) {
          return response1.json();
        })
        .then(function (response1) {
          let uvVal = response1.value;
          $("#uv").text("UV index:  " + uvVal);
          let i = uvVal;

          if (i < 3) {
            $("#uv").addClass("green");
          } else if (i < 6) {
            $("#uv").addClass("yellow");
          } else if (i < 8) {
            $("#uv").addClass("orange");
          } else if (i < 11) {
            $("#uv").addClass("red");
          } else {
            $("#uv").addClass("purple");
          }
        });
      let fiveUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apiKey}`;
      fetch(fiveUrl)
        .then(function (response2) {
        //   console.log(response2.json());
          return response2.json();
        })
        .then(function (response2) {
          $(".five-days").each(function (index) {
            let dailyForecast = response2.daily[index + 1];
            let dateEl = dailyForecast.dt;
            let day = moment.unix(dateEl).format("l");
            let icon = dailyForecast.weather[0].icon;
            let iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
            let temp = ((dailyForecast.temp.day - 273.15) * 1.8 + 32).toFixed();
            let humidity = dailyForecast.humidity;

            $(this).append(`<ui>${day}<ui>`);
            // $(this).after(`<img "src=" ${iconUrl}/>`);
            $(this).after(`<li>Temperature:  ${temp}  °F </li>`);
            $(this).after(`<li>Humidity:  ${humidity}  % </li>`);
          });
        });
    });
});
function renderCityBtn() {
    for (let i = 0; i < cityWeather.length; i++) {
        let cityBtn = $("<button>").text(cityWeather[i]);
        $(".button-storage").append(cityBtn);

    }
}

