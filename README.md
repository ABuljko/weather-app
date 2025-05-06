# Weather App

A simple weather application that fetches and displays real-time weather data for any city using the OpenWeatherMap API. The app also supports geolocation to fetch weather data for the user's current location.

## Features

- Search for weather information by city name.
- Automatically fetch weather data for the user's current location using geolocation.
- Displays:
  - Temperature
  - Feels Like Temperature
  - Minimum and Maximum Temperatures
  - Weather Description
  - Humidity
  - Wind Speed
  - Sunrise and Sunset Times
- Dynamic background images based on the city.
- Responsive design for mobile and desktop devices.

## Technologies Used

- **HTML**: Structure of the application.
- **CSS**: Styling and responsive design.
- **JavaScript**: Logic for fetching and displaying weather data.
- **OpenWeatherMap API**: For weather data.
- **OpenCage Geocoder API**: For reverse geocoding.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd weather-app
   ```

3. Open `index.html` in your browser to run the app.

## Usage

- Enter a city name in the search bar and press the search button or hit "Enter".
- Allow location access to fetch weather data for your current location.
- View the weather details including:
  - Temperature
  - Feels Like Temperature
  - Minimum and Maximum Temperatures
  - Weather Description
  - Humidity
  - Wind Speed
  - Sunrise and Sunset Times

## API Keys

This app uses the following APIs:

- **OpenWeatherMap API**: Replace the `apiKey` in `script.js` with your own API key from OpenWeatherMap.
- **OpenCage Geocoder API**: Replace the `apiKey` in `script.js` with your own API key from OpenCage Geocoder.