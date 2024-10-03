// Get API endpoint from OpenWeatherMap
const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';

// Get mock API endpoint
const MOCK_API_ENDPOINT = 'http://localhost:3000/api/cities';

// Get current weather data from mock API
async function getCurrentWeather(city) {
  const response = await fetch(`${MOCK_API_ENDPOINT}/${city}`);
  const data = await response.json();
  return data.weather.current;
}

// Get 7-day forecast data from mock API
async function getForecast(city) {
  const response = await fetch(`${MOCK_API_ENDPOINT}/${city}`);
  const data = await response.json();
  return data.weather.forecast;
}

// Render current weather data
function renderCurrentWeather(data) {
  const currentWeatherHTML = `
    <p>Temperature: ${data.temperature}°C</p>
    <p>Humidity: ${data.humidity}%</p>
    <p>Wind Speed: ${data.windSpeed} km/h</p>
    <p>Weather Description: ${data.weatherDescription}</p>
  `;
  document.getElementById('current-weather-data').innerHTML = currentWeatherHTML;
}

// Render 7-day forecast data
function renderForecast(data) {
  const forecastHTML = `
    <ul>
      ${data.map((day) => `
        <li>
          <p>Date: ${day.date}</p>
          <p>High Temperature: ${day.highTemperature}°C</p>
          <p>Low Temperature: ${day.lowTemperature}°C</p>
          <p>Weather Description: ${day.weatherDescription}</p>
        </li>
      `).join('')}
    </ul>
  `;
  document.getElementById('forecast-data').innerHTML = forecastHTML;
}

// Handle search by city
document.getElementById('search-btn').addEventListener('click', async () => {
  const city = document.getElementById('city-input').value;
  const currentWeatherData = await getCurrentWeather(city);
  const forecastData = await getForecast(city);
  renderCurrentWeather(currentWeatherData);
  renderForecast(forecastData);
});

// Initialize chart library
const chart = new Chart(document.getElementById('chart'), {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Temperature',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Update chart data
async function updateChartData(city) {
  const forecastData = await getForecast(city);
  const temperatureData = forecastData.map((day) => day.highTemperature);
  chart.data.labels = forecastData.map((day) => day.date);
  chart.data.datasets[0].data = temperatureData;
  chart.update();
}

// Update chart on search
document.getElementById('search-btn').addEventListener('click', async () => {
  const city = document.getElementById('city-input').value;
  await updateChartData(city);
});
