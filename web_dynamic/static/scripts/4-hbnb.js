document.addEventListener('DOMContentLoaded', function () {
    // Function to make the POST request to the places_search endpoint
    function fetchPlaces(amenities) {
        // Make a POST request to the places_search endpoint with the list of checked Amenities
        fetch('http://0.0.0.0:5001/api/v1/places_search/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amenities: amenities
            })
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
            placesSection.innerHTML = ''; // Clear previous places
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

    // Add event listener to the button tag
    const searchButton = document.querySelector('button');
    searchButton.addEventListener('click', function () {
        // Get the list of checked Amenities
        const checkedAmenities = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.dataset.id);
        // Make a POST request to the places_search endpoint with the list of checked Amenities
        fetchPlaces(checkedAmenities);
    });
});

