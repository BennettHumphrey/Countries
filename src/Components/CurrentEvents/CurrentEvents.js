import { useEffect, useState } from "react";
import "../ContentWindow.css"
import { LoadingWindow } from "../LoadingWindow/LoadingWindow";

export function CurrentEvents({setWeather, weather, capital, loadingWindowHeight}) {
    
    const [loadingWeather, setLoadingWeather] = useState(true)

    async function getWeather() {
        setLoadingWeather(true);
        const token = '8XFES97BGYMK7MCR8TVLD3UJA';
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${capital}?unitGroup=metric&include=current&key=${token}&contentType=json`;
        const response = await fetch(url);
        const responseJSON = await response.json();
        setWeather(responseJSON);
        if(responseJSON){setLoadingWeather(false)}
    }
    
    useEffect(() => getWeather, [capital])
    
    const formatTime = (str) => str.substring(0, str.length-3);

    return loadingWeather ? (<LoadingWindow loadingWindowHeight={loadingWindowHeight} />):(
        <section className="content current-events-window" >

            <h2>Weather in {weather.resolvedAddress}</h2>
            <p>-Temperature: {weather.currentConditions.temp}</p>
            <p>-Humidity: {weather.currentConditions.humidity}%</p>
            <p>-{weather.currentConditions.conditions}</p>
            <p>-Wind speed: {weather.currentConditions.windspeed}km/h</p>
            <p>-Approximate time: {formatTime(weather.currentConditions.datetime)}</p>
            <p>-Sunrise: {formatTime(weather.currentConditions.sunrise)}</p>
            <p>-Sunset: {formatTime(weather.currentConditions.sunset)}</p>

        </section>
    )
}