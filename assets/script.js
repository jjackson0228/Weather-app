document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "YOUR_API_KEY";
  const lat = "YOUR_LATITUDE";
  const lon = "YOUR_LONGITUDE";
  // api key fetch below
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  )
    //   then statements giving fucntions of the document and datalist
    .then((response) => response.json())
    .then((data) => {
      const weatherList = document.getElementById("weather-list");
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
                    <p>Temperature: ${temp} °C</p>
                    <p>Condition: ${description}</p>
                `;
        // append the list item of the city
        weatherList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching weather data:", error));
});
