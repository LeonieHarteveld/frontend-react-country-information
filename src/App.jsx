import './App.css';
import wereldkaart from './assets/world_map.png';
import axios from 'axios';
import {useState} from "react";
import Header from './components/header/header.jsx';
import Button from './components/button/button.jsx';
import CountryList from "./components/CountryList/CountryList.jsx";



function App() {
    const [countries, setCountries] = useState([]);
    const [showButton, toggleShowButton] = useState(true);
    const [countryInfo, setCountryInfo] = useState(null);
    const [countrySearch, setCountrySearch] = useState("");
    const url =  `https://restcountries.com/v3.1/name/${countrySearch}`
    const [errorMessage, setErrorMessage] = useState("");

    async function fetchCountries() {
        try {
            const result = await axios.get(url, {
                params: {
                    fields: "name,flags,population,region"
                }
            });
            setCountries(result.data);
            toggleShowButton(false);
        } catch (error) {
            console.error(error);

        }
    }

    async function fetchNetherlands() {
        try {
            const result = await axios.get(url, {
                params: {
                    fields: "name,flags,population,region,subregion,capital,borders,tld"
                }
            });
            setCountryInfo(result.data[0]);
            setErrorMessage("");
            setCountrySearch("");
        } catch (error) {
            console.error(error);
            setErrorMessage(`${countrySearch} bestaat niet. Probeer het opnieuw`);
        }
    }

    return (
        <>
            <Header img={wereldkaart}/>

            <main>

                <input
                    type="text"
                    name="country"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            fetchNetherlands();
                        }
                    }}
                    placeholder="Bijvoorbeeld Netherlands of Peru"
                />

                {showButton &&
                    (<Button
                        click={fetchNetherlands}
                        text="Zoek"
                    />)}


                {countryInfo && (
                    <div className="country-wrap">
                        <img
                            className="country-flag"
                            src={countryInfo.flags.svg}
                            alt={countryInfo.flags.alt}
                        />
                        <h2>{countryInfo.name.common}</h2>

                        <p>
                            {countryInfo.name.common} is situated in {countryInfo.region} and the capital
                            is {countryInfo.capital[0]} It has a population
                            of {(countryInfo.population / 1000000).toFixed(1)} million people and it borders
                            with {countryInfo.borders ? countryInfo.borders.length : 0} neighboring countries
                            Websites can be found on {countryInfo.tld[0]} domain's
                        </p>
                    </div>
                )}

                {errorMessage && (
                    <p>{errorMessage}</p>
                )}


                {showButton && (<Button click={fetchCountries} text="Overzicht alle landen"/>
                )}

                <CountryList countries={countries}/>


            </main>
        </>
    )
}

export default App
