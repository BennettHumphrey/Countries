import "./CountrySelection.css"
import { useState } from "react"
import { CountryArray } from "../CountryArray"

export function CountrySelection({country, setCountry, flag}) {

    const [input, setInput] = useState('')

const handleInput = (e) => {
    setInput(e.target.value)
    console.log(input)
}

const handleSubmit = (event) => {
    event.preventDefault();
    setCountry(input)
    setInput("")
    console.log(`handle submit country: ${country}`)
}

    return (
        <section className="country-selection" >
            <div className="country-selection-section">
                <img className="flag flag-1" src={flag} alt="Current Country Flag"/> 
            </div>
                <div className="country-selection-section input-section">
                <form onSubmit={handleSubmit}>
                    <input type="text" className="text-input" list="countries" onChange={handleInput} value={input} />
                    <input type='submit' className='button' />
                </form>
                <datalist id="countries" >
                    <option value="Canada" >Canada</option>
                    <option value="United States of America" >United States of America</option>
                    {CountryArray.map((x, i) => <option value={x} key={i}>{x}</option>)}
                </datalist>
                <p className="description" >Input a country to see info about it, and its capital!</p>
        </div>
        <div className="country-selection-section">
            <img className="flag" src={flag} alt="Current Country Flag"/> 
        </div>
            </section>
    )
}