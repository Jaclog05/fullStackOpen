import { useState, useEffect } from "react";
const api_key = import.meta.env.VITE_API_KEY;

function CountryView({ country }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country.name.common}&units=metric&appid=${api_key}`
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data));
  }, []);

  const languagesArray = Object.values(country.languages);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <ul style={{ listStyle: "none" }}>
        <li>Capital {country.capital[0]}</li>
        <li>Area {country.area}</li>
      </ul>
      <h3>Languages</h3>
      <ul>
        {languagesArray.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h3>Weather in {country.name.common}</h3>
      <p>Temperature {weatherData?.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}.png`}
        alt="icon-weather-image"
      />
      <p>Wind {weatherData?.wind.speed} m/s</p>
    </div>
  );
}

export default CountryView;
