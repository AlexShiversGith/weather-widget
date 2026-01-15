import { useState, useEffect } from "react";
import "./index.css";

const API_KEY = 'ed3e0e6376e34854a7e81309250512'
const URL = 'http://api.weatherapi.com/v1'

function App() {
  const [sity, setSity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [coords, setCoords] = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Your browser not supported geolocation')
      return
    } else {
      navigator.geolocation.getCurrentPosition((pos) => {
        const {latitude, longitude} = pos.coords
        setCoords({latitude, longitude})
      },
      (err) => {
        console.error("Geolocation error: ", err.message)
        setError("Fallied to get your location")
        }
      )
    }
  }, [])

  const getData = async (url, method, sity) => {
    setLoading(true)
    try{
      const query = sity.trim() ? sity : `${coords.latitude},${coords.longitude}`
      const res = await fetch(url + method + '?key=' + API_KEY + '&q=' + query)
      const data = await res.json()

      if (data.error) {
        setError(data.error.message)
        setWeatherData(null)
        return
      }
      
      setWeatherData(data)
      setError(null)
      console.log(data)

    } catch (err) {
      setError('Falied to fetch weather data')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const renderError = () => <p>{error}</p>
  
  const renderLoading = () => <p>Loading...</p>

  const renderWeather = () => {
    return (
      <div className="weather-card">
        <h2>{weatherData?.location?.name}, {weatherData?.location?.country}</h2>
        <img src={weatherData?.current?.condition?.icon} alt="icon" className="weather-icon" />
        <p className="temperature">{weatherData?.current?.temp_c
  }°C</p>
        <p className="condition">{weatherData?.current?.condition.text}</p>
        <div className="weather-details">
          <p>Humidity: {weatherData?.current?.humidity}%</p>
          <p>Wind: {weatherData?.current?.wind_kph} km/h</p>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if(!sity.trim() && !coords){
      setError(null)
      setWeatherData(null)
      return
    }

    getData(URL, '/current.json', sity)
  }, [sity, coords])

  return (
    <div className="app">
      <div className="widget-container">
        <div className="weather-card-container">
          <h1 className="app-title">Weather Widget</h1>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Enter city name" 
              value={sity}
              className="search-input" 
              onChange={(e) => setSity(e.target.value)}
            />
          </div>
        </div>
        {error && renderError()}
        {loading && renderLoading()}
        {!loading && !error && weatherData && renderWeather()}
      </div>
    </div>
  );
}

export default App;
