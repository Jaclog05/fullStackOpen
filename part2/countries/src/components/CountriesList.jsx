function CountriesList({ countries, onShowCountry }) {
  return (
    <ul style={{ listStyle: "none" }}>
      {countries.length < 10 ? (
        countries.map((country) => (
          <li key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => onShowCountry(country.name.common)}>
              Show
            </button>
          </li>
        ))
      ) : (
        <li>Too many matches, specify another filter</li>
      )}
    </ul>
  );
}

export default CountriesList;
