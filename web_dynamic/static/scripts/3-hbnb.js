document.addEventListener('DOMContentLoaded', function () {
    // Function to make the POST request to the API endpoint
    function fetchPlaces() {
        // Make a POST request to the places_search endpoint
        fetch('http://0.0.0.0:5001/api/v1/places_search/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        .then(response => {
            // Check if the response is successful
            if (response.ok) {
                // Parse the JSON response
                return response.json();
            } else {
                // If the response is not successful, throw an error
                throw new Error('Places search request failed');
            }
        })
        .then(data => {
            // Loop through the places data and create HTML for each place
            const placesSection = document.querySelector('.places');
            data.forEach(place => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                    </div>
                    <div class="description">
                        ${place.description}
                    </div>
                `;
                placesSection.appendChild(article);
            });
        })
        .catch(error => {
            // Log any errors to the console
            console.error('Error fetching places:', error);
        });
    }

    // Call the fetchPlaces function when the page loads
    fetchPlaces();
});

