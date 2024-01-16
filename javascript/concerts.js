// Get token from cookie
const token = getCookie('token');
let show_filters = false;

// Set headers
const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
};

$(document).ready(function () {
    $('#filterForm').submit(function (event) {
        event.preventDefault();
        // Dynamically construct data object with filled form fields
        getFilteredConcerts();
    });

    toggleFilters();
    //Artists
    const urlParams = new URLSearchParams(window.location.search);
    const artistParam = urlParams.get('artist');
    if (artistParam) {
        $('#artist').val(artistParam);
        $('#filterForm').submit();
    }
    else{
        getConcerts();
    }

    function getFilters() {
        var formData = {};
        $('#filterForm :input').each(function () {
            var field = $(this);
            var fieldName = field.attr('name');
            var fieldValue = field.val();

            // Exclude the "submit" field from formData
            if (fieldName !== "submit") {
                // Check if the field is a checkbox and handle the value accordingly
                if (field.is(':checkbox')) {
                    // Only include is_outdoors if it's checked
                    if (field.prop('checked')) {
                        formData[fieldName] = true;
                    }
                } else {
                    // Check if the field has a value and is not undefined before including it in the formData
                    if (fieldValue !== undefined && fieldValue !== null && fieldValue !== "") {
                        formData[fieldName] = fieldValue;
                    }
                }
            }
        });
        return formData;
    }

    function getFilteredConcerts() {
        var formData = getFilters();
        getConcerts(formData);
    }

    function getConcerts(formData = {}) {
        // Make an AJAX request to the Laravel API endpoint
        $.ajax({
            url: 'http://127.0.0.1:8000/api/v1/concerts',
            type: 'GET',
            data: formData,
            headers: headers,
            dataType: 'json',
            success: function (data) {
                // Handle the response and update the concerts container
                updateConcertsContainer(data);
            },
            error: function (error) {
                console.error('Error fetching concerts:', error);
            }
        });
    }

    function toggleFilters() {
        var formContainer = $('#filters');
        formContainer.toggle(); // This will toggle visibility on/off

        // Update button text based on visibility
        var buttonText = formContainer.is(":visible") ? "Hide Filters" : "Show Filters";
        $('#toggleFilter').text(buttonText);
    }

    // Set the click event for the toggle filter button
    $('#toggleFilter').click(function () {
        toggleFilters();
    });
    $('#searchAll').click(function () {
        getConcerts();
    });


    // Function to update the concerts container with the fetched data
    // Function to update the concerts container with the fetched data
    function updateConcertsContainer(concerts) {
        var concertsContainer = $('#concertsContainer');

        // Clear previous results
        concertsContainer.empty();

        // Convert the object values to an array
        var concertsArray = Object.values(concerts);

        if (concertsArray.length === 0) {
            // Display a message when no artists match the criteria
            concertsContainer.html("<p>No concerts match your criteria.</p>");
        } else {

            // Display each concert in the container
            concertsArray.forEach(function (concert) {
                // Create a div for each concert
                const concertDiv = document.createElement('div');
                concertDiv.classList.add('concert');

                // Check if artists exist and create artistsInfo accordingly
                const artistNames = concert.artists.map(artist => artist.name).join(', ');
                const artistsInfo = artistNames !== "" ? `<p>Artists: ${artistNames}</p>` : '<p>There are no artists performing in this concert.</p>';

                // Calculate the price based on the discount
                const price = concert.original_price - (concert.original_price * concert.discount / 100);

                // Create concert info HTML
                let concertInfo = `
            <h2>${concert.title}</h2>
            ${artistsInfo}
            <p>Date: ${concert.datetime}</p>
            <p>Location: ${concert.address}, ${concert.city}, ${concert.country}</p>
            <p>Max Capacity: ${concert.max_capacity}</p>
            <p>${concert.is_outdoors ? 'Outdoors' : 'Indoors'}</p>
            <p>Price: $${price}</p>
        `;

                // Set the HTML content of the concertDiv
                concertDiv.innerHTML = concertInfo;

                // Append the concertDiv to the concertsContainer
                concertsContainer.append(concertDiv);
            });
        }
    }
});
