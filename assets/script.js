document.addEventListener("DOMContentLoaded", function () {
  // added api key below
  const apiKey = "c9c176ed5db5d1a1b6feca11f17d9684";
  //   added search form and city input and weather list
  const searchForm = document.getElementById("search-form");
  const cityInput = document.getElementById("city-input");
  const weatherList = document.getElementById("weather-list");

  // Function to get coordinates by city name
  function getCoordinates(city) {
    return fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          throw new Error("City not found");
        }
        return {
          lat: data[0].lat,
          lon: data[0].lon,
        };
      });
  }
});
// Function to get weather data by coordinates
function getWeather(lat, lon) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  ).then((response) => response.json());
}
