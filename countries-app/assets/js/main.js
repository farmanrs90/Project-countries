const BASE_URL = `http://localhost:3000/countries`
const cards = document.querySelector(`.cards`)
async function getCountries() {
    try {
        const res = await axios.get(BASE_URL)
        const countries = res.data
        renderCards(countries)
    } catch (error) {
        console.log(error.message);


    }

}

function renderCards(countries) {
    cards.innerHTML = ''
    countries.forEach(country => {
        const card = document.createElement('a')
        card.href = `details.html?name=${country.name.common}`;
        card.className = `
                bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden
                hover:shadow-xl transition duration-300
            `
        card.setAttribute(`href`,)
        card.innerHTML = `
    <img 
        src="${country.flags.png}" 
        alt="${country.name.common}" 
        class="w-full h-40 object-cover"
    />
    <div class="p-4">
        <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">${country.name.common}</h3>
        <p class="text-gray-700 dark:text-gray-300 text-sm">Population: ${country.population.toLocaleString()}</p>
        <p class="text-gray-700 dark:text-gray-300 text-sm">Region: ${country.region}</p>
        <p class="text-gray-700 dark:text-gray-300 text-sm">Capital: ${country.capital[0]}</p>
    </div>
`


        cards.appendChild(card)
    })
}


getCountries()

const themeToggle = document.querySelector("#themeToggle")
themeToggle.addEventListener("click", () => {


    document.documentElement.classList.toggle("dark");
});