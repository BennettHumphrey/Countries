import "./BasicFacts.css"


export function BasicFacts({facts}) {

    const r = facts[0]
    const getCurrency = () => {
        if(!r) {return 'error'};
        const c = Object.keys(r.currencies);
        return `${r.currencies[c[0]].symbol} ${r.currencies[c[0]].name}`
    }
    const getFlag = () => {
        if(!r){return 'error'};
        console.log(r.flags.svg)
        return r.flags.svg
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
                Currency: {getCurrency()}
            </p>
            <p>
                Area: {r.area} Square km
            </p>
            <p>
                People: {r.demonym}
            </p>
            <img className="flag" src={getFlag()}>

            </img>

        </section>
    ) : (<section className="basic-facts" ><p>Error</p></section>)
}