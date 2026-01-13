const detailsDiv = document.querySelector(".details");
const params = new URLSearchParams(window.location.search);
const code = params.get("code");


if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

async function getCountry() {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = await res.json();
    const country = data[0];

    let neighborsHTML = "None";
    if (country.borders) {
        const bordersRes = await fetch(`https://restcountries.com/v3.1/alpha?codes=${country.borders.join(",")}`);
        const bordersData = await bordersRes.json();
        neighborsHTML = bordersData.map(b => `<span>${b.name.common}</span>`).join("");
    }

    detailsDiv.innerHTML = `
        <img src="${country.flags.png}">
        <h2>${country.name.common}</h2>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>

        <h3>Neighbor Countries:</h3>
        <div class="neighbors">${neighborsHTML}</div>
    `;
}

getCountry();
