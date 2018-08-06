'use strict';

// If user is not authenticated go to login page
if (!localAuthToken) {
    window.location.href = "/";
}

// Get a single project
function getProjectInfo(callbackFn, id) {
    console.log(id);
    $.ajax({
        url: "/api/projects/project-read/" + id,
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
    $('.js-projects-info').append(headerInfo);

    if ((data.tasks) && ((data.tasks.length > 0))) {
        // Display tasks info
        let tasksInfo = data.tasks.map((task) => projectTasksReadTemplate(task));
        let tasksTemplate = `
        <section role="region" class="js-tasks">
        <legend class="tasks-title">Tasks:</legend>
        ${tasksInfo.join("")}
        </section>
        `;
        $('.js-projects-info').append(tasksTemplate);
    }
    displayTimer();
}

// Note: this function can stay the same when we
// connect to real API later
function displayProject(callbackFn) {
    // Get current url
    const url = window.location.search;
    // Get the id of the selected project from the url
    let itemId = getParamValFromUrl(url, 'id');
    if (!itemId) {
        alert('Project id is missing');
        return;
    }
    getProjectInfo(callbackFn, itemId);
}

function backToListClicked() {
    $('.back-button').click(event => {
        window.location.href = "projects-list.html";
    });
}

function handleProject() {
    displayProject(displayProjectInfo);
    backToListClicked()
}

$(handleProject);