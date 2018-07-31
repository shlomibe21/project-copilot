'use strict';

// If user is not authenticated go to login page
if(!localAuthToken) {
    window.location.href = "/";
}

// Get a single project
function getProjectInfo(callbackFn, id) {
    console.log(id);
    $.ajax({
        url: "/api/projects/project-read" + id,
        type: 'GET',
        contentType: 'application/json',
        headers: { 
            "Authorization": 'Bearer ' + localAuthToken 
        },
        success: callbackFn,
        error: function (error) {
            console.log('error', error);
        },
    });
}

// Note: this function can stay the same when we connect
// to real API later
function displayProjectInfo(data) {
    // Display header info
    let headerInfo = projectHeaderReadTemplate(data)
    $('.js-project-info').append(headerInfo);

    // Display tasks info
    let tasksInfo = data.tasks.map((task) => projectTasksReadTemplate(task));
    $('.js-project-info').append(tasksInfo);
}

// Note: this function can stay the same when we
// connect to real API later
function displayProject() {
    // Get current url
    const url = window.location.search;
    // Get the id of the selected project from the url
    let itemId = getParamValFromUrl(url, 'id');
    if (!itemId) {
        alert('Project id is missing');
        return;
    }
    getProjectInfo(displayProjectInfo, itemId);
}

function handleProject() {
    displayProject();
}

$(handleProject);