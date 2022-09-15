const apiKey = '5e23915a02e4de0ff91d9759230991bb';
const country = 'us';
const $userCity = $('#inputCity');
const $userState = $('#inputState');
const $searchBtn = $('#searchButton');
const $selector = $('#displaySelector')

$searchBtn.click(function () {
  //  gets lat and long data from geo API
  $.get(`http://api.openweathermap.org/geo/1.0/direct?q=${$userCity.val()},${$userState.val()},${country}&appid=${apiKey}`, (geo) => {

    let geoInfo = geo[0]
    let lat = geoInfo.lat
    let long = geoInfo.lon

    function updateWidget() {
      // inputs lat and long to get temp & weather condition from weather api
      $.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`, (weatherInfo) => {

        if ($selector.val() == 'today') {

          //replaces placeholder div with blank div
          $('#weatherResults').replaceWith('<div id="weatherResults"></div>');

          // converts temp data to celcius for late use (dependent on user choice)
          let farToCel = ((weatherInfo.main['temp'] - 32) * 5) / 9

          // updates image based on weather condition
          let $img = $(`<img class="weatherIcon" src="/assets/${weatherInfo.weather[0].main}.png">`)
          $img.appendTo('#weatherResults');

          let $fBtn = $('#fDegrees');
          let $cBtn = $('#cDegrees');

          // checks value of radio buttons allowing user to choose temp unit
          if ($cBtn[0].checked) {
            let $temp = $(`<h1 class="temp">${Math.floor(farToCel)}°C</h1>`);
            $temp.appendTo('#weatherResults');
          } else {
            let $temp = $(`<h1 class="temp">${Math.floor(weatherInfo.main['temp'])}°F</h1>`);
            $temp.appendTo('#weatherResults');
          }

          // updates condition of day
          let $condition = $(`<h1 class="condition">${weatherInfo.weather[0].description.toUpperCase()}</h1>`);
          $condition.appendTo('#weatherResults');

          // displays city of weather condition
          let $city = $(`<h2 class="city">${weatherInfo.name.toUpperCase()}</h2>`);
          $city.appendTo('#weatherResults');

        } else if ($selector.val() == 'forecast') {

          $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`, (forecast) => {
            console.log(forecast);

            //replaces placeholder div with blank div
            $('#weatherResults').replaceWith('<div id="weatherResults"></div>');

            let $dayOneImg = $(`<img class="forecastIcon" src="/assets/${forecast.list[0].weather[0].main}.png">`)
            $dayOneImg.appendTo('#weatherResults');

            let $dayTwoImg = $(`<img class="forecastIcon" src="/assets/${forecast.list[5].weather[0].main}.png">`)
            $dayTwoImg.appendTo('#weatherResults');

            let $dayThreeImg = $(`<img class="forecastIcon" src="/assets/${forecast.list[13].weather[0].main}.png">`)
            $dayThreeImg.appendTo('#weatherResults');

            let $dayFourImg = $(`<img class="forecastIcon" src="/assets/${forecast.list[21].weather[0].main}.png">`)
            $dayFourImg.appendTo('#weatherResults');

            let $dayFiveImg = $(`<img class="forecastIcon" src="/assets/${forecast.list[29].weather[0].main}.png">`)
            $dayFiveImg.appendTo('#weatherResults');

          });
        }
      });
    }
    updateWidget();
  });
})