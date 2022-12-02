import './App.css';
import { BasicFacts } from './Components/BasicFacts/BasicFacts';
import { CountrySelection } from './Components/CountrySelection/CountrySelection';
import { CurrentEvents } from './Components/CurrentEvents/CurrentEvents';
import { useState, useEffect } from 'react'
import { LoadingWindow } from "./Components/LoadingWindow/LoadingWindow"

function App() {

  const [country, setCountry] = useState('CAN');
  const [requestType, setRequestType] = useState('alpha')
  const [facts, setFacts] = useState()
  const [loading, setLoading] = useState(true)
  const [weather, setWeather] = useState()
  const [capital, setCapital] = useState()
  const [flag, setFlag] = useState('')
  const [loadingWindowHeight, setLoadingWindowHeight] = useState(350)

    async function getInfo() {
      console.log(`Get Info Country: ${country}`)
      console.log(`Get Info Type: ${requestType}`)
    const url = `https://restcountries.com/v3/${requestType}/${country}/`
    setLoading(true);
    setFacts(null);
    const response = await fetch(url);
    const responseJSON = await response.json();
    setFacts(responseJSON);
    if(response.ok){
    setCapital(responseJSON[0].capital)
    setLoading(false)};
    console.log(responseJSON)
  }
  
  useEffect(() => {getInfo()}, [country]);

  return (
      <div className="App">
      
        <CountrySelection setRequestType={setRequestType} setCountry={setCountry} country={country} flag={flag} />
        <div className="info-sections">
          {loading ? <LoadingWindow loadingWindowHeight={loadingWindowHeight} /> : <BasicFacts setRequestType={setRequestType} setCountry={setCountry} setLoadingWindowHeight={setLoadingWindowHeight} setFlag={setFlag} facts={facts}/>}
          {loading ? <LoadingWindow loadingWindowHeight={loadingWindowHeight} /> : <CurrentEvents loadingWindowHeight={loadingWindowHeight} setWeather={setWeather} weather={weather} capital={capital} facts={facts}/>}
        </div>
      </div>
  );
}

export default App;
