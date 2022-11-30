import './App.css';
import { BasicFacts } from './Components/BasicFacts/BasicFacts';
import { CountrySelection } from './Components/CountrySelection/CountrySelection';
import { CurrentEvents } from './Components/CurrentEvents/CurrentEvents';
import { useState, useEffect } from 'react'

function App() {

  const [country, setCountry] = useState('canada');
  const [facts, setFacts] = useState()
  const [loading, setLoading] = useState(true)
  const [weather, setWeather] = useState()
  const [capital, setCapital] = useState()

    async function getInfo() {
      console.log(`Get Info Country: ${country}`)
    const url = `https://restcountries.com/v2/name/${country}/`
    setLoading(true);
    setFacts(null);
    const response = await fetch(url);
    const responseJSON = await response.json();
    setFacts(responseJSON);
    if(response.ok){
    setCapital(responseJSON[0].capital)
    setLoading(false)};
  }
  
  useEffect(() => {getInfo()}, [country]);

  return (
    <div className="App">
      
      <CountrySelection setCountry={setCountry} country={country} />
      <div className="info-sections">

        {loading ? 'nothing' : <BasicFacts facts={facts}/>}

        {loading ? 'nothing' : <CurrentEvents setWeather={setWeather} weather={weather} capital={capital} facts={facts}/>}
      </div>
    </div>
  );
}

export default App;
