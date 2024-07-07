const apiKey = "c9c176ed5db5d1a1b6feca11f17d9684";
// current weather conditions based on city using api
async function getWeatherData(city) {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  // fetching current data and forcast
  const [currentResponse, forecastResponse] = await Promise.all([
    fetch(currentWeatherUrl),
    fetch(forecastUrl),
  ]);

  const currentData = await currentResponse.json();
  const forecastData = await forecastResponse.json();
  // returning data of current and forcast
  return { currentData, forecastData };
}
// displaying weather with icon and temp humidity and wind speed
function displayCurrentWeather(data) {
  const { name, dt, weather, main, wind } = data;
  const date = new Date(dt * 1000).toLocaleDateString();
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;
  const temperature = main.temp;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  // creating container  to show data
  $("#current-weather").html(`
    <h2>Current Weather in ${name}</h2>
    <p>${date}</p>
    <img src="${iconUrl}" alt="${weather[0].description}">
    <p>Temperature: ${temperature} °C</p>
    <p>Humidity: ${humidity} %</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `);
}
// dispaly forecast using data.list and some variabels including creating container with data in it
function displayForecast(data) {
  const forecastHtml = data.list
    .slice(0, 5)
    .map((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
      const temperature = item.main.temp;
      const humidity = item.main.humidity;
      const windSpeed = item.wind.speed;

      return `
      <div class="col-md-2">
        <p>${date}</p>
        <img src="${iconUrl}" alt="${item.weather[0].description}">
        <p>Temp: ${temperature} °C</p>
        <p>Humidity: ${humidity} %</p>
        <p>Wind: ${windSpeed} m/s</p>
      </div>
    `;
    })
    .join("");

  $("#forecast").html(`
    <h2>5-Day Forecast</h2>
    <div class="row">${forecastHtml}</div>
  `);
}
// added function to add search history to local storage
function addToSearchHistory(city) {
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!searchHistory.includes(city)) {
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }
  displaySearchHistory();
}

// added function to display search history
function displaySearchHistory() {
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  $("#search-history").html(
    searchHistory
      .map(
        (city) => `
    <button class="btn btn-secondary btn-block" onclick="searchCity('${city}')">${city}</button>
  `
      )
      .join("")
  );
}
// function to search city by city then add data from that city to display and search history
function searchCity(city) {
  getWeatherData(city).then(({ currentData, forecastData }) => {
    displayCurrentWeather(currentData);
    displayForecast(forecastData);
    addToSearchHistory(city);
  });
}
//added functions to call when page is loaded to show city with a if loop and then display search history
$(document).ready(function () {
  $("#city-form").submit(function (event) {
    event.preventDefault();
    const city = $("#city-input").val().trim();
    if (city) {
      searchCity(city);
      $("#city-input").val("");
    }
  });

  displaySearchHistory();
});
