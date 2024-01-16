$(document).ready(function() {
    $('#loginForm').submit(function(e) {
        e.preventDefault();

        const userData = {
            email: $('#email').val(),
            password: $('#password').val(),
        };

        $.ajax({
            url: 'http://localhost:8000/api/v1/login', // Change the URL to the login endpoint
            type: 'POST',
            contentType: 'application/json',
            headers: {
                'Accept': 'application/json'
            },
            data: JSON.stringify(userData),
            success: function(response) {
                console.log('Login successful', response);
                setTokenCookie(response.token, response.role); // Set token value in a cookie
                $('#errorContainer').empty(); // Clear error messages
                
                // Redirect to the "home" page or any other page after successful login
                window.location.href = 'home.html';
            },
            error: function(xhr, status, error) {
                console.error('Login failed', xhr.responseText);
                if (xhr.status === 422) {
                    const errors = JSON.parse(xhr.responseText);
                    displayErrors(errors); // Display error response
                } else {
                    $('#errorContainer').text('There is no user with this email and password.');
                }
            }
        });
    });

    function setTokenCookie(token, role) {
        // Set the 'token' cookie with the token value
        document.cookie = `token=${token}; path=/`;
        document.cookie = `role=${role}; path=/`;
    }

    function displayErrors(errors) {
        const errorContainer = $('#errorContainer');
        errorContainer.empty(); // Clear previous error messages

        if (errors.errors) {
            Object.keys(errors.errors).forEach(field => {
                errors.errors[field].forEach(errorMessage => {
                    const errorParagraph = $('<p>').text(errorMessage);
                    errorContainer.append(errorParagraph); // Create and add error <p> elements
                });
            });
        }
    }
});
