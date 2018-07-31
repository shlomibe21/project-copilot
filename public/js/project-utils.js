'use strict';

let localAuthToken = localStorage.getItem('token');

// Build read template for the header of the current project
function projectHeaderReadTemplate(item) {
    const projectInfo = `
    <input type="hidden" name="id" value=${item.id}>
    <div>
    <label>Company Name:</label>
    <p>${item.companyName ? item.companyName : ""}</p>
    </div>
    <div>
    <label>Project Name:</label>
    <p>${item.projectName ? item.projectName : ""}</p>
    </div>
    <div>
    <label>Project Status:</label>
    <p>${item.projectStatus ? item.projectStatus : ""}</p>
    </div>
    <div>
    <label>Due Date:</label>
    <p>${item.dueDate ? item.dueDate : ""}</p>
    </div>
    <div>
    <label>Starting Date:</label>
    <p>${item.startigDate ? item.startigDate : ""}</p>
    </div>
    <div>
    <label>Ending Date:</label>
    <p>${item.endingDate ? item.endingDate : ""}</p>
    </div>
    <div>
    <label>Total Hours:</label>
    <p>${item.totalHours ? item.totalHours : ""}</p>
    </div>
    `;

    return projectInfo;
}

// Build read template for all the tasks of the current project
function projectTasksReadTemplate(task) {
    const tasks = `
    <input type="hidden" name="task-id" value=${task._id}>
    <div>
    <label>Description:</label>
    <p>${task.description ? task.description : ""}</p>
    </div>
    <div>
    <label>Hours:</label>
    <p>${task.hours ? task.hours : ""}</p>
    </div>
    `;

    return tasks;
}

// Build read template for the header of the current project
function projectHeaderUpdateTemplate(item) {
    const projectInfo = `
    <input type="hidden" name="id" value=${item.id}>
    <div>
    <label for="company-name">Company Name:</label>
    <input type="text" value="${item.companyName ? item.companyName : ""}" name="companyName" id="company-name" class="company-name">
    </div>
    <div>
    <label for="project-name">Project Name:</label>
    <input type="text" value="${item.projectName ? item.projectName : ""}" name="projectName" id="project-name" class="project-name">
    </div>
    <div>
    <label for="project-status">Project Status:</label>
    <input type="text" value="${item.projectStatus ? item.projectStatus : ""}" name="projectStatus" id="project-status" class="project-status">
    </div>
    <div>
    <label for="startig-date">Starting Date:</label>
    <input type="text" value="${item.startigDate ? item.startigDate : ""}" name="startigDate" id="startig-date" class="startig-date">
    </div>
    <div>
    <label for="ending-date">Ending Date:</label>
    <input type="text" value="${item.endingDate ? item.endingDate : ""}" name="endingDate" id="ending-date" class="ending-date">
    </div>
    <div>
    <label for="total-hours">Total Hours:</label>
    <input type="text" value="${item.totalHours ? item.totalHours : ""}" name="totalHours" id="total-hours" class="total-hours">
    </div>
    `;

    return projectInfo;
}

// Build read template for all the tasks of the current project
function projectTasksUpdateTemplate(task) {
    const tasks = `
    <input type="hidden" name="task-id" value=${task._id}>
    <div>
    <label for="description">Description:</label>
    <input type="text" value="${task.description ? task.description : ""}" name="description" class="description">
    </div>
    <div>
    <label for="hours">Hours:</label>
    <input type="text" value="${task.hours ? task.hours : ""}" name="hours" class="hours">
    </div>
    `;

    return tasks;
}