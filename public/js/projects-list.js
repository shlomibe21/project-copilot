'use strict';

// If user is not authenticated go to login page
if (!localAuthToken) {
    window.location.href = "/login.html";
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
    let tasksTemplate = '';
    let toggleTasksDisplayBtn = '';

    if ((item.tasks) && ((item.tasks.length > 0))) {
        // Build tasks template
        tasksInfo = item.tasks.map((task) => projectTasksReadTemplate(task));
        toggleTasksDisplayBtn = `
        <button class="toggle-tasks-display-button">More...</button>
        `;
        tasksTemplate = `
        <section role="region" class="js-tasks">
        <legend class="tasks-title">Tasks:</legend>
        ${tasksInfo.join("")}
        </section>
        `;
    }
    let template = `
    
    <li class="js-project-frame">
    <div class="js-project-content">
    <div class="js-project-header">
    ${headerInfo}
    </div>
    <div class="tasks-wrapper">
    ${tasksTemplate}
    </div>
    </div>
    <div class="buttons-bar">
    <button class="view-project-button">View</button>
    <button class="edit-project-button">Edit</button>
    <button class="delete-project-button">Delete</button>
    ${toggleTasksDisplayBtn}
    </div>
    </li>
    
    `;
    return template;
}

function displayProjects(data) {
    if((data.projects) && (data.projects.length > 0)) {
        $('.empty-page-msg').hide();
        for (let listItem in data.projects) {
            let item = data.projects[listItem];
            let project = renderProject(item);
            $('.js-projects-info').append(project);
        }    
    }
    else {
        $('.empty-page-msg').show();
    }
}

function displayProjectsList() {
    getProjectsList(displayProjects);
}

function viewProjectClicked() {
    $('.js-projects-info').on('click', '.view-project-button', event => {
        event.stopPropagation();
        let id = $(event.currentTarget).closest('li').find("input[name*='id']").val();
        window.location.href = "project-read.html?id=" + id;
    });
}

function editProjectClicked() {
    $('.js-projects-info').on('click', '.edit-project-button', event => {
        event.stopPropagation();
        let id = $(event.currentTarget).closest('li').find("input[name*='id']").val();
        window.location.href = "project-update.html?id=" + id;
    });
}

function deleteProjectClicked() {
    $('.js-projects-info').on('click', '.delete-project-button', event => {
        event.stopPropagation();
        let id = $(event.currentTarget).closest('li').find("input[name*='id']").val();
        window.location.href = "project-delete.html?id=" + id;
    });
}

function toggleTasksDisplayClicked() {
    $('.js-projects-info').on('click', '.toggle-tasks-display-button', event => {
        let wrapper = $(event.currentTarget).closest('li').find('.tasks-wrapper');
        wrapper.toggle();
        let btn = $(event.currentTarget).closest('li').find('.toggle-tasks-display-button');

        if (wrapper.is(':visible')) {
            btn.text('Less...'); 
        }
        else {
            btn.text('More...');
        }
    });
}

function handleProjectsList() {
    displayProjectsList();
    viewProjectClicked();
    editProjectClicked();
    deleteProjectClicked();
    toggleTasksDisplayClicked();
}

$(handleProjectsList);