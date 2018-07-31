'use strict';

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

function logoutClick() {
    $('.logout').on('click', event => {
		event.preventDefault();
		localStorage.setItem('token','');
		window.location.href = "/";
	});
}
function handleAuthentication() {
    logoutClick();
}

$(handleAuthentication);