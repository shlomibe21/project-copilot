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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tasks: [{
        created: { type: Date },
        taskName: { type: String},
        taskDueDate: { type: Date },
        taskStartingDate: { type: Date },    
        hours: { type: Number },
        description: { type: String }
    }],
});

projectCopilotSchema.methods.serialize = function () {
    return {
        id: this._id,
        companyName: this.companyName,
        projectName: this.projectName,
        projectStatus: this.projectStatus,
        dueDate: this.dueDate,
        startingDate: this.startingDate,
        endingDate: this.endingDate,
        totalHours: this.totalHours,
        createdDate: this.createdDate,
        tasks: this.tasks
    };
};

const ProjectsDB = mongoose.model('projects', projectCopilotSchema);

module.exports = { ProjectsDB };