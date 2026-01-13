const API_URL = "https://restcountries.com/v3.1/all?fields=name,cca3,capital,region,population,flags";

const cards = document.querySelector(".cards");
const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const themeToggle = document.getElementById("themeToggle");

let allCountries = [];
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙 Dark Mode";
    }
});



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
        card.href = `details.html?code=${country.cca3}`;

        card.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common}">
            <div>
                <h3>${country.name.common}</h3>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
            </div>
        `;
        cards.appendChild(card);
    });
}


function applyFilters() {
    let filtered = [...allCountries];

    const searchValue = searchInput.value.toLowerCase();
    const regionValue = regionFilter.value;

    if (searchValue) {
        filtered = filtered.filter(c =>
            c.name.common.toLowerCase().includes(searchValue)
        );
    }

    if (regionValue) {
        filtered = filtered.filter(c => c.region === regionValue);
    }

    renderCards(filtered);
}

searchInput.addEventListener("input", applyFilters);
regionFilter.addEventListener("change", applyFilters);

getCountries();
