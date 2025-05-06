const DEFAULT_CITY = "Berlin";
const WEATHER_API_BASE = "https://api.openweathermap.org/data/2.5/weather";
const GEOCODE_API_BASE = "https://api.opencagedata.com/geocode/v1/json";

const weatherApp = (() => {
  const weather = {
    apiKey: "6eac3c09ad7d480b8a2c5a975c606574",
    async fetchWeather(city) {
      const url = `${WEATHER_API_BASE}?q=${city}&units=metric&appid=${this.apiKey}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("No weather found.");
        }
        const data = await response.json();
        weather.displayWeather(data);
      } catch (error) {
        console.error(error);
        alert("Unable to fetch weather data. Please try again.");
      }
    },
    displayWeather(data) {
      const { name } = data;
      const weatherInfo = data.weather?.[0];
      const { temp, feels_like, temp_min, temp_max, humidity } = data.main || {};
      const { speed } = data.wind || {};
      const { sunrise, sunset } = data.sys || {};

      if (!name || !weatherInfo || temp === undefined || feels_like === undefined || temp_min === undefined || temp_max === undefined || humidity === undefined || speed === undefined || sunrise === undefined || sunset === undefined) {
        alert("Incomplete weather data received. Please try again.");
        return;
      }

      const { icon, description } = weatherInfo;

      // Convert sunrise and sunset times from UNIX timestamp to a readable format
      const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const sunsetTime = new Date(sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      document.querySelector(".city").innerText = `Weather in ${name}`;
      document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
      document.querySelector(".icon").alt = `${description} weather icon`;
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = `${temp}°C`;
      document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
      document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
      document.querySelector(".feels-like").innerText = `Feels like: ${feels_like}°C`;
      document.querySelector(".temp-range").innerText = `Min/Max: ${temp_min}°C / ${temp_max}°C`;
      document.querySelector(".sunrise").innerText = `Sunrise: ${sunriseTime}`;
      document.querySelector(".sunset").innerText = `Sunset: ${sunsetTime}`;
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = `url('https://picsum.photos/1600/900?random=${name}')`;
    },
    search() {
      const city = document.querySelector(".search-bar").value.trim();
      if (city) {
        this.fetchWeather(city);
      } else {
        alert("Please enter a city name.");
      }
    },
  };

  const geocode = {
    apiKey: "2e5a18c12828485393d26e6248d633f8",
    async reverseGeocode(latitude, longitude) {
      const query = `${latitude},${longitude}`;
      const url = `${GEOCODE_API_BASE}?key=${this.apiKey}&q=${encodeURIComponent(query)}&pretty=1&no_annotations=1`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Unable to reverse geocode location.");
        }
        const data = await response.json();
        const city = data.results[0]?.components?.city;
        if (city) {
          weather.fetchWeather(city);
        } else {
          throw new Error("City not found in geocoding response.");
        }
      } catch (error) {
        console.error(error);
        alert(error.message || "An unexpected error occurred. Please try again.");
      }
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.reverseGeocode(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.error(error);
            alert("Geolocation permission denied. Defaulting to Berlin.");
            weather.fetchWeather(DEFAULT_CITY);
          }
        );
      } else {
        alert("Geolocation is not supported by your browser. Defaulting to Berlin.");
        weather.fetchWeather(DEFAULT_CITY);
      }
    },
  };

  // Event Listeners
  document.querySelector(".search button").addEventListener("click", () => {
    weather.search();
  });

  let debounceTimer;
  document.querySelector(".search-bar").addEventListener("keyup", (event) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (event.key === "Enter") {
        weather.search();
      }
    }, 300); // 300ms debounce delay
  });

  // Initialize App
  document.addEventListener("DOMContentLoaded", () => {
    geocode.getLocation();
  });
})();
