'use strict';

function getProjectInfo(callbackFn) {
    setTimeout(function () { callbackFn(MOCK_PROJECTS_LIST, 0) }, 100);
}

// Note: this function can stay the same when we connect
// to real API later
function displayProjectInfo(data) {
    // Get current url
    const url = window.location.search;   
    // Get the id of the selected project from the url
    let itemId = getParamValFromUrl(url, 'id');    
    if(!itemId) {
        alert('Project id is missing');
        return;
    }
    
    // Find the project with the given id
    let item = data.projectsList.find(val => val.id === itemId);
    if(!item) {
        alert("Can't find the requested project id=" + itemId);
        return;
    }
    
    // Display header info
    let headerInfo =  projectHeaderReadTemplate(item)
    $('.js-project-info').append(headerInfo);

    // Display tasks info
    let tasksInfo = item.tasks.map((task) => projectTasksReadTemplate(task));
    $('.js-project-info').append(tasksInfo);
}

// Note: this function can stay the same when we
// connect to real API later
function displayProject() {
    getProjectInfo(displayProjectInfo);
}

function handleProject() { 
    displayProject();
}

$(handleProject);