import { useState, useEffect } from "react";
import "./index.css";

const API_KEY = 'ed3e0e6376e34854a7e81309250512'
const URL = 'http://api.weatherapi.com/v1/'

function App() {
  const [sity, setSity] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  const getData = async (url) => {
    const res = await fetch(url)
    const data = res.json()
  }

  return (
    <div className="app">
      <div className="widget-container">
        <div className="weather-card-container">
          <h1 className="app-title">Weather Widget</h1>
          <div className="search-container">
            <input type="text" placeholder="Enter city name" className="search-input" />
          </div>
        </div>
        <div className="weather-card">
          <h2>Moscow, Russia</h2>
          <img src="" alt="icon" className="weather-icon" />
          <p className="temperature">11°C</p>
          <p className="condition">rainy</p>
          <div className="weather-details">
            <p>Humidity: 20%</p>
            <p>Wind: 22 km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
