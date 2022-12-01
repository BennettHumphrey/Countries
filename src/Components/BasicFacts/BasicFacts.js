import "../ContentWindow.css"
import { useState, useEffect } from "react"
import { LoadingWindow } from "../LoadingWindow/LoadingWindow";


export function BasicFacts({facts, setFlag, setLoadingWindowHeight}) {

    const [currencyInfo, setCurrencyInfo] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');

    const windowHeight = () => {
        const basicFactsWindow = document.getElementById('basicFactsWindow');
        if(basicFactsWindow && basicFactsWindow.clientHeight > 200){
            console.log(basicFactsWindow.clientHeight)
        setLoadingWindowHeight(basicFactsWindow.clientHeight)
        }
    }

    useEffect(() => windowHeight(), [facts])

    // Grabs currency info, sets currency code to be
    // used by second API
    const r = facts[0];
    const getCurrencyInfo = () => {
        const c = Object.keys(r.currencies);
        const currency = r.currencies[c[0]].code;
        setCurrencyInfo(`${r.currencies[c[0]].symbol} ${r.currencies[c[0]].name}`);
        getCurrency(currency)
    }
    // Sets flag
    const getFlag = () => {
        if(!r){return 'error'};
        setFlag(r.flags.svg);
    }

    useEffect(getCurrencyInfo, [facts, r])
    useEffect(getFlag, [facts, r])

    // URL for echange rate API
    
    // Gets exchange rate
    async function getCurrency(currency) {

        var url = `https://api.exchangerate.host/latest?base=USD&symbols=${currency}`;
        const response = await fetch(url);
        const responseJSON = await response.json();
        if(!responseJSON.rates){return 'error'}
        const c = Object.keys(responseJSON.rates)

        console.log(`Economy Currency: ${currency}`)
        console.log(responseJSON);
        console.log(responseJSON.rates[c[0]])
        setExchangeRate(responseJSON.rates[c[0]])
    }

    return r ? (
        <section className="content" id="basicFactsWindow" >
            <h2>
                {r.name} is a country in {r.subregion}
            </h2>
            <p>
                -Capital: {r.capital}
            </p>
            <p>
                -Population: {r.population}
            </p>
            <p>
                -Currency: {currencyInfo}
            </p>
            <p>
                -Exchange rate: {exchangeRate}
            </p>
            <p>
                -Area: {r.area} Square km
            </p>
            <p>
                -People: {r.demonym}
            </p>

        </section>
    ) : (<LoadingWindow/>)
}