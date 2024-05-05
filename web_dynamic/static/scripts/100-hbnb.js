// Wait for the document to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {

    // Base URL for API endpoint
    const baseUrl = 'http://localhost:5000/';

    // Variable to store checked States or Cities IDs
    let checkedLocations = {};

    // Function to update the Locations header
    function updateLocationsHeader() {
        const locationsHeader = document.querySelector('div.locations > h4');
        locationsHeader.innerText = Object.values(checkedLocations).join(', ');
    }

    // Function to handle checkbox change
    function handleCheckboxChange(event) {
        const checkbox = event.target;
        const id = checkbox.getAttribute('data-id');
        const name = checkbox.getAttribute('data-name');
        
        if (checkbox.checked) {
            checkedLocations[id] = name;
        } else {
            delete checkedLocations[id];
        }
        
        updateLocationsHeader();
    }

    // Attach event listener to all input checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', handleCheckboxChange);
    });

    // Function to handle button click
    function handleButtonClick(event) {
        // List of Amenities, Cities, and States checked
        const amenities = []; // You need to implement this
        const cities = Object.keys(checkedLocations); // List of checked cities
        const states = Object.values(checkedLocations); // List of checked states

        // POST request payload
        const data = {
            amenities: amenities,
            cities: cities,
            states: states
        };

        // Make a POST request to places_search
        fetch(baseUrl + 'places_search', {
            method: 'POST',
           

