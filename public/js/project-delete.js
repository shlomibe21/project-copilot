'use strict';

// If user is not authenticated go to login page
if(!localAuthToken) {
    window.location.href = "/";
}

function deleteProject() {
    $('.delete-button').click(event => {
        event.preventDefault();
        // Get current url
        const url = window.location.search;
        // Get the id of the selected project from the url
        let itemId = getParamValFromUrl(url, 'id');

        $.ajax({
            url: "/api/projects/project-delete/" + itemId,
            type: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify({ id: itemId }),
            headers: { 
                "Authorization": 'Bearer ' + localAuthToken 
            },
            success: function (data) {
                // Upon success go back to project-list page
                window.location.href = "projects-list.html";
            },
            error: function (error) {
                console.log('error', error);
            },
        });
    });
}

function cancelDeleteClicked() {
    $('.cancel-button').click(event => {
        window.location.href = "projects-list.html";
    });
}

function displayProjectToDelete() {
    displayProject();
}

function handleProjectDelete() {
    displayProjectToDelete(displayProjectInfo);
    deleteProject();
    cancelDeleteClicked();
}

$(handleProjectDelete);