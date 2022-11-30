import "./CountrySelection.css"
import { useState } from "react"
import { CountryArray } from "../CountryArray"

export function CountrySelection({country, setCountry}) {

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
            <form onSubmit={handleSubmit}>
                <input type="text" list="countries" onChange={handleInput} value={input} />
                    
                <input type='submit'  />
            </form>
            <datalist id="countries" >
                        <option value="Canada" >Canada</option>
                        <option value="Peru" >Peru</option>
                        <option value="Bolivia" >Bolivia</option>
                        {CountryArray.map((x, i) => <option value={x} key={i}>{x}</option>)}
                    </datalist>
            

            <p>{country}</p>
        </section>
    )
}