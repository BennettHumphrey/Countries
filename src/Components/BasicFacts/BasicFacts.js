import "../ContentWindow.css"
import { useState, useEffect } from "react"
import { LoadingWindow } from "../LoadingWindow/LoadingWindow";


export function BasicFacts({facts, setFlag, setLoadingWindowHeight}) {

    const [currencySymbol, setCurrencySymbol] = useState('');
    const [currencyName, setCurrencyName] = useState('');
    const [currencyCode, setCurrencyCode] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');
    const [language, setLanguage] = useState('')

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
        setCurrencySymbol(r.currencies[c[0]].symbol);
        setCurrencyName(r.currencies[c[0]].name);
        setCurrencyCode(r.currencies[c[0]].code);
        getCurrency(currency)
    }

    const getLanguageInfo = () => {
        const l = Object.keys(r.languages);
        setLanguage(r.languages[l[0]].name);
    }

    // Sets flag
    const getFlag = () => {
        if(!r){return 'error'};
        setFlag(r.flags.svg);
    }

    useEffect(getCurrencyInfo, [facts, r])
    useEffect(getLanguageInfo, [facts, r])
    useEffect(getFlag, [facts, r])

    //Adds commas to number
    const formatNumber = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const  roundNumber = (x) => {
        return formatNumber(Math.round(x* 100) / 100);
    }
    
    // Gets exchange rate
    async function getCurrency(currency) {

        var url = `https://api.exchangerate.host/latest?base=USD&symbols=${currency}`;
        const response = await fetch(url);
        const responseJSON = await response.json();
        if(!responseJSON.rates){return 'error'}
        const c = Object.keys(responseJSON.rates)
        setExchangeRate(responseJSON.rates[c[0]])
    }

    return r ? (
        <section className="content" id="basicFactsWindow" >
            <h2>
                {r.name} is a {r.independent ? 'country' : 'territory'} in {r.subregion}
            </h2>
            <p>
                -Capital: {r.capital}
            </p>
            <p>
                -Population: {formatNumber(r.population)}
            </p>
            <p>
                -Currency: {currencySymbol} {currencyName}
            </p>
            <p>
                -Exchange rate: $1USD = {currencySymbol} {roundNumber(exchangeRate)} {currencyCode}
            </p>
            <p>
                -Area: {formatNumber(r.area)} Square km
            </p>
            <p>
                -People: {r.demonym}
            </p>
            <p>
                -First official language: {language}
            </p>

        </section>
    ) : (<LoadingWindow/>)
}