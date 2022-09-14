const apiKey = '5e23915a02e4de0ff91d9759230991bb';
const country = 'us';
const $city = $('#inputCity');
const $state = $('#inputState');
const $searchBtn = $("#searchButton");

$searchBtn.click(function () {
  $.get(`http://api.openweathermap.org/geo/1.0/direct?q=${$city.val()},${$state.val()},${country}&appid=${apiKey}`, (data) => {

    console.log(data);
  });
})