import { useState, useEffect } from "react";
import "./index.css";

const KEY = 'd7db305eef974299bdb185129261506';  // apiKey from weatherapi.com

function App() {

  const [weatherData,setWeaterData] = useState(null);
  const [city,setCity] = useState('Punta Del Este');
  const [error,setError] = useState(null);

  useEffect(() => {
      async function getData() {
        try {
        const res = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}`
        );
        
        const data = await res.json();

        if(data.error) {
          console.log('ERROR');
          setError(data.error.message);
        }
        setWeaterData(data);
        } catch (err) {
          setError(err.message);
          setWeaterData(null);
        }
      };
    getData();
  }, []
  );

  console.log(weatherData);

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
          {error ? <h2>{error}</h2> 
          : <h2>{`${weatherData?.location?.name}, ${weatherData?.location?.country}`}</h2>}
          <img src={`https:${'//cdn.weatherapi.com/weather/64x64/day/116.png'}`} alt="icon" className="weather-icon" />
          <p className="temperature">{Math.round(`${weatherData?.current?.temp_c}`)}°C</p>
          <p className="condition">{`${weatherData?.current?.condition?.text}`}</p>
          <div className="weather-details">
            <p>Humidity: {`${weatherData?.current?.humidity}%`}</p>
            <p>Wind: {`${weatherData?.current?.wind_kph}`} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
