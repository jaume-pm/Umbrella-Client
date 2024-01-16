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

    // Attach event listener to the filter form
    const filterForm = document.getElementById('filterForm');
    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Capture user's input from form fields
        const formData = new FormData(filterForm);

        // Build the query parameters string from formData
        const queryParams = new URLSearchParams(formData).toString();

        // Make an AJAX request to filter concerts
        fetchFilteredConcerts(token, queryParams);
    });
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
    .then(userConcerts => {
        // Store the user's concerts with tickets in a variable
        const userConcertIds = userConcerts.map(concert => concert.id);

        // After fetching user's concerts, fetch and display all concerts
        fetchAllConcerts(token, userConcertIds);
    })
    .catch(error => {
        console.error('Error fetching user concerts with tickets:', error);
    });
}

function fetchAllConcerts(token, userConcertIds) {
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const apiUrl = 'http://127.0.0.1:8000/api/v1/concerts';

    fetch(apiUrl, {
        method: 'GET',
        headers: headers,
    })
    .then(response => response.json())
    .then(data => {
        // Process and display all concerts
        displayConcerts(data, userConcertIds);
    })
    .catch(error => {
        console.error('Error fetching all concerts:', error);
    });
}

// Function to display concerts
function displayConcerts(concerts, userConcertIds) {
    const concertsContainer = document.getElementById('concertsContainer');
    concertsContainer.innerHTML = '';

    if (Array.isArray(concerts) && concerts.length === 0) {
        concertsContainer.innerHTML = "<p> There are no concerts available. </p>";
        return;
    }

    concerts.forEach(concert => {
        createConcertElement(concertsContainer, concert, userConcertIds);
    });
}

// Helper function to create a concert element
function createConcertElement(container, concert, userConcertIds) {
    const concertDiv = document.createElement('div');
    concertDiv.classList.add('concert');

    const price = concert.original_price - (concert.original_price * concert.discount / 100);
    const artistNames = concert.artists.map(artist => artist.name).join(', ');

    // Check if the concert is in the user's concert list
    const isUserConcert = userConcertIds.includes(concert.id);

    let concertInfo = `
        <h2>${concert.title}</h2>
        <p>Artists: ${artistNames}</p>
        <p>Date: ${concert.datetime}</p>
        <p>Location: ${concert.address}, ${concert.city}, ${concert.country}</p>
        <p>Max Capacity: ${concert.max_capacity}</p>
        <p>${concert.is_outdoors ? 'Outdoors' : 'Indoors'}</p>
        <p>Price: $${price}</p>
    `;

    if (isUserConcert) {
        // Show a message if the user has tickets for this concert
        concertInfo += "<p>You already have tickets for this show.</p>";
    } else {
        // Show a button to buy tickets if the user doesn't have tickets
        concertInfo += `<button onclick="buyTicket(${concert.id})">Buy tickets</button>`;
    }

    concertDiv.innerHTML = concertInfo;
    container.appendChild(concertDiv);
}

// Function to get a cookie by name (similar to the previous code)
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Function to buy tickets (similar to the previous code)
function buyTicket(concert_id) {
    const token = getCookie('token');
    if (!token) {
        // Handle the case when the user is not authenticated
        return;
    }

    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const requestBody = JSON.stringify({ concert_id });

    fetch('http://127.0.0.1:8000/api/v1/concerts/buy', {
        method: 'POST',
        headers: headers,
        body: requestBody,
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response data as needed (e.g., show a confirmation message)
        console.log('Ticket purchase response:', data);

        // After buying tickets, refresh the user's concerts
        fetchUserConcertsWithTickets(token);
    })
    .catch(error => {
        console.error('Error buying tickets:', error);
    });
}
