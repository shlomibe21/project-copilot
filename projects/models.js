'use strict';

const mongoose = require('mongoose');
var dateFormat = require('dateformat');
mongoose.Promise = global.Promise;

const projectCopilotSchema = mongoose.Schema({
    companyName: { type: String, required: true },
    projectName: { type: String, required: true },
    projectStatus: { type: String },
    dueDate: { type: Date },
    startingDate: { type: Date },
    endingDate: { type: Date },
    totalHours: { type: Number },
    created: { type: Date, default: Date.now },
    tasks: [{
        created: { type: Date },
        description: { type: String },
        hours: { type: Number }
    }],
});

//var day=dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

projectCopilotSchema.virtual('dueDateFrmt').get(function () {
    let date = dateFormat(this.dueDate, "yyyy-mm-dd");
    return `${date}`;
});

projectCopilotSchema.virtual('startingDateFrmt').get(function () {
    let date = dateFormat(this.startingDate, "yyyy-mm-dd");
    return `${date}`;
});

projectCopilotSchema.virtual('endingDateFrmt').get(function () {
    let date = dateFormat(this.endinggDate, "yyyy-mm-dd");
    return `${date}`;
});

projectCopilotSchema.methods.serialize = function () {
    return {
        id: this._id,
        companyName: this.companyName,
        projectName: this.projectName,
        projectStatus: this.projectStatus,
        dueDate: this.dueDateFrmt,
        startingDate: this.startingDateFrmt,
        endingDate: this.endingDateFrmt,
        totalHours: this.totalHours,
        createdDate: this.createdDate,
        tasks: this.tasks
    };
};

const ProjectsDB = mongoose.model('projects', projectCopilotSchema);

module.exports = { ProjectsDB };