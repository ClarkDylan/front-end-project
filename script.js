const apiKey = '5e23915a02e4de0ff91d9759230991bb';
const country = 'us';
const $city = $('#inputCity');
const $state = $('#inputState');
const $searchBtn = $("#searchButton");

$searchBtn.click(function () {
  // used to get lat and long data
  $.get(`http://api.openweathermap.org/geo/1.0/direct?q=${$city.val()},${$state.val()},${country}&appid=${apiKey}`, (geo) => {

    console.log(geo);
    let geoInfo = geo[0]
    let lat = geoInfo.lat
    let long = geoInfo.lon
    function updateWidget() {
      // inputs lat and long to get temp & weather condition
      $.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`, (weatherInfo) => {
        console.log(weatherInfo);

      });
    }
    updateWidget();
  });
})