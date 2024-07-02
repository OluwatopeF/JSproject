let travelData = {};

  fetch('./travel_recommendation_api.json')
    .then(res => {
        
        if (!res.ok) {
            throw new Error('response not ok' + res.statusText);
        }
        return res.json();
    })
    .then(data => {
        travelData =data;
        console.log('Fetched Data: ', travelData);
    })
    .catch(error => console.error('Error: ', error));

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchCountries');
    const resultsContainer = document.getElementById('results');
    
    searchInput.addEventListener('input', (event) => {
        const value = event.target.value.trim();
        if (value) {
        resultsContainer.style.display = 'block';
        searchCountry();
        } else {
        resultsContainer.style.display = 'none';
        resetSearch();
        }
    });
    });


function displayContainer(bar){
    const resultsContainer = document.getElementById('results').querySelector('ul');
    resultsContainer.innerHTML = '';

    bar.forEach(item => {
        const itemContainer = document.createElement('li');
        itemContainer.classList.add('item-container');

        const itemName = document.createElement('h3');
        itemName.innerText = item.name;
        itemContainer.appendChild(itemName);

        if(item.imageUrl) {
            const itemImage = document.createElement('img');
            itemImage.src = item.imageUrl;
            itemImage.alt = item.name;
            itemContainer.appendChild(itemImage);
        }

        if(item.description) {
            const itemDescription = document.createElement('p');
            itemDescription.innerText = item.description;
            itemContainer.appendChild(itemDescription);
        }

        if(item.cities) {
            item.cities.forEach(city => {
                const cityContainer = document.createElement('div');
                cityContainer.classList.add('city-container');

                const cityName =document.createElement('h4');
                cityName.innerText = city.name;
                cityContainer.appendChild(cityName);

                if (city.imageUrl) {
                    const cityImage = document.createElement('img');
                    cityImage.src = city.imageUrl;
                    cityImage.alt = city.name;
                    cityContainer.appendChild(cityImage);
                    }

                const cityDescription = document.createElement('p');
                cityDescription.innerText = city.description;
                cityContainer.appendChild(cityDescription);

                itemContainer.appendChild(cityContainer);
            });
        }
    resultsContainer.appendChild(itemContainer);
    });
}

function searchCountry() {
    const searchInput = document.getElementById('searchCountries').value.toLowerCase();
    console.log('You searched for: ', searchInput)
    const results = [];

    Object.keys(travelData).forEach(category => {
        travelData[category].forEach(item => {
            let isMatch = item.name.toLowerCase().includes(searchInput) || (item.description && item.description.toLowerCase().includes(searchInput));
            if(item.cities && !isMatch) {
                const matchingCities = item.cities.filter(city => city.name.toLowerCase().includes(searchInput) || city.description.toLowerCase().includes(searchInput));
                if (matchingCities.length > 0) {
                    isMatch = true;
                    item = { ...item, cities:matchingCities };
                }
            }
            if(isMatch) {
                results.push(item);
            }
        });
    });
    console.log('Results:', results)
    displayContainer(results);
}

function resetSearch() {
    document.getElementById('searchCountries').value = '';
    document.getElementById('results').querySelector('ul').innerHTML= '';
}
