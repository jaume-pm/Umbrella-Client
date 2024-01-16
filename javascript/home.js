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
       // Example usage:
        loadHTMLContent('concerts.html', 'contentContainer');
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

    function loadHTMLContent(filePath, containerId) {
        // Create a new XMLHttpRequest
        var xhr = new XMLHttpRequest();
        
        // Set up a callback function to handle the response
        xhr.onload = function() {
            if (xhr.status === 200) {
                // If the request was successful, inject the response into the specified container
                document.getElementById(containerId).innerHTML = xhr.responseText;
            } else {
                console.error('Failed to load HTML content: ' + filePath);
            }
        };
        
        // Open and send the GET request to the local file
        xhr.open('GET', filePath, true);
        xhr.send();
    }
    

    // Handle click on "Logout" link
    $('#logoutLink').click(function(e) {
        e.preventDefault();
        // Handle logout logic here, e.g., clear user session or token
    });

    // Load the initial content (e.g., "Home" page)
    loadContent('../html/home.html', '#contentContainer');
    $('#homeLink').addClass('active'); // Set "Home" as active initially
});
