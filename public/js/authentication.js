'use strict';

let localAuthToken = localStorage.getItem('token');

// Check if user is authenticated and display related account information
if(localAuthToken) {
    // User is authenticated display related account info
    $('.top-nav').append(displayLoggedInInfo());
}
else {
    // User is not authenticated display related account info
    $('.top-nav').append(displayLoggedOutInfo());
}

// Display related information in case that user is authenticated
function displayLoggedInInfo() {
	return `
		<a href="/" class="logout-link">logout</a>
	`
}

// Display related information in case that user is not authenticated
function displayLoggedOutInfo() {
	return `
    <a href="/" class="login-link">login</a>
	`
}

$('.login-form').submit(event => {
    event.preventDefault();
    // Fetch all the the data from the form
    let fields = $("form").serializeArray();
    //console.log(fields);
    // Build an object with all the form's fields
    let formData = {};    
    jQuery.each(fields, function (i, field) {
        formData[field.name] = field.value;
    });  
    //console.log(formData);
    $.ajax({
        url: "/api/auth/login",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (jwt) {
            console.log(jwt.authToken);
            // Store authToken on client side
            localStorage.setItem('token', jwt.authToken);
            // Upon success go to projects list page
            window.location.href = "projects-list.html";
        },
        error: function (error) {
            console.log('error', error);
            const message = 'Incorrect username or password. Please fix and try again.';
            $('.js-error-message').html(message);
        },
    });
});

// logut a user
function logoutClicked() {
    $('.top-nav').on('click', '.logout-link', event => {
        event.preventDefault();
        // Clear the token
        localStorage.setItem('token','');
        // Move to index.html
		window.location.href = "/";
	});
}

function handleAuthentication() {
    logoutClicked();
}

$(handleAuthentication);