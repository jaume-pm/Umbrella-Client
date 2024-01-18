document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const roleCookie = getCookie('role');
    const nameCookie = getCookie('name');
    const currentPage = window.location.pathname;

    if (roleCookie === 'user') {
        // User role
        const links = `
            <div class="left">
                <a href="home.html" class="${currentPage.includes('home.html') ? 'active' : ''}">Home</a>
                <a href="concerts.html" class="${currentPage.includes('concerts.html') ? 'active' : ''}">Concerts</a>
                <a href="artists.html" class="${currentPage.includes('artists.html') ? 'active' : ''}">Artists</a>
                <a href="tickets.html" class="${currentPage.includes('tickets.html') ? 'active' : ''}">My Tickets</a>
                <a href="map.html" class="${currentPage.includes('map.html') ? 'active' : ''}">Map</a>
                <a href="addBalance.html" class="${currentPage.includes('AddBalance.html') ? 'active' : ''}">Add Funds</a>
            </div>
            <div class="right">
                <a href="#" class="hello-text disabled-link">Hello, <b>${nameCookie}</b></a>
                <a href="logout.html" id="logoutLink">Logout</a>
            </div>
        `;
        navbar.innerHTML = links;
    } else if (roleCookie === 'admin') {
        // Admin role
        const links = `
            <div class="left">
                <a href="home.html" class="${currentPage.includes('home.html') ? 'active' : ''}">Home</a>
                <a href="concerts.html" class="${currentPage.includes('concerts.html') ? 'active' : ''}">Concerts</a>
                <a href="artists.html" class="${currentPage.includes('artists.html') ? 'active' : ''}">Artists</a>
                <a href="tickets.html" class="${currentPage.includes('tickets.html') ? 'active' : ''}">My Tickets</a>
                <a href="map.html" class="${currentPage.includes('map.html') ? 'active' : ''}">Map</a>
                <a href="addBalance.html" class="${currentPage.includes('AddBalance.html') ? 'active' : ''}">Add Funds</a>
                <a href="createConcert.html" class="${currentPage.includes('createConcert.html') ? 'active' : ''}">Create Concert</a>
                <a href="addArtist.html" class="${currentPage.includes('addArtist.html') ? 'active' : ''}">Add Artist</a>
            </div>
            <div class="right">
                <a href="#" class="hello-text disabled-link">Hello, <b>${nameCookie}</b></a>
                <a href="logout.html" id="logoutLink">Logout</a>
            </div>
        `;
        navbar.innerHTML = links;
    }
});
