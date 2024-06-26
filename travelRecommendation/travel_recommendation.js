// search countries
function searchCountry(){
    const input = document.getElementById('searchCountries').ValueM.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "";

    fetch('travel_recommendation.json')
    .then(response => response.json())
    .then(data => {
        const country = data.conditions.find(item => item.name.toLowerCase() === input);
        resultDiv.innerHTML = '<h1> ${data.countries}</h1>';
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'You have an error.';
    });
}

// reset input
function resetSearch(){
    document.getElementById("searchCountries") ="";
}


clear.addEventListener('click', resetSearch);