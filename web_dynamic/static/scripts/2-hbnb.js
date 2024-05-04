document.addEventListener('DOMContentLoaded', function () {
    // Function to make the HTTP request
    function checkAPIStatus() {
        // Make a GET request to the API status endpoint
        fetch('http://0.0.0.0:5001/api/v1/status/')
            .then(response => {
                // Check if the response is successful
                if (response.ok) {
                    // Parse the JSON response
                    return response.json();
                } else {
                    // If the response is not successful, throw an error
                    throw new Error('API request failed');
                }
            })
            .then(data => {
                // Check if the status is "OK"
                if (data.status === "OK") {
                    // If the status is "OK", add the class "available" to the div#api_status
                    document.getElementById('api_status').classList.add('available');
                } else {
                    // If the status is not "OK", remove the class "available" from the div#api_status
                    document.getElementById('api_status').classList.remove('available');
                }
            })
            .catch(error => {
                // Log any errors to the console
                console.error('Error fetching API status:', error);
            });
    }

    // Call the checkAPIStatus function when the page loads
    checkAPIStatus();
});

