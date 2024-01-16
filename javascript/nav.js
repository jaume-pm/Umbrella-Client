// nav.js

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const roleCookie = getCookie('role');
    const currentPage = window.location.pathname;

    if (roleCookie === 'user') {
        // User role
        const links = `
            <a href="home.html" class="${currentPage.includes('home.html') ? 'active' : ''}">Home</a>
            <a href="concerts.html" class="${currentPage.includes('concerts.html') ? 'active' : ''}">Concerts</a>
            <a href="artists.html" class="${currentPage.includes('artists.html') ? 'active' : ''}">Artists</a>
            <a href="tickets.html" class="${currentPage.includes('tickets.html') ? 'active' : ''}">Tickets</a>
            <a href="map.html" class="${currentPage.includes('map.html') ? 'active' : ''}">Map</a>

            <a class="right" href="logout.html" id="logoutLink">Logout</a>
        `;
        navbar.innerHTML = links;
    } else if (roleCookie === 'admin') {
        // Admin role
        const links = `
        <a href="home.html" class="${currentPage.includes('home.html') ? 'active' : ''}">Home</a>
        <a href="concerts.html" class="${currentPage.includes('concerts.html') ? 'active' : ''}">Concerts</a>
        <a href="artists.html" class="${currentPage.includes('artists.html') ? 'active' : ''}">Artists</a>
        <a href="tickets.html" class="${currentPage.includes('tickets.html') ? 'active' : ''}">Tickets</a>
        <a href="map.html" class="${currentPage.includes('map.html') ? 'active' : ''}">Map</a>
            <a href="createConcert.html" class="${currentPage.includes('createConcert.html') ? 'active' : ''}">Create Concert</a>
            <a href="addArtist.html" class="${currentPage.includes('addArtist.html') ? 'active' : ''}">Add Artist</a>
            <a class="right" href="logout.html" id="logoutLink">Logout</a>
        `;
        navbar.innerHTML = links;
    }
});
