$(document).ready(function () {
  var currentDate = moment().format("LL");
  let apiKey = "f61c25ccc3ebc66abfbc574449b8e000";
  let searchedCity;

  $("#btn-citySearch").click(function () {
    event.preventDefault();
    searchedCity = $("#citySearch-inp").val().trim();
    getWeatherByCity();
  });
  getWeatherByCity();
  function getWeatherByCity() {
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

        $("#city-list").after(
          `<p class= text-center id = cityItem>${cityName}</p>`
        );
        $(".btn-clear").click(function () {
            $("#cityItem").empty(); 
        });

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
          .then(function (response3) {
            $(".each-day").each(function (index) {
              let Resdata = response3.daily[index + 1];
              let dateElem = Resdata.dt;
              let day = moment.unix(dateElem).format("l");
              let icon = Resdata.weather[0].icon;
              let iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
              let temp = ((Resdata.temp.day - 273.15) * 1.8 + 32).toFixed();
              let humidity = Resdata.humidity;
              $(this).empty();
              let newFiveDays = $(this).append(
                `<p class = col-6 >${day}</p><img src="${iconUrl}"><p class = col-6 >Temperature:  ${temp}  °F </p><p class = col-6 >Humidity:  ${humidity}  % </p>`
              );
            });
          });
      });
    $("#city-list").each(function () {
      $("#cityItem").click(function () {
        event.preventDefault();
        cityItem= $("#cityItem").val().trim();
        getWeatherByCity(cityItem);
      });
    });
    // });
  }
  // $("#cityItem").each(function () {

  // });
});
