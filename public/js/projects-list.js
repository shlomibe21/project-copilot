'use strict';

// Get projects list
function getProjectsList(callbackFn) {
    $.ajax({
        url: "/api/projects/projects-list",
        type: 'GET',
        contentType: 'application/json',
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
    if (item.tasks) {
        // Build tasks template
        tasksInfo = item.tasks.map((task) => projectTasksReadTemplate(task));
    }
    let template = `
    <li>
    <div class="centered-content js-tasks" data-id="${item.id}">
    ${headerInfo}${tasksInfo.join("")}
    <button class="edit-task-button">Edit</button>
    <button class="delete-task-button">Delete</button>
    </div>
    </li>
    `;
    return template;
}

function displayProjects(data) {
    for (let listItem in data.projects) {
        let item = data.projects[listItem];
        let project = renderProject(item);
        $('.js-project-info').append(project);
    }
}

function displayProjectsList() {
    getProjectsList(displayProjects);
}

function displayProjectClick() {
    /*$('.js-project-info').on('click', '.js-tasks', function (event) {
        let id = $(event.currentTarget).find("input[name*='id']").val();
        //console.log(id);
        window.location.href = "project-read.html?id=" + id;
    });*/
}

function editProjectClick() {
    $('.js-project-info').on('click', '.edit-task-button', function (event) {
        let id = $(event.currentTarget).parent().find("input[name*='id']").val();
        //console.log(id);
        window.location.href = "project-update.html?id=" + id;
    });
}

function deleteProjectClick() {
    $('.js-project-info').on('click', '.delete-task-button', function (event) {
        let id = $(event.currentTarget).parent().find("input[name*='id']").val();
        //console.log(id);
        window.location.href = "project-delete.html?id=" + id;
    });
}

function handleProjectsList() {
    displayProjectsList();
    displayProjectClick();
    editProjectClick();
    deleteProjectClick();
}

$(handleProjectsList);