import { useState, useEffect } from "react";
import CountryView from "./components/CountryView";
import CountriesList from "./components/CountriesList";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleClick = (name) => setQuery(name)

  const filteredCountries = query
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div>
      <form>
        find countries <input value={query} onChange={handleChange} />
      </form>
      {filteredCountries.length === 1 ? (
        <CountryView country={filteredCountries[0]} />
      ) : (
        <CountriesList countries={filteredCountries} onShowCountry={handleClick} />
      )}
    </div>
  );
}

export default App;
