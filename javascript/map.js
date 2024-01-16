document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is authenticated
    const token = getCookie('token');
    if (!token) {
        // Handle the case when the user is not authenticated (redirect to login or show a message)
        // For example:
        // window.location.href = 'login.html';
        return;
    }

    // Initialize the map
    const map = L.map('map').setView([0, 0], 2); // Set initial view and zoom level

    // Add a tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Fetch all concerts and add markers for each concert with latitude and longitude
    fetchConcertsAndAddMarkers(map, token);
});

function fetchConcertsAndAddMarkers(map, token) {
    // Make an AJAX request to fetch all concerts
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    fetch('http://127.0.0.1:8000/api/v1/concerts', {
        method: 'GET',
        headers: headers,
    })
    .then(response => response.json())
    .then(concerts => {
        // Loop through the concerts and add markers for each concert
        concerts.forEach(concert => {
            if (concert.latitude && concert.longitude) {
                // Create a marker with latitude and longitude
                const marker = L.marker([concert.latitude, concert.longitude])
                    .addTo(map)
                    .bindPopup(`<strong>${concert.title}</strong><br>${concert.address}, ${concert.city}, ${concert.country}`)
                    .openPopup();
            }
        });
    })
    .catch(error => {
        console.error('Error fetching concerts:', error);
    });

    
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
