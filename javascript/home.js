$(document).ready(function() {
    // Function to load HTML content into a specified container
    function loadContent(url, containerId) {
        $.get(url, function(data) {
            $(containerId).html(data);
        });
    }

    // Handle click on "Home" link
    $('#homeLink').click(function(e) {
        e.preventDefault();
        loadContent('../html/home.html', '#contentContainer');
        // Remove the "active" class from other links and add it to "Home"
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

    // Handle click on "Concerts" link
    $('#concertsLink').click(function(e) {
        loadContent('concerts.html', 'contentContainer');
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

    // Handle click on "Artists" link
    $('#artistsLink').click(function(e) {
        e.preventDefault();
        loadContent('../html/artists.html', '#contentContainer');
        // Remove the "active" class from other links and add it to "Artists"
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

    $('#myTicketsLink').click(function(e) {
        e.preventDefault();
        loadContent('../html/myTickets.html', '#contentContainer');
        // Remove the "active" class from other links and add it to "Artists"
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

    // Handle click on "Logout" link
    $('#logoutLink').click(function(e) {
        e.preventDefault();
        // Handle logout logic here, e.g., clear user session or token
    });

    // Load the initial content (e.g., "Home" page)
    loadContent('../html/home.html', '#contentContainer');
    $('#homeLink').addClass('active'); // Set "Home" as active initially
});
