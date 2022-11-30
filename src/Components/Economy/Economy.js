import "./Economy.css"
import { useEffect, useState } from "react";






export function Economy({loadingCurrency, currency}) {

  
    var url = `https://api.exchangerate.host/latest?base=USD&symbols=${currency}`;

  const [economyCurrency, setEconomyCurrency] = useState('CAD')


    async function getCurrency() {
      console.log(`Loading Currency" ${loadingCurrency}`)
      if(loadingCurrency) {
        return
      }
      const response = await fetch(url);
      const responseJSON = await response.json();
      const c = Object.keys(responseJSON.rates)
      console.log(`Economy Currency: ${currency}`)
      console.log(responseJSON);
      console.log(responseJSON.rates[c[0]])
      setEconomyCurrency(responseJSON.rates[c[0]])
  }

  function delayGetCurrency() {
    setTimeout(getCurrency, 50)
  }

  useEffect(() => delayGetCurrency, [loadingCurrency])


    return (
        <section className="history" >

            <p>{economyCurrency}</p>

        </section>
    )
}