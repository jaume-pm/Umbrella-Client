$(document).ready(function() {
    // Check if the user is authenticated
    const token = getCookie('token');
    if (!token) {
        // Handle the case when the user is not authenticated (redirect to login or show a message)
        // For example:
        // window.location.href = 'login.html';
        return;
    }

    // Function to fetch a list of artists and generate checkboxes for selection
    function fetchArtists() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/v1/artists', // Replace with the actual endpoint to fetch artists
            type: 'GET',
            contentType: 'application/json',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the headers
            },
            success: function(artists) {
                // Generate checkboxes for artists
                const artistsForm = $('#selectArtistsForm');
                artistsForm.empty();

                artists.forEach(artist => {
                    const artistCheckbox = $('<input>')
                        .attr('type', 'checkbox')
                        .attr('id', `artist${artist.id}`)
                        .attr('name', 'artists[]')
                        .attr('value', artist.id);

                    const artistLabel = $('<label>')
                        .attr('for', `artist${artist.id}`)
                        .text(artist.name);

                    artistsForm.append(artistCheckbox, artistLabel);
                    artistsForm.append($('<br>'));
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching artists', xhr.responseText);
            }
        });
    }

    // Fetch artists when the page loads
    fetchArtists();

    // Event handler for concert creation form submission
    $('#createConcertForm').submit(function(e) {
        e.preventDefault();

        const concertData = {
            title: $('#title').val(),
            max_capacity: $('#max_capacity').val(),
            datetime: $('#datetime').val(),
            is_outdoors: $('#is_outdoors').prop('checked'),
            address: $('#address').val(),
            city: $('#city').val(),
            country: $('#country').val(),
            original_price: $('#original_price').val(),
            discount: $('#discount').val(),
        };

        // Make an API request to create the concert
        $.ajax({
            url: 'http://127.0.0.1:8000/api/v1/concerts', // Replace with the actual endpoint to create concerts
            type: 'POST',
            contentType: 'application/json',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the headers
            },
            data: JSON.stringify(concertData),
            success: function(response) {
                console.log('Concert created successfully', response);

                // After creating the concert, fetch the newly created concert to get its ID
                fetchLatestConcert();
            },
            error: function(xhr, status, error) {
                console.error('Error creating concert', xhr.responseText);
            }
        });
    });

    // Function to fetch the latest concert created (assumes the latest concert is the one just created)
    function fetchLatestConcert() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/v1/concerts/latest', // Replace with the actual endpoint to fetch the latest concert
            type: 'GET',
            contentType: 'application/json',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the headers
            },
            success: function(latestConcert) {
                console.log('Latest concert:', latestConcert);

                // After fetching the latest concert, you can add selected artists to it
                addSelectedArtistsToConcert(latestConcert.id);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching latest concert', xhr.responseText);
            }
        });
    }

    // Event handler for artist selection form submission
    $('#selectArtistsForm').submit(function(e) {
        e.preventDefault();

        // Get the selected artist IDs from checkboxes
        const selectedArtistIds = [];
        $("input[name='artists[]']:checked").each(function() {
            selectedArtistIds.push($(this).val());
        });

        // Call a function to add selected artists to the latest concert
        // You can implement this function based on your API endpoint
        // addSelectedArtistsToConcert(latestConcertId, selectedArtistIds);
    });

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
});
