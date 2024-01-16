// JavaScript for the "tickets" page
document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is authenticated
    const token = getCookie('token');
    if (!token) {
        // Handle the case when the user is not authenticated (redirect to login or show a message)
        // For example:
        // window.location.href = 'login.html';
        return;
    }

    // Fetch the user's concerts with tickets
    fetchUserConcertsWithTickets(token);
});

function fetchUserConcertsWithTickets(token) {
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const apiUrl = 'http://127.0.0.1:8000/api/v1/user/concerts';

    fetch(apiUrl, {
        method: 'GET',
        headers: headers,
    })
    .then(response => response.json())
    .then(data => {
        // Process and display the user's concerts with tickets
        displayUserConcertsWithTickets(data);
    })
    .catch(error => {
        console.error('Error fetching user concerts with tickets:', error);
    });
}

// Function to display user's concerts with tickets
function displayUserConcertsWithTickets(concerts) {
    // Display the user's concerts with tickets here (similar to the previous code)
    const concertsContainer = document.getElementById('concertsContainer');
    concertsContainer.innerHTML = '';

    if (Array.isArray(concerts) && concerts.length === 0) {
        concertsContainer.innerHTML = "<p> You don't have tickets for any concerts yet. </p>";
        return;
    }

    concerts.forEach(concert => {
        createConcertElement(concertsContainer, concert);
    });
}

// Helper function to create a concert element (similar to the previous code)
function createConcertElement(container, concert) {
    const concertDiv = document.createElement('div');
    concertDiv.classList.add('concert');

    const price = concert.original_price - (concert.original_price * concert.discount / 100);
    const artistNames = concert.artists.map(artist => artist.name).join(', ');

    const concertInfo = `
    <h2>${concert.title}</h2>
    <p>Artists: ${artistNames}</p>
    <p>Date: ${concert.datetime}</p>
    <p>Location: ${concert.address}, ${concert.city}, ${concert.country}</p>
    <p>Max Capacity: ${concert.max_capacity}</p>
    <p>${concert.is_outdoors ? 'Outdoors' : 'Indoors'}</p>
    <p>Price: $${price}</p>`;

    concertDiv.innerHTML = concertInfo;

    container.appendChild(concertDiv);
}
