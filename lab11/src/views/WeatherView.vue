<template>
    <main class="weather-container">
      <!-- If there is weather data, display it; otherwise, skip rendering -->
      <div v-if="weatherData" class="weather-info">
        <!-- Display the weather data returned from the API -->
        <h2 class="location">{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        
        <!-- Display the weather icon and temperature -->
        <div class="weather-details">
          <img :src="iconUrl" alt="Weather Icon" class="weather-icon" />
          <p class="temperature">{{ temperature }} °C</p>
        </div>
  
        <!-- Display the weather description -->
        <p class="weather-description">{{ weatherData.weather[0].description }}</p>
      </div>
  
      <!-- Show a message if the weather data is not yet loaded -->
      <div v-else class="loading-message">
        <p>Loading weather data...</p>
      </div>
    </main>
  </template>
  
  <script>
  import axios from "axios";
  
  const apikey = "d0e2953afe1f78df743672fa093d0ba2";
  
  export default {
    name: "App",
    data() {
      return {
        city: "",
        weatherData: null,
        hourlyForecast: [],
        dailyForecast: [],
      };
    },
  
    computed: {
      temperature() {
        return this.weatherData
          ? Math.floor(this.weatherData.main.temp - 273)
          : null;
      },
      // Get the current weather icon using the API link
      iconUrl() {
        return this.weatherData
          ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
          : null;
      },
    },
  
    mounted() {
      this.fetchCurrentLocationWeather();
    },
    methods: {
      async fetchCurrentLocationWeather() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
            await this.fetchWeatherData(url);
          });
        }
      },
      async fetchWeatherData(url) {
        try {
          const response = await axios.get(url);
          this.weatherData = response.data;
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .weather-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .weather-info {
    margin-top: 20px;
  }
  
  .location {
    font-size: 2em;
    color: #333;
    margin-bottom: 10px;
  }
  
  .weather-details {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .weather-icon {
    width: 100px;
    height: 100px;
  }
  
  .temperature {
    font-size: 2em;
    color: #ff5722;
    margin-left: 20px;
  }
  
  .weather-description {
    font-size: 1.2em;
    color: #555;
  }
  
  .loading-message {
    font-size: 1.5em;
    color: #888;
  }
  </style>
  