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

        // all lines below create new elements with api data
        let $img = $(`<img class="weatherIcon" src="/assets/${weatherInfo.weather[0].main}.png">`)
        $img.appendTo('#weatherResults');

        let $temp = $(`<h1 class="temp">${weatherInfo.main['temp']}°F</h1>`);
        $temp.appendTo('#weatherResults');

        let $condition = $(`<h1 class="condition">${weatherInfo.weather[0].description.toUpperCase()}</h1>`);
        $condition.appendTo('#weatherResults');

        let $city = $(`<h2 class="city">${weatherInfo.name.toUpperCase()}</h2>`);
        $city.appendTo('#weatherResults');
      });
    }
    updateWidget();
  });
})