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


          // updates image based on weather condition
          let $img = $(`<img class="weatherIcon" src="/assets/${weatherInfo.weather[0].main}.png">`)
          $img.appendTo('#weatherResults');

          // converts temp data to celcius for late use (dependent on user choice)
          let farToCel = ((weatherInfo.main['temp'] - 32) * 5) / 9
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
          let $condition = $(`<h1 class="condition">${weatherInfo.weather[0].description.toUpperCase()}!</h1>`);
          $condition.appendTo('#weatherResults');

          // displays city of weather condition
          let $city = $(`<h2 class="city">${weatherInfo.name.toUpperCase()}</h2>`);
          $city.appendTo('#weatherResults');

        } else if ($selector.val() == 'forecast') {

          $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`, (forecast) => {
            console.log(forecast);

            //replaces placeholder div with blank div
            $('#weatherResults').replaceWith('<div id="weatherResults"></div>');


            // adds forecast icons
            let $dayOneImg = $(`<img class="forecastIcon" src="/assets/${forecast.list[0].weather[0].main}.png">`);
            let $dayOneDiv = $('<div class="imgDiv"></div>');
            $dayOneDiv.appendTo('#weatherResults');
            $dayOneImg.appendTo($dayOneDiv);

            let $dayTwoImg = $(`<img class="forecastIcon" src="/assets/${forecast.list[5].weather[0].main}.png">`);
            let $dayTwoDiv = $('<div class="imgDiv"></div>');
            $dayTwoDiv.appendTo('#weatherResults');
            $dayTwoImg.appendTo($dayTwoDiv);

            let $dayThreeImg = $(`<img class="forecastIcon" src="/assets/${forecast.list[13].weather[0].main}.png">`);
            let $dayThreeDiv = $('<div class="imgDiv"></div>');
            $dayThreeDiv.appendTo('#weatherResults');
            $dayThreeImg.appendTo($dayThreeDiv);

            let $dayFourImg = $(`<img class="forecastIcon" src="/assets/${forecast.list[21].weather[0].main}.png">`);
            let $dayFourDiv = $('<div class="imgDiv"></div>');
            $dayFourDiv.appendTo('#weatherResults');
            $dayFourImg.appendTo($dayFourDiv);

            let $dayFiveImg = $(`<img class="forecastIcon" src="/assets/${forecast.list[29].weather[0].main}.png">`);
            let $dayFiveDiv = $('<div class="imgDiv"></div>');
            $dayFiveDiv.appendTo('#weatherResults');
            $dayFiveImg.appendTo($dayFiveDiv);

            // adds high low temp data
            let $fBtn = $('#fDegrees');
            let $cBtn = $('#cDegrees');

            let avgHigh = (forecast.list[0].main.temp_max + forecast.list[5].main.temp_max + forecast.list[13].main.temp_max + forecast.list[21].main.temp_max + forecast.list[29].main.temp_max) / 5

            let avgLow = (forecast.list[0].main.temp_min + forecast.list[5].main.temp_min + forecast.list[13].main.temp_min + forecast.list[21].main.temp_min + forecast.list[29].main.temp_min) / 5

            if ($cBtn[0].checked) {
              let $highLowTempAvg = $(`<h1 class="forecastTemp">Avg. High: ${Math.floor(Math.floor((avgHigh - 32) * 5 / 9))}°C | Avg. Low: ${Math.floor((avgLow - 32) * 5 / 9)}°C</h1>`);
              $highLowTempAvg.prependTo('#weatherResults');
            } else {
              let $highLowTempAvg = $(`<h1 class="forecastTemp">Avg. High: ${Math.floor(forecast.list[0].main.temp_max)}°F | Avg. Low: ${Math.floor(forecast.list[0].main.temp_min)}°F</h1>`);
              $highLowTempAvg.prependTo('#weatherResults');
            }

            // adds forecast conditions
            let $dayOneCondition = $(`<h1 class="forecastCondition">Day One: ${forecast.list[0].weather[0].description.toUpperCase()}</h1>`)
            $dayOneCondition.appendTo($dayOneDiv);

            let $dayTwoCondition = $(`<h1 class="forecastCondition">Day Two: ${forecast.list[5].weather[0].description.toUpperCase()}</h1>`)
            $dayTwoCondition.appendTo($dayTwoDiv);

            let $dayThreeCondition = $(`<h1 class="forecastCondition">Day Three: ${forecast.list[13].weather[0].description.toUpperCase()}</h1>`)
            $dayThreeCondition.appendTo($dayThreeDiv);

            let $dayFourCondition = $(`<h1 class="forecastCondition">Day Four: ${forecast.list[21].weather[0].description.toUpperCase()}</h1>`)
            $dayFourCondition.appendTo($dayFourDiv);

            let $dayFiveCondition = $(`<h1 class="forecastCondition">Day Five: ${forecast.list[29].weather[0].description.toUpperCase()}</h1>`)
            $dayFiveCondition.appendTo($dayFiveDiv);

            // adds city
            let $forecastCity = $(`<h2 class="forecastCity">${forecast.city.name.toUpperCase()}</h2>`)
            $forecastCity.appendTo('#weatherResults');

          });
        }
      });
    }
    updateWidget();
  });
})