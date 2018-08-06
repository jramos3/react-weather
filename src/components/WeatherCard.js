import React from "react";
import "../styles/weather-card.css";
import { formatDate } from "../helpers";

const WeatherCard = props => {
  const { weatherData } = props;

  return (
    <div className="weather-card">
      <p className="weather-date">{formatDate(weatherData.applicable_date)}</p>
      <img
        className="weather-icon"
        src={`https://www.metaweather.com/static/img/weather/${
          weatherData.weather_state_abbr
        }.svg`}
        alt="weather"
      />
      <p className="weather-desciption">{weatherData.weather_state_name}</p>
      <p className="weather-temperature">
        {`Temp: ${weatherData.the_temp.toFixed(2)}`} &deg;C
      </p>
      <p className="weather-humidity">{`Humidity: ${
        weatherData.humidity
      } %`}</p>
    </div>
  );
};

export default WeatherCard;
