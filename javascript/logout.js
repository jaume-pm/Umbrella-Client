document.addEventListener('DOMContentLoaded', function() {
    // Remove the 'token' and 'role' cookies
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Display a message in the 'message' div
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = 'You have been successfully logged out.';

    // Redirect to 'index.html' after 3 seconds
        window.location.href = '../index.html';
});
