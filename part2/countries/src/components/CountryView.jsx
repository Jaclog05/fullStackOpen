function CountryView({ country }) {
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
    </div>
  );
}

export default CountryView;
