const token = getCookie('token');
$(document).ready(function() {
    $('#createConcertForm').submit(function(e) {
        e.preventDefault();

        const formattedDatetime = moment($('#datetime').val()).format('YYYY-MM-DD HH:mm:ss');

        const concertData = {
            title: $('#title').val(),
            max_capacity: $('#max_capacity').val(),
            datetime: formattedDatetime,
            is_outdoors: $('#is_outdoors').prop('checked'),
            address: $('#address').val(),
            city: $('#city').val(),
            country: $('#country').val(),
            original_price: $('#original_price').val(),
            max_discount: $('#max_discount').val()
        };

        $.ajax({
            url: 'https://umbrella.azurewebsites.net/api/v1/concerts',
            type: 'POST',
            contentType: 'application/json',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: JSON.stringify(concertData),
            success: function(response) {
                console.log('Concert created successfully', response);
                $('#createConcertForm')[0].reset();
                $('#errorContainer').text('Concert created successfully.'); // Clear error messages
            },
            error: function(xhr, status, error) {
                console.error('Concert creation failed', xhr.responseText);
                if (xhr.status === 422) {
                    const errors = JSON.parse(xhr.responseText);
                    displayErrors(errors); // Display error response
                } else if (xhr.status === 404){
                    $('#errorContainer').text("Coordinates for this address can't be found.");
                }
                else{
                    $('#errorContainer').text("An error occured when creating the concert.");
                }
            }
        });
    });

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
