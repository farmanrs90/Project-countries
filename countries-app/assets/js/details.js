const detailsDiv = document.querySelector(".details");
const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");

async function getCountry() {
    const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const data = await res.json();
    const country = data[0];

    detailsDiv.innerHTML = `
        <img src="${country.flags.png}">
        <h2>${country.name.common}</h2>
        <p>Population: ${country.population.toLocaleString()}</p>
        <p>Region: ${country.region}</p>
        <p>Capital: ${country.capital?.[0] || "N/A"}</p>
    `;
}

getCountry();