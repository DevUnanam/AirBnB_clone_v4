$(document).ready(function() {
    // Initialize an empty array to store Amenity IDs
    var amenityIDs = [];

    // Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function() {
        var amenityID = $(this).data('id');
        var amenityName = $(this).data('name');

        // If the checkbox is checked, store the Amenity ID in the array
        if ($(this).is(':checked')) {
            amenityIDs.push(amenityID);
        } else { // at this spot, If the checkbox is unchecked, we expect to remove the Amenity ID from the array
            var index = amenityIDs.indexOf(amenityID);
            if (index !== -1) {
                amenityIDs.splice(index, 1);
            }
        }

        // is expected to Update the h4 tag inside the div Amenities with the list of Amenities checked
        var amenitiesText = amenityIDs.map(function(id) {
            return $('input[type="checkbox"][data-id="' + id + '"]').data('name');
        }).join(', ');

        $('.amenities h4').text(amenitiesText);
    });
});

