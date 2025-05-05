const weatherApp = (() => {
  const weather = {
    apiKey: "6eac3c09ad7d480b8a2c5a975c606574",
    fetchWeather(city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data))
        .catch((error) => {
          console.error(error);
          alert("Unable to fetch weather data. Please try again.");
        });
    },
    displayWeather(data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;

      document.querySelector(".city").innerText = `Weather in ${name}`;
      document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
      document.querySelector(".icon").alt = `${description} weather icon`;
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = `${temp}°C`;
      document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
      document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
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
    reverseGeocode(latitude, longitude) {
      const query = `${latitude},${longitude}`;
      const url = `https://api.opencagedata.com/geocode/v1/json?key=${this.apiKey}&q=${encodeURIComponent(query)}&pretty=1&no_annotations=1`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Unable to reverse geocode location.");
          }
          return response.json();
        })
        .then((data) => {
          const city = data.results[0]?.components?.city;
          if (city) {
            weather.fetchWeather(city);
          } else {
            throw new Error("City not found in geocoding response.");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Unable to determine your location. Defaulting to Berlin.");
          weather.fetchWeather("Berlin");
        });
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
            weather.fetchWeather("Berlin");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser. Defaulting to Berlin.");
        weather.fetchWeather("Berlin");
      }
    },
  };

  // Event Listeners
  document.querySelector(".search button").addEventListener("click", () => {
    weather.search();
  });

  document.querySelector(".search-bar").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      weather.search();
    }
  });

  // Initialize App
  geocode.getLocation();
})();
