import "./BasicFacts.css"
import { useState, useEffect } from "react"


export function BasicFacts({facts}) {

    const [currencyInfo, setCurrencyInfo] = useState('')
    const [flag, setFlag] = useState('')
    const [exchangeRate, setExchangeRate] = useState('')



    // Grabs currency info, sets currency code to be
    // used by second API
    const r = facts[0]
    const getCurrencyInfo = () => {
        if(!r) {return 'error'};
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
        const c = Object.keys(responseJSON.rates)
        console.log(`Economy Currency: ${currency}`)
        console.log(responseJSON);
        console.log(responseJSON.rates[c[0]])
        setExchangeRate(responseJSON.rates[c[0]])
    }

    return r ? (
        <section className="basic-facts" >
            <p>
                {r.name} is a country in {r.region}.
            </p>
            <p>
                Capital: {r.capital}
            </p>
            <p>
                Population: {r.population}
            </p>
            <p>
                Currency: {currencyInfo}
            </p>
            <p>
                Exchange rate: {exchangeRate}
            </p>
            <p>
                Area: {r.area} Square km
            </p>
            <p>
                People: {r.demonym}
            </p>
            <img className="flag" src={flag} alt='Current Country Flag'/>

        </section>
    ) : (<section className="basic-facts" ><p>Error</p></section>)
}