import './App.css';
import { BasicFacts } from './Components/BasicFacts/BasicFacts';
import { CountrySelection } from './Components/CountrySelection/CountrySelection';
import { CurrentEvents } from './Components/CurrentEvents/CurrentEvents';
import { History } from './Components/History/History';
import { useState, useEffect } from 'react'







function App() {

  const [country, setCountry] = useState("canada");
  const [facts, setFacts] = useState()
  const [loading, setLoading] = useState(true)
  const [weather, setWeather] = useState()
  const [capital, setCapital] = useState()

  const url = `https://restcountries.com/v2/name/${country}/`

  // const getInfo = async () => {
  //   const response = await fetch(url);
  //   const responseJSON = await response.json();
  //   setResponse(responseJSON);
  //   setLoading(false)
  // }
  

  function delayGetInfo() {
    setLoading(true);
    setTimeout(getInfo, 200);
  }

  async function getInfo() {
    setLoading(true);
    setFacts(null);
    const response = await fetch(url);
    const responseJSON = await response.json();
    setFacts(responseJSON);
    console.log(response)
    if(response.ok){
    setCapital(responseJSON[0].capital)
    setLoading(false)};
  }
  
  useEffect(() => delayGetInfo, [country]);





  return (
    <div className="App">
      
      <CountrySelection setCountry={setCountry} country={country} />
      <button >Click For Facts</button>
      <div className="info-sections">

        {loading ? 'nothing' : <BasicFacts facts={facts} />}

        <CurrentEvents setWeather={setWeather} weather={weather} capital={capital} />

        <History />


      </div>





    </div>
  );
}

export default App;
