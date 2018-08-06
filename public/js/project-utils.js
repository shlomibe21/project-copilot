'use strict';

function datePicker() {
    $('.js-projects-info').on('focus', '.date-picker', event => {
        $(".date-picker").datepicker({
            gotoCurrent: true
        });
    });
}

// Build a read template for the header of the current project
function projectHeaderReadTemplate(item) {
    // Format dates before displaying them
    item.dueDate = item.dueDate ? $.datepicker.formatDate("mm/dd/yy", new Date(item.dueDate)) : "";
    item.startingDate = item.startingDate ? $.datepicker.formatDate("mm/dd/yy", new Date(item.startingDate)) : "";
    item.endingDate = item.endingDate ? $.datepicker.formatDate("mm/dd/yy", new Date(item.endingDate)) : "";

    const projectInfo = `
    <input type="hidden" name="id" value=${item.id}>
    <div class="row">
    <div class="col-12">
    <label>Company:</label>
    <p>${item.companyName ? item.companyName : ""}</p>
    </div>
    </div>
    <div class="row">
    <div class="col-12">
    <label>Project:</label>
    <p>${item.projectName ? item.projectName : ""}</p>
    </div>
    </div>
    <div class="row">
    <div class="col-4">
    <label>Status:</label>
    <p>${item.projectStatus ? item.projectStatus : ""}</p>
    </div>
    <div class="col-4">
    <label>Due Date:</label>
    <p>${item.dueDate ? item.dueDate : ""}</p>
    </div>
    </div>
    <div class="row">
    <div class="col-4">
    <label>Starting Date:</label>
    <p>${item.startingDate ? item.startingDate : ""}</p>
    </div>
    <div class="col-4">
    <label>Ending Date:</label>
    <p>${item.endingDate ? item.endingDate : ""}</p>
    </div>
    <div class="col-4">
    <label>Total Hours:</label>
    <p>${item.totalHours ? item.totalHours : ""}</p>
    </div>
    </div>
    `;

    return projectInfo;
}

// Build a read template for all the tasks of the current project
function projectTasksReadTemplate(task) {
    // Format dates before displaying them
    task.taskDueDate = task.taskDueDate ? $.datepicker.formatDate("mm/dd/yy", new Date(task.taskDueDate)) : "";
    task.taskStartingDate = task.taskStartingDate ? $.datepicker.formatDate("mm/dd/yy", new Date(task.taskStartingDate)) : "";

    const taskTemplate = `
    <div class="task-container">
    <input type="hidden" name="task-id" value=${task._id}>
    <div class="row">
    <div class="col-12">
    <label>Task:</label>
    <text>${task.taskName ? task.taskName : ""}</text>
    </div>
    </div>
    <div class="row">
    <div class="col-4">
    <label>Due Date:</label>
    <p>${task.taskDueDate ? task.taskDueDate : ""}</p>
    </div>
    <div class="col-4">
    <label>Starting Date:</label>
    <p>${task.taskStartingDate ? task.taskStartingDate : ""}</p>
    </div>
    <div class="col-4">
    <label>Hours:</label>
    <p>${task.hours ? task.hours : ""}</p>
    </div>
    </div>
    <div class="row">
    <div class="col-12">
    <label>Description:</label>
    <p>${task.description ? task.description : ""}</p>
    </div>
    </div>
    </div>
    `;

    return taskTemplate;
}

// Build an editable template for the header of the current project
function projectHeaderUpdateTemplate(item) {
     // Format dates before displaying them
     item.dueDate = item.dueDate ? $.datepicker.formatDate("mm/dd/yy", new Date(item.dueDate)) : "";
     item.startingDate = item.startingDate ? $.datepicker.formatDate("mm/dd/yy", new Date(item.startingDate)) : "";
     item.endingDate = item.endingDate ? $.datepicker.formatDate("mm/dd/yy", new Date(item.endingDate)) : "";
    
    const projectInfo = `
    <input type="hidden" name="id" value=${item.id}>
    <div class="row">
    <div class="col-12">
    <label for="companyName">Company:</label>
    <input type="text" value="${item.companyName ? item.companyName : ""}" name="companyName" id="company-name" class="company-name form-input" required>
    </div>
    </div>
    <div class="row">
    <div class="col-12">
    <label for="project-name">Project:</label>
    <input type="text" value="${item.projectName ? item.projectName : ""}" name="projectName" id="project-name" class="project-name form-input" required>
    </div>
    </div>
    <div class="row">
    <div class="col-4">
    <label for="projectStatus">Status:</label>
    <select name="projectStatus" id="project-status" class="project-status form-input">
    <option value=${item.projectStatus ? item.projectStatus : ""} disabled selected>${item.projectStatus ? item.projectStatus : ""}</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
        <option value="Waiting for payment">Waiting for payment</option>
        <option value="Payment recieved">Payment recieved</option>
    </select>
    </div>
    <div class="col-4">
    <label for="dueDate">Due Date:</label>
    <input type="text" value="${item.dueDate ? item.dueDate : ""}" name="dueDate" id="due-date" class="date-picker due-date form-input" autocomplete="off">
    </div>
    </div>
    <div class="row">
    <div class="col-4">
    <label for="startingDate">Starting Date:</label>
    <input type="text" value="${item.startingDate ? item.startingDate : ""}" name="startingDate" id="startig-date" class="date-picker startig-date form-input" autocomplete="off">
    </div>
    <div class="col-4">
    <label for="endingDate">Ending Date:</label>
    <input type="text" value="${item.endingDate ? item.endingDate : ""}" name="endingDate" id="ending-date" class="date-picker ending-date form-input" autocomplete="off">
    </div>
    <div class="col-4">
    <label for="totalHours">Total Hours:</label>
    <input type="text" value="${item.totalHours ? item.totalHours : ""}" name="totalHours" id="total-hours" class="total-hours form-input">
    </div>
    </div>
    `;

    return projectInfo;
}

// Build an editable template for all the tasks of the current project
function projectTasksUpdateTemplate(task) {
    // Format dates before displaying them
    task.taskDueDate = task.taskDueDate ? $.datepicker.formatDate("mm/dd/yy", new Date(task.taskDueDate)) : "";
    task.taskStartingDate = task.taskStartingDate ? $.datepicker.formatDate("mm/dd/yy", new Date(task.taskStartingDate)) : "";

    const taskTemplate = `
    <li>
    <div class="task-container">
    <input type="hidden" name="taskid" value=${task._id}>
    <div class="row">
    <div class="col-12">
    <label for="taskName">Task:</label>
    <input type="text" value="${task.taskName ? task.taskName : ""}" name="taskName" class="task-name form-input" required>
    </div>
    </div>
    <div class="row">
    <div class="col-4">
    <label for="dueDate">Due Date:</label>
    <input type="text" value="${task.taskDueDate ? task.taskDueDate : ""}" name="taskDueDate" class="date-picker task-due-date form-input" autocomplete="off">
    </div>    
    <div class="col-4">
    <label for="startingDate">Starting Date:</label>
    <input type="text" value="${task.taskStartingDate ? task.taskStartingDate : ""}" name="taskStartingDate" class="date-picker task-starting-date form-input" autocomplete="off">
    </div>
    <div class="col-4">
    <label for="hours">Hours:</label>
    <input type="text" value="${task.hours ? task.hours : ""}" name="hours" class="hours form-input">
    </div>
    </div>
    <div class="row">
    <div class="col-12">
    <label for="description">Description:</label>
    <textarea name="description" class="description form-input">${task.description ? task.description : ""}</textarea>
    </div>
    </div>
    <div>
    <button type="button" class="delete-task-button">Delete Task</button>
    </div>
    </div>
    </li>
    `;

    return taskTemplate;
}

/*<input type="text" value="${task.description ? task.description : ""}" name="description" class="description form-input">*/