'use strict';

let itemId;

// If user is not authenticated go to login page
if (!localAuthToken) {
    window.location.href = "/login.html";
}

// Get a single project
function getProjectInfo(callbackFn, id) {
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
    let headerTemplate = `
    <div class="js-project-header">
    ${headerInfo}
    </div>
    `;
    $('.js-projects-info').append(headerTemplate);

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
    itemId = getParamValFromUrl(url, 'id');
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

function editProjectClicked() {
    $('.edit-button').click(event => {
        window.location.href = "project-update.html?id=" + itemId;
    });
}

function deleteProjectClicked() {
    $('.delete-button').click(event => {
        window.location.href = "project-delete.html?id=" + itemId;
    });
}

function handleProject() {
    displayProject(displayProjectInfo);
    backToListClicked();
    editProjectClicked();
    deleteProjectClicked();
}

$(handleProject);