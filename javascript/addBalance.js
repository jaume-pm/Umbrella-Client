// Get token from cookie
const token = getCookie('token');
let show_filters = false;

// Set headers
const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
};

function getBalance() {
    // Make an AJAX request to the Laravel API endpoint
    $.ajax({
        url: 'http://127.0.0.1:8000/api/v1/user/balance',
        type: 'GET',
        headers: headers,
        success: function (data) {
            // Handle the response and update the concerts container
            showBalance(data);
        },
        error: function (error) {
            console.error('Error getting balance:', error);
        }
    });
}

function showBalance(data){
    $('#currentBalance').text("Current Balance: " + data.balance);
}

function addBalance() {
    let addFunds = $('#addBalance').val(); // Get the value of the input field
    let data = { balance: addFunds }; // Assuming you want to send the value as part of the request payload

    $.ajax({
        url: 'http://127.0.0.1:8000/api/v1/user/balance',
        type: 'PATCH',
        contentType: 'application/json',
        headers: headers,
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (data) {
            showBalance(data);
        },
        error: function (xhr, status, error) {
            console.error('Error adding funds:', xhr.responseText);
        }
    });
}

$(document).ready(function () {
    getBalance();
    $('#balanceForm').submit(function (event) {
        event.preventDefault();
        // Dynamically construct data object with filled form fields
        addBalance();
    });
});

