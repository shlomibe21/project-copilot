'use strict';

function getProjectsList(callbackFn) {
    setTimeout(function () { callbackFn(MOCK_PROJECTS_LIST) }, 100);
}

// Note: this function can stay the same when we connect
// to real API later
function displayProjects(data) {
    for (let listItem in data.projectsList) {
        let item = data.projectsList[listItem];
        console.log(item);
        // Display header info
        let headerInfo = projectHeaderReadTemplate(item)
        $('.js-project-info').append(headerInfo);
        // Display tasks info
        let tasksInfo = item.tasks.map((task) => projectTasksReadTemplate(task));
        $('.js-project-info').append(tasksInfo);
    }
}

// Note: this function can stay the same when we
// connect to real API later
function displayProjectsList() {
    getProjectsList(displayProjects);
}

function handleProjectsList() {
    displayProjectsList();
}

$(handleProjectsList);