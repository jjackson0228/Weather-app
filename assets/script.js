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
// Function to display weather data
function displayWeather(data) {
  weatherList.innerHTML = "";
  const forecasts = data.list.slice(0, 5); // Get the first 5 forecast items

  forecasts.forEach((forecast) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item mb-2 p-3 border-dark";

    const date = new Date(forecast.dt * 1000);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();
    const temp = forecast.main.temp;
    const description = forecast.weather[0].description;

    listItem.innerHTML = `
            <h5>${dateString} ${timeString}</h5>
            <p>Temperature: ${temp} °F</p>
            <p>Condition: ${description}</p>
        `;

    weatherList.appendChild(listItem);
  });
}
