'use strict';

// If user is not authenticated go to login page
if(!localAuthToken) {
    window.location.href = "/";
}

// Get projects list
function getProjectsList(callbackFn) {
    $.ajax({
        url: "/api/projects/projects-list",
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

function renderProject(item) {
    // Build header template
    let headerInfo = projectHeaderReadTemplate(item);
    let tasksInfo;
    let tasksTemplate='';
    console.log(item.tasks);
    if ((item.tasks) && ((item.tasks.length > 0))) {
        // Build tasks template
        tasksInfo = item.tasks.map((task) => projectTasksReadTemplate(task));
        tasksTemplate = `
        <section role="region" class="js-tasks">
        <legend class="tasks-title">Tasks:</legend>
        ${tasksInfo.join("")}
        </section>
        `;
    }
    let template = `
    <section role="region" class="js-project-frame">
    <legend></legend>
    <li>
    <div class="js-project-content">
    <div class="js-project-header">
    ${headerInfo}
    </div>
    ${tasksTemplate}
    </div>
    <button class="view-project-button">View</button>
    <button class="edit-project-button">Edit</button>
    <button class="delete-project-button">Delete</button>
    </li>
    </section>
    `;
    return template;
}

function displayProjects(data) {
    for (let listItem in data.projects) {
        let item = data.projects[listItem];
        let project = renderProject(item);
        $('.js-projects-info').append(project);
    }
}

function displayProjectsList() {
    getProjectsList(displayProjects);
}

function viewProjectClicked() {
    $('.js-projects-info').on('click', '.view-project-button', event => {
        event.stopPropagation();
        let id = $(event.currentTarget).parent().find("input[name*='id']").val();
        //console.log(id);
        window.location.href = "project-read.html?id=" + id;
    });
}

function editProjectClicked() {
    $('.js-projects-info').on('click', '.edit-project-button', event => {
        event.stopPropagation();
        let id = $(event.currentTarget).parent().find("input[name*='id']").val();
        //console.log(id);
        window.location.href = "project-update.html?id=" + id;
    });
}

function deleteProjectClicked() {
    $('.js-projects-info').on('click', '.delete-project-button', event => {
        event.stopPropagation();
        let id = $(event.currentTarget).parent().find("input[name*='id']").val();
        //console.log(id);
        window.location.href = "project-delete.html?id=" + id;
    });
}

function handleProjectsList() {
    displayProjectsList();
    viewProjectClicked();
    editProjectClicked();
    deleteProjectClicked();
}

$(handleProjectsList);