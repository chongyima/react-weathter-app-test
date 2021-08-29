import React, { useState } from 'react';
import axios, { AxiosResponse } from "axios";

export default function SearchCity() {
  let [city, setCity] = useState("");
  let [loaded, setLoaded] = useState<boolean>(false);
  let [weather, setWeather] = useState({
    city: '',
    temperature: 0,
    wind: 0,
    humidity: 0,
    description: '',
    icon: '',
  });

  function displayWeather(response: AxiosResponse<any>) {
    setLoaded(true);
    setWeather({
      city: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }
  function handleSubmit(event:React.FormEvent) {

    event.preventDefault();
    let apiKey = "f3711ec096b8e2b5d745c777afc03d71";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);
  }

  // https://api.openweathermap.org/data/2.5/weather?q=London&appid=f3711ec096b8e2b5d745c777afc03d71&units=Metric

  function updateCity(event:React.ChangeEvent<HTMLInputElement>) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="type a city name"
        autoFocus={true}
        onChange={updateCity}
      />
      <button type="submit">Search</button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <ul className="weatherReport">
          <li>
            <strong>The weather in {city} is:</strong>
          </li>
          <li>Temperature: {Math.round(weather.temperature)}˚C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
