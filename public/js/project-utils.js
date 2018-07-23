'use strict';

// Build read template for the header of the current project
function projectHeaderReadTemplate(item) {
    const projectInfo = `
    <div>
    <label>Company Name:</label>
    <p>${item.companyName}</p>
    </div>
    <div>
    <label>Project Name:</label>
    <p>${item.projectName}</p>
    </div>
    <div>
    <label>Project Status:</label>
    <p>${item.projectStatus}</p>
    </div>
    <div>
    <label>Starting Date:</label>
    <p>${item.startigDate}</p>
    </div>
    <div>
    <label>Ending Date:</label>
    <p>${item.endingDate}</p>
    </div>
    <div>
    <label>Total Hours:</label>
    <p>${item.totalHours}</p>
    </div>
    `;

    return projectInfo;
}

// Build read template for all the tasks of the current project
function projectTasksReadTemplate(task) {
    const tasks = `
    <div>
    <label>Description:</label>
    <p>${task.description}</p>
    </div>
    <div>
    <label>Hours:</label>
    <p>${task.hours}</p>
    </div>
    `;

    return tasks;
}

// Build read template for the header of the current project
function projectHeaderUpdateTemplate(item) {
    const projectInfo = `
    <div>
    <label for="company-name">Company Name:</label>
    <input type="text" value="${item.companyName}" name="company-name" id="company-name" class="company-name">
    </div>
    <div>
    <label for="project-name">Project Name:</label>
    <input type="text" value="${item.projectName}" name="project-name" id="project-name" class="project-name">
    </div>
    <div>
    <label for="project-status">Project Status:</label>
    <input type="text" value="${item.projectStatus}" name="project-status" id="project-status" class="project-status">
    </div>
    <div>
    <label for="startig-date">Starting Date:</label>
    <input type="text" value="${item.startigDate}" name="startig-date" id="startig-date" class="startig-date">
    </div>
    <div>
    <label for="ending-date">Ending Date:</label>
    <input type="text" value="${item.endingDate}" name="ending-date" id="ending-date" class="ending-date">
    </div>
    <div>
    <label for="total-hours">Total Hours:</label>
    <input type="text" value="${item.totalHours}" name="total-hours" id="total-hours" class="total-hours">
    </div>
    `;

    return projectInfo;
}

// Build read template for all the tasks of the current project
function projectTasksUpdateTemplate(task) {
    const tasks = `
    <div>
    <label for="description">Description:</label>
    <input type="text" value="${task.description}" name="description" class="description">
    </div>
    <div>
    <label for="hours">Hours:</label>
    <input type="text" value="${task.hours}" name="hours" class="hours">
    </div>
    `;

    return tasks;
}