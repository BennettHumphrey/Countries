import "../ContentWindow.css"
import { useState, useEffect } from "react"
import { LoadingWindow } from "../LoadingWindow/LoadingWindow";


export function BasicFacts({facts, setFlag, setLoadingWindowHeight, setRequestType, setCountry}) {

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

    useEffect(() => windowHeight(), 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    [facts])

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
        setLanguage(r.languages[l[0]]);
    }

    // Sets flag
    const getFlag = () => {
        if(!r){return 'error'};
        setFlag(r.flags[0]);
    }

    const changeCountry = (x) => {
        setRequestType('alpha')
        setCountry(x)
    }

    useEffect(getCurrencyInfo, 
        // eslint-disable-next-line react-hooks/exhaustive-deps 
        [facts, r])
    useEffect(getLanguageInfo, 
        // eslint-disable-next-line react-hooks/exhaustive-deps 
        [facts, r])
    useEffect(getFlag, 
        // eslint-disable-next-line react-hooks/exhaustive-deps 
        [facts, r])

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
                {r.name.common} is a {r.independent ? 'country' : 'territory'} in {r.subregion}
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
                -People: {r.demonyms.eng.m}
            </p>
            <p>
                -First official language: {language}
            </p>
            <p className="border-country-p" >
                -Bordering countries:
            {r.borders ? r.borders.map((x, i) => {
                if(i === 6 || i === 11){return (<><br/><span className="border-country-span" onClick={() => {changeCountry(x)}} >{x}</span></>)}
                return (<span className="border-country-span" onClick={() => {changeCountry(x)}} >{x}</span>)
            }) : ' None'}
            </p>

        </section>
    ) : (<LoadingWindow/>)
}