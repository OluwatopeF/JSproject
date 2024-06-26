// search countries
function searchCountry(){
    // const query = document.getElementById('searchCountries').value;
    
    // const resultsDiv = document.getElementById('results');
    // let resultsFound = false;

    fetch("travel_recommendation_api.json")
        .then(res => {
            // parse as json then covert to normal JS
            return res.json();
        })
        .then(res => {
            // parse as json then covert to normal JS
            // return res.json();
            const data = res.countries;
            let x = '';
            data.forEach(countries => {
                x += "<li>${countries.id}<li>"
            })
            document.getElementById('results').innerHTML = x;
        })
        // .then(data => {
            // Output data in normal JS format
        //     console.log(data);
        // })
        
        // error handling
        .catch(error => {
            console.error('Error:', error);
    });
}

// reset input
function resetSearch(){
    const searchCountries= document.getElementById("searchCountries");

    searchCountries.valueOf="";
}
