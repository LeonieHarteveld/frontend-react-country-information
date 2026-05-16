import './CountryList.css';

function CountryList({countries}) {

    return (
        <div className="country-wrap">
            {[...countries]
                .sort((a, b) => b.population - a.population)
                .map(country => (

                    <div className="country-info" key={country.name.common}>
                        <div className="country-title">
                            <img src={country.flags.png} alt={country.name.common}/>
                            <h4 className={`region-${country.region}`}>{country.name.common}</h4>
                        </div>
                        <p>Has a population of: {country.population}</p>
                    </div>
                ))}
        </div>
    );

}

export default CountryList
