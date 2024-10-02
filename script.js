const countriesAPI = "https://restcountries.com/v2/all";
        const countriesContainer = document.getElementById("countries-container");
        const searchInput = document.getElementById("search");
        const sortSelect = document.getElementById("sort");
        const modal = document.getElementById("country-modal");
        const closeModalButton = document.querySelector(".close-button");

        let countries = [];

        // Fetch countries data
        async function fetchCountries() {
            const response = await fetch(countriesAPI);
            countries = await response.json();
            displayCountries(countries);
        }

        // Display countries in the DOM
        function displayCountries(countries) {
            countriesContainer.innerHTML = "";
            countries.forEach((country) => {
                const countryCard = document.createElement("div");
                countryCard.classList.add("country-card");
                countryCard.innerHTML = `
                    <img id="flag-container" src="${country.flags.svg}" alt="${country.name} flag" width="100">
                    <h3>${country.name}</h3>
                    <p>Population: ${country.population.toLocaleString()}</p>
                    <p>Area: ${country.area.toLocaleString()} km²</p>
                    <p style="color: #555;">${country.capital ? `Capital: ${country.capital}` : "Capital: N/A"}</p>
                `;

                // Add click event to show details
                countryCard.addEventListener("click", () => showCountryDetails(country));
                countriesContainer.appendChild(countryCard);
            });
        }

        // Show country details in modal
        function showCountryDetails(country) {
            document.getElementById("modal-country-name").innerText = country.name;
            document.getElementById("modal-country-flag").src = country.flags.svg;
            document.getElementById("modal-country-population").innerText = country.population.toLocaleString();
            document.getElementById("modal-country-area").innerText = country.area.toLocaleString();

            // Extract languages
            const languages = country.languages.map((lang) => lang.name).join(", ");
            document.getElementById("modal-country-languages").innerText = languages || "N/A";

            // Description with additional facts
            const description = `The capital of ${country.name} is ${country.capital || "N/A"}. 
            ${country.name} is known for its stunning landscapes, rich culture, and diverse wildlife.`;
            document.getElementById("modal-country-description").innerText = description;

            // Show modal
            modal.style.display = "block";
        }

        // Close modal
        closeModalButton.addEventListener("click", () => {
            modal.style.display = "none";
        });

        // Close modal when clicking outside of it
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });

        // Search functionality
        searchInput.addEventListener("input", () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredCountries = countries.filter((country) =>
                country.name.toLowerCase().includes(searchTerm)
            );
            displayCountries(filteredCountries);
        });

        // Sort functionality
        sortSelect.addEventListener("change", () => {
            let sortedCountries;

            if (sortSelect.value === "asc") {
                sortedCountries = [...countries].sort((a, b) => a.area - b.area);
            } else if (sortSelect.value === "desc") {
                sortedCountries = [...countries].sort((a, b) => b.area - a.area);
            } else {
                sortedCountries = countries; // Default order
            }

            displayCountries(sortedCountries);
        });

        // Initial fetch
        fetchCountries();