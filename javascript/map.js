document.addEventListener('DOMContentLoaded', function () {
    // Check if the user is authenticated
    const token = getCookie('token');

    // Initialize the map
    const map = L.map('map').setView([0, 0], 2); // Set initial view and zoom level

    // Add a tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Fetch all concerts and add markers for each concert with latitude and longitude
    fetchConcertsAndAddMarkers(map, token);
});

function redirectToConcertsPage(concertTitle) {
    // Redirect to the concerts page with the title query parameter
    window.location.href = `../html/concerts.html?title=${encodeURIComponent(concertTitle)}`;
}

function fetchConcertsAndAddMarkers(map, token) {
    // Make an AJAX request to fetch all concerts
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    $.ajax({
        url: 'http://127.0.0.1:8000/api/v1/concerts',
        type: 'GET',
        headers: headers,
        success: function (concerts) {
            // Loop through the concerts and add markers for each concert
            concerts.forEach(concert => {
                if (concert.latitude && concert.longitude) {
                    let umbrellaIcon;
                    const price = concert.original_price - (concert.original_price * concert.discount / 100);

                    if (concert.discount == 0) {
                        // Create a marker with the PNG icon
                        umbrellaIcon = L.icon({
                            iconUrl: '../static/umbrella.png',
                            iconSize: [35, 35], // Set the size of the icon
                        });
                    }
                    else {
                        umbrellaIcon = L.icon({
                            iconUrl: '../static/umbrellaRed.png',
                            iconSize: [35, 35], // Set the size of the icon
                        });
                    }


                    // Format date and time
                    const concertDateTime = new Date(concert.datetime);
                    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
                    const formattedDateTime = concertDateTime.toLocaleString('en-GB', options);

                    // Create a marker with the custom icon
                    L.marker([concert.latitude, concert.longitude], { icon: umbrellaIcon })
                        .addTo(map)
                        .bindPopup(`
                            <strong>${concert.title}</strong><br>
                            ${concert.address}, ${concert.city}, ${concert.country}<br>
                            Date & Time: ${formattedDateTime}<br>
                            Price: ${price}<br>
                            Discount: ${concert.discount}%
                            <button class="view-concerts-button" onclick="redirectToConcertsPage('${concert.title}')">See Full Info</button>
                        `)
                        .openPopup();
                }
            });
        },
        error: function (error) {
            console.error('Error fetching concerts:', error);
        }
    });
}




