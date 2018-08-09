'use strict';

// If user is not authenticated go to login page
if (!localAuthToken) {
    window.location.href = "/login.html";
}

let itemId;

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

function displayProjectInfo(data) {
    // Display header info
    let headerInfo = projectHeaderUpdateTemplate(data)
    $('.js-projects-info').append(headerInfo);

    if ((data.tasks) && ((data.tasks.length > 0))) {
        // Display tasks info
        let tasksInfo = data.tasks.map((task) => projectTasksUpdateTemplate(task));
        let tasksTemplate = `
        <section role="region" class="js-tasks">
        <legend class="tasks-title">Tasks:</legend>
        <ul>${tasksInfo.join("")}</ul>
        </section>
        `;
        $('.js-projects-info').append(tasksTemplate);
    }
}

function displayProject() {
    // Get current url
    const url = window.location.search;
    // Get the id of the selected project from the url
    itemId = getParamValFromUrl(url, 'id');
    if (!itemId) {
        alert('Project id is missing');
        return;
    }
    getProjectInfo(displayProjectInfo, itemId);
    displayTimer();
}

function addTaskClicked() {
    $('.add-task-button').click(event => {
        let task = {};
        let newTask = projectTasksUpdateTemplate(task);
        //console.log(newTask);
        $('.js-projects-info').append(newTask);
    });
}

function buildProjectData(fields, formData) {
    let task = {};
    let tasks = [];

    jQuery.each(fields, function (i, field) {
        //console.log(field.name);
        //console.log(field.value);
        // Update task fields
        if (field.name === 'taskName') {
            // First field, reset the object
            task = {};
            task[field.name] = field.value;
        }
        else if (field.name === 'taskDueDate') {
            task[field.name] = field.value;
        }
        else if (field.name === 'taskStartingDate') {
            task[field.name] = field.value;
        }
        else if (field.name === 'hours') {
            task[field.name] = field.value;
        }
        else if (field.name === 'description') {
            task[field.name] = field.value;
            tasks.push(task);
            console.log(tasks);
        }
        // Update all other fields
        else {
            formData[field.name] = field.value;
        }
    });

    formData['tasks'] = tasks;
    console.log(tasks);
    return formData;
}

$('.project-update-form').submit(event => {
    event.preventDefault();
    // Fetch all the the data from the form
    let fields = $("form").serializeArray();
    //console.log(fields);
    // Build an object with all the form's fields
    let formData = {};
    formData = buildProjectData(fields, formData);
    console.log(formData);
    $.ajax({
        url: "/api/projects/project-update/" + itemId,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData),
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

function cancelUpdateClicked() {
    $('.cancel-button').click(event => {
        window.location.href = "projects-list.html";
    });
}

function deleteTaskClicked() {
    $('.js-projects-info').on('click', '.delete-task-button', event => {
        event.stopPropagation();
        event.preventDefault();

        // Remove the selected task from the page
        $(event.currentTarget).parent().closest('li').remove();
    });
}

function deleteTaskFromDBClicked() {
    $('.js-task-info').on('click', '.delete-task-button', event => {
        event.stopPropagation();
        event.preventDefault();

        let taskId = $(event.currentTarget).parent().parent().find("input[name*='taskid']").val();
        //console.log(itemId);
        $.ajax({
            url: "/api/projects/task-delete/" + itemId + '/' + taskId,
            type: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify({ id: itemId }),
            headers: {
                "Authorization": 'Bearer ' + localAuthToken
            },
            success: function (data) {
                // Upon success, reload the current page, without using the cache
                window.location.reload(true);
            },
            error: function (error) {
                console.log('error', error);
            },
        });
    });
}

function deleteProjectClicked() {
    $('.delete-button').click(event => {
        window.location.href = "project-delete.html?id=" + itemId;
    });
}

function handleProject() {
    displayProject();
    addTaskClicked();
    cancelUpdateClicked();
    deleteProjectClicked();
    deleteTaskClicked();
    datePicker();
    datePickerSelect();
}

$(handleProject);