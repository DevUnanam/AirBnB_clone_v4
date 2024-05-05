// Wait for the document to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {

    // Base URL for API endpoint
    const baseUrl = 'http://localhost:5000/';

    // Function to handle click on the "show/hide" span
    function handleShowHideClick(event) {
        const span = event.target;
        const reviewsHeader = document.querySelector('h2#reviews');

        // Check if the span text is "show" or "hide"
        if (span.innerText === "show") {
            // Change span text to "hide"
            span.innerText = "hide";

            // Fetch, parse, and display reviews
            fetchReviews().then(reviews => {
                displayReviews(reviews);
            });
        } else {
            // Change span text to "show"
            span.innerText = "show";

            // Remove all review elements from the DOM
            const reviewsContainer = document.querySelector('.reviews');
            reviewsContainer.innerHTML = '';
        }
    }

    // Function to fetch reviews
    function fetchReviews() {
        return fetch(baseUrl + 'reviews')
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
    }

    // Function to display reviews
    function displayReviews(reviews) {
        const reviewsContainer = document.querySelector('.reviews');

        // Loop through reviews and create HTML elements to display them
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.innerText = review.text;

            reviewsContainer.appendChild(reviewElement);
        });
    }

    // Attach event listener to the span next to the "Reviews" h2
    const reviewsToggle = document.querySelector('h2#reviews + span');
    reviewsToggle.addEventListener('click', handleShowHideClick);

});

