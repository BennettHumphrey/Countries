import { useEffect } from "react";
import "./CurrentEvents.css"





export function CurrentEvents({setWeather, weather, capital}) {

    
    const url = `https://goweather.herokuapp.com/weather/${capital}`
    async function getWeather() {
        
        const response = await fetch(url);
        const responseJSON = await response.json();
        setWeather(responseJSON);
        console.log(responseJSON);
    }
    useEffect(() => getWeather, [capital])
    




    return weather ? (
        <section className="current-events" >

        <p>Weather in {capital}:</p>
        <p>{weather.temperature}</p>
        <p>{weather.description}</p>
        <p>{weather.wind}</p>


        </section>
    ) : (<p>Weather error</p>)
}