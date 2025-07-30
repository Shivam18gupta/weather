import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ⚠️ Put your actual OpenWeatherMap API key here
  const API_KEY = 'f5cc5ac1e29b50aec637c3981651cfb2'; // <-- 👈 PUT IT HERE

  const getWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    setError('');
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const res = await axios.get(url);
      setWeather(res.data);
    } catch (err) {
      setError('City not found 😢');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <h1 className="title">🌦️ Simple Weather App</h1>
      <form onSubmit={getWeather}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="info">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <h3>{Math.round(weather.main.temp)}°C</h3>
          <p className="desc">{weather.weather[0].description}</p>
          <div className="details">
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬️ Wind: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
