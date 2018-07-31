'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const projectCopilotSchema = mongoose.Schema({
	companyName: { type: String, required: true },
    projectName: { type: String, required: true },
    projectStatus: {type: String},
    dueDate: { type: Date },
	startingDate: { type: Date },
    endingDate: { type: Date },
    totalHours: { type: Number },
    created: { type: Date, default: Date.now },
    tasks: [{
        created: { type: Date },
        description: { type: String},
        hours: { type: Number }
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