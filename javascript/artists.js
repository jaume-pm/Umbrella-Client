document.addEventListener('DOMContentLoaded', function() {
    const filterForm = document.getElementById('filterForm');
    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Capture user's input from form fields
        const country = document.getElementById('country').value;
        const name = document.getElementById('name').value;

        // Build the query parameters string
        const queryParams = new URLSearchParams();
        if (country) {
            queryParams.append('country', country);
        }
        if (name) {
            queryParams.append('name', name);
        }

        // Make an AJAX request to filter artists
        fetchFilteredArtists(queryParams.toString());
    });
});

function fetchFilteredArtists(queryParams) {
    // Add your API endpoint and headers here
    const apiUrl = `http://127.0.0.1:8000/api/v1/artists?${queryParams}`;
    const token = getCookie('token');

    if (!token) {
        // Handle the case when the user is not authenticated
        return;
    }

    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    fetch(apiUrl, {
        method: 'GET',
        headers: headers,
    })
    .then(response => response.json())
    .then(data => {
        // Process and display the filtered artists
        displayArtists(data);
    })
    .catch(error => {
        console.error('Error fetching filtered artists:', error);
    });
}

// Function to display filtered artists (similar to the previous code)
function displayArtists(artists) {
    // Display the filtered artists here
    const artistsContainer = document.getElementById('artistsContainer');
    artistsContainer.innerHTML = '';

    // Check if artists is an array or a single object
    if (Array.isArray(artists)) {
        if (artists.length === 0) {
            artistsContainer.innerHTML = "<p> There are no artists that match your criteria </p>";
        }
    } else {
        // Convert the single artist object into an array
        artists = [artists];
    }

    artists.forEach(artist => {
        createArtistElement(artistsContainer, artist);
    });
}

// Helper function to create an artist element (similar to the previous code)
function createArtistElement(container, artist) {
    const artistDiv = document.createElement('div');
    artistDiv.classList.add('artist');

    const artistInfo = `
        <h2>${artist.name}</h2>
        <h3>Country: ${artist.country}</h3>
        <p>${artist.bio}</p>
    `;

    artistDiv.innerHTML = artistInfo;

    container.appendChild(artistDiv);
}

// Add your getCookie function here (if not already defined)
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
