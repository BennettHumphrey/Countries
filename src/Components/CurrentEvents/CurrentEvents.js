import { useEffect } from "react";
import "./CurrentEvents.css"

export function CurrentEvents({setWeather, weather, capital}) {

    async function getWeather() {
        const token = '8XFES97BGYMK7MCR8TVLD3UJA'
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${capital}?unitGroup=metric&include=current&key=${token}&contentType=json`
        const response = await fetch(url);
        const responseJSON = await response.json();
        setWeather(responseJSON);
    }
    
    useEffect(() => getWeather, [capital])
    
    const getTime = (str) => {
        return str.substring(0, str.length-3)
      }

    return weather ? (
        <section className="current-events" >

            <p>Weather in {capital}:</p>
            <p>Temperature: {weather.currentConditions.temp}</p>
            <p>Humidity: {weather.currentConditions.humidity}%</p>
            <p>{weather.currentConditions.conditions}</p>
            <p>Wind speed: {weather.currentConditions.windspeed}km/h</p>
            <p>Approximate time: {weather.currentConditions.datetime}</p>
            <p>Sunrise: {getTime(weather.currentConditions.sunrise)}</p>
            <p>Sunset: {getTime(weather.currentConditions.sunset)}</p>

        </section>
    ) : (<p>Weather error</p>)
}