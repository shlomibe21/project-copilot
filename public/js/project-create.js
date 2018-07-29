'use strict';

$('.project-create-form').submit(event => {
    event.preventDefault();
    // Fetch all the the data from the form
    let fields = $("form").serializeArray();
    
    // Build an object with all the form's fields
    let formData = {};    
    jQuery.each(fields, function (i, field) {
        //console.log(field.name);
        //console.log(field.value);
        formData[field.name] = field.value;
    });
    //console.log(newProject);
    $.ajax({
        url: "/api/projects/project-create",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (data) {
            // Upon success go back to project-list page
            window.location.href = "projects-list.html";
        },
        error: function (error) {
            console.log('error', error);
        },
    });
});

function handleProject() {
    
}

$(handleProject);