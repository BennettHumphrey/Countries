import "./CountrySelection.css"





export function CountrySelection({country, setCountry}) {

const handleCountry = (e) => {
    setCountry(e.target.value)
}



    return (
        <section className="country-selection" >
            <input type="text" onChange={handleCountry} value={country} >
            
            </input>
            <p>{country}</p>
        </section>
    )
}