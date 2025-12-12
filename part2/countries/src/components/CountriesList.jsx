function CountriesList({ countries }) {
  return (
    <ul style={{ listStyle: "none" }}>
      {countries.length < 10 ? (
        countries.map((country) => (
          <li key={country.name.common}>{country.name.common}</li>
        ))
      ) : (
        <li>Too many matches, specify another filter</li>
      )}
    </ul>
  );
}

export default CountriesList;
