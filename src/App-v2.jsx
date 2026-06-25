import { useState, useEffect } from "react";
import "./index.css";

const KEY = 'd7db305eef974299bdb185129261506';  // apiKey from weatherapi.com

function App() {

  const [weatherData,setWeaterData] = useState(null);
  const [city,setCity] = useState('');
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const [coords,setCoords] = useState(null);

  useEffect(() => {
    if(!navigator.geolocation) {
      setError('Sorry, your browser does not support geolocation.');
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const [latitude, longitude] = position.coords;
      setCoords({latitude, longitude});
    }, (err) => {
        console.log('Geolocation error', err.message);
        setError('Geolocation is denied on the device.');
      });
  }, []);

  async function handleCityChange(e) {
    const newCity = e.target.value;
    setCity(newCity);

    if(!city.trim() && !coords) {
        setWeaterData(null);
        setError(null);
        return;
    }

    setLoading(true);

    try {
        const query = newCity.trim() ? city : `${coords.latitude},${coords.longitude}`;

        const res = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${query}`
        );

        if(!res.ok) {
          throw new Error(`Error: ${res.status}, ${res.status.text}`);
        }
        
        const data = await res.json();

        setWeaterData(data);
        setError(null);
        } catch (err) {
          setError(err.message);
          setWeaterData(null);
        } finally {
          setLoading(false);
        }
      };

  console.log(weatherData);

  function renderError(){
    return <p>{error}</p>;
  };

  function renderLoading(){
    return <p>Loading...</p>;
  };

  function renderWeather() {
    return (
      <div className="weather-card">
          <h2>{`${weatherData?.location?.name}, ${weatherData?.location?.country}`}</h2>
          <img src={`https:${'//cdn.weatherapi.com/weather/64x64/day/116.png'}`} alt="icon" className="weather-icon" />
          <p className="temperature">{Math.round(`${weatherData?.current?.temp_c}`)}°C</p>
          <p className="condition">{`${weatherData?.current?.condition?.text}`}</p>
          <div className="weather-details">
            <p>Humidity: {`${weatherData?.current?.humidity}%`}</p>
            <p>Wind: {`${weatherData?.current?.wind_kph}`} km/h</p>
          </div>
      </div>
    )
  };

  return (
    <div className="app">
      <div className="widget-container">
        <div className="weather-card-container">
          <h1 className="app-title">Weather Widget</h1>
          <div className="search-container">
            <input type="text" placeholder="Enter city name" 
                   className="search-input" 
                   value={city}
                   onChange={handleCityChange}
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
