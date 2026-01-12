const API_URL = "https://restcountries.com/v3.1/all?fields=name,cca2,capital,region,population,flags";

const cards = document.querySelector(".cards");
const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const themeToggle = document.getElementById("themeToggle");

let allCountries = [];

// Fetch countries
async function getCountries() {
    const res = await fetch(API_URL);
    const data = await res.json();
    allCountries = data;
    renderCards(data);
}

function renderCards(countries) {
    cards.innerHTML = "";

    countries.forEach(country => {
        const card = document.createElement("a");
        card.href = `details.html?name=${country.name.common}`;

        card.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common}">
            <div>
                <h3>${country.name.common}</h3>
                <p>Population: ${country.population.toLocaleString()}</p>
                <p>Region: ${country.region}</p>
                <p>Capital: ${country.capital?.[0] || "N/A"}</p>
            </div>
        `;

        cards.appendChild(card);
    });
}

// Search logic
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = allCountries.filter(c =>
        c.name.common.toLowerCase().includes(value)
    );
    renderCards(filtered);
});

// Filter logic
regionFilter.addEventListener("change", () => {
    const region = regionFilter.value;
    const filtered = region
        ? allCountries.filter(c => c.region === region)
        : allCountries;
    renderCards(filtered);
});

// Dark / Light Mode
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

getCountries();