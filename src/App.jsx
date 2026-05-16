import './App.css';
import wereldkaart from './assets/world_map.png';
import axios from 'axios';
import {useState} from "react";
import Header from './components/header/header.jsx';
import Button from './components/button/button.jsx';
import CountryList from "./components/CountryList/CountryList.jsx";


function App() {
    const [countries, setCountries] = useState([]);
    const url = "https://restcountries.com/v3.1/all"
    const [showButton, toggleShowButton] = useState(true);


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


    return (
        <>
            <Header img={wereldkaart} />

            <body>

            {showButton && (<Button click={fetchCountries} text="Haal informatie op"/>)}

            <CountryList countries={countries} />
            </body>
        </>
    )
}

export default App
