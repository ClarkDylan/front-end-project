const apiKey = '5e23915a02e4de0ff91d9759230991bb';
const country = 'us';
const $userCity = $('#inputCity');
const $userState = $('#inputState');
const $searchBtn = $("#searchButton");

$searchBtn.click(function () {
  //  gets lat and long data from geo API
  $.get(`http://api.openweathermap.org/geo/1.0/direct?q=${$userCity.val()},${$userState.val()},${country}&appid=${apiKey}`, (geo) => {

    let geoInfo = geo[0]
    let lat = geoInfo.lat
    let long = geoInfo.lon

    function updateWidget() {
      // inputs lat and long to get temp & weather condition from weather api
      $.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`, (weatherInfo) => {

        //replaces placeholder div with blank div
        $('#weatherResults').replaceWith('<div id="weatherResults"></div>');

        // converts temp data to celcius for late use (dependent on user choice)
        let fToC = ((weatherInfo.main['temp'] - 32) * 5) / 9

        // updates image based on weather condition
        let $img = $(`<img class="weatherIcon" src="/assets/${weatherInfo.weather[0].main}.png">`)
        $img.appendTo('#weatherResults');

        let $fBtn = $('#fDegrees');
        let $cBtn = $('#cDegrees');

        // checks value of radio buttons allowing user to choose temp unit
        if ($cBtn[0].checked) {
          let $temp = $(`<h1 class="temp">${Math.floor(fToC)}°C</h1>`);
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
      });
    }
    updateWidget();
  });
})