// Get token from cookie
const token = getCookie('token');
let show_filters = false;

// Set headers
const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
};

$(document).ready(function () {
    toggleFilters();
    getArtists();
    // Handle form submission
    $('#filterForm').submit(function (event) {
        event.preventDefault();
        // Dynamically construct data object with filled form fields
        getFilteredArtists();
    });

    function getFilters() {
        var formData = {};
        $('#filterForm :input').each(function () {
            var field = $(this);
            var fieldName = field.attr('name');
            var fieldValue = field.val();

            // Exclude the "submit" field from formData
            if (fieldName !== "submit") {
                // Check if the field is a checkbox and handle the value accordingly
                // Check if the field has a value and is not undefined before including it in the formData
                if (fieldValue !== undefined && fieldValue !== null && fieldValue !== "") {
                    formData[fieldName] = fieldValue;
                }
            }
        
        });
        return formData;
    }

    function getFilteredArtists() {
        var formData = getFilters();
        getArtists(formData);
    }

    function getArtists(formData = {}) {
        // Make an AJAX request to the Laravel API endpoint
        $.ajax({
            url: 'http://127.0.0.1:8000/api/v1/artists',
            type: 'GET',
            data: formData,
            headers: headers,
            dataType: 'json',
            success: function (data) {
                // Handle the response and update the artists container
                updateArtistsContainer(data);
            },
            error: function (error) {
                console.error('Error fetching artists:', error);
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
        getArtists();
    });


    // Function to update the artists container with the fetched data
    // Function to update the artists container with the fetched data
    function updateArtistsContainer(artists) {
        var artistsContainer = $('#artistsContainer');
    
        // Clear previous results
        artistsContainer.empty();
    
        // Convert the object values to an array
        var artistsArray = Object.values(artists);
    
        if (artistsArray.length === 0) {
            // Display a message when no artists match the criteria
            artistsContainer.html("<p>No artists match your criteria.</p>");
        } else {
            // Display each artist in the container
            artistsArray.forEach(function (artist) {
                // Create a div for each artist
                const artistDiv = document.createElement('div');
                artistDiv.classList.add('artist');
    
                // Create artist info HTML
                let artistInfo = `
                    <h2>${artist.name}</h2>
                    <h3>Country: ${artist.country}</h3>
                    <p>${artist.bio}</p>
                    <button class="view-concerts-button" data-artist-name="${artist.name}">View Concerts</button>
                `;
    
                // Set the HTML content of the artistDiv
                artistDiv.innerHTML = artistInfo;
    
                // Append the artistDiv to the artistsContainer
                artistsContainer.append(artistDiv);
    
                // Add click event to the "View Concerts" button
                const viewConcertsButton = artistDiv.querySelector('.view-concerts-button');
                viewConcertsButton.addEventListener('click', function () {
                    redirectToConcertsPage(artist.name);
                });
            });
        }
    }
    
    function redirectToConcertsPage(artistName) {
        // Redirect to the concerts page with the artist query parameter
        window.location.href = `../html/concerts.html?artist=${encodeURIComponent(artistName)}`;
    }
    
    
});
