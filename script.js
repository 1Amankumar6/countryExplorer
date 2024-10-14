const countriesAPI = "https://restcountries.com/v3.1/all";

const countriesContainer = document.getElementById("countries-container");
const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("close-modal-button");
const searchInput = document.getElementById("search");
const logoTap = document.getElementById("logo");
const findContinent = document.getElementById("findContinent");

let countries = [];

async function fetchCountries() {
  try {
    const response = await fetch(countriesAPI);
    if (!response.ok) throw new Error("Network response was not ok");
    countries = await response.json();
    displayCountries(countries);
  } catch (error) {
    console.error("Failed to fetch countries:", error);
  }
}

function displayCountries(countries) {
  countriesContainer.innerHTML = "";
  countries.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.classList.add("country-card");
    countryCard.innerHTML = `
          <img id="flag-container" src="${country.flags.svg}" alt="${
      country.name.common
    } flag" width="100">
          <div class="card-data">
            <h3>${country.name.common}</h3>
            <p>Population: ${country.population.toLocaleString()}</p>
            <p>Area: ${
              country.area ? country.area.toLocaleString() : "N/A"
            } km²</p>
            <p style="color: #555;">Capital: ${
              country.capital ? country.capital[0] : "N/A"
            }</p>
          </div>
        `;

    countryCard.addEventListener("click", () => showCountryDetails(country));
    countriesContainer.appendChild(countryCard);
  });
}

function showCountryDetails(country) {
  document.getElementById("modal-country-name").innerText =
    country.name.official;
  document.getElementById("modal-country-flag").src = country.flags.svg;

  document.getElementById("modal-country-population").innerText =
    country.population.toLocaleString();

  document.getElementById("modal-country-area").innerText =
    country.area.toLocaleString();

  const googleMapsLink = country.maps.googleMaps || "Link not available";
  
  document.getElementById("modal-country-language").innerHTML = `
    <a href="${googleMapsLink}" target="_blank" style="text-decoration: none;">${googleMapsLink}</a>
  `;

  const description = `The capital of ${country.name.common} is ${
    country.capital || "N/A"
  }. ${
    country.name.common
  } is known for its stunning landscapes, rich culture, and diverse wildlife.`;
  document.getElementById("modal-country-description").innerText = description;

  modal.style.display = "block";
}

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query)
  );
  displayCountries(filteredCountries);
});

logoTap.addEventListener("click", () => {
  searchInput.value = ""; // Clear the search input
  displayCountries(countries); // Display all countries
});

findContinent.addEventListener("change", () => {
  let continent;
  if (findContinent.value !== "default") {
    continent = countries.filter((country) =>
      country.continents.includes(findContinent.value)
    );
    displayCountries(continent);
  } else {
    displayCountries(countries); // Display all countries if default is selected
  }
});

fetchCountries();
