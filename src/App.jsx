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
