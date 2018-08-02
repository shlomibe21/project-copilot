'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const { ProjectsDB } = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

const jwtAuth = passport.authenticate('jwt', { session: false });

// GET request to display projects list
router.get("/projects-list", jwtAuth, (req, res) => {
    ProjectsDB.find({user: req.user.id})
        .then(projects => {
            res.json({
                projects: projects.map(project => project.serialize())
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "GET Error: Internal server error" });
        });
});

// GET ID request to /project-read/:id
router.get('/project-read/:id', jwtAuth, (req, res) => {
    ProjectsDB.findById({ _id: req.params.id ,  user: req.user.id })
        .then(projects => res.json(projects.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "GET PROJECT BY ID Error: Internal server error" });
        });
});

// GET ID request to /task-read/:id
router.get('/task-read/:id', (req, res) => {
    ProjectsDB.findOneAndRemove({"tasks._id": req.params.id})
        .then(task => res.json(task))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "GET TASK BY ID Error: Internal server error" });
        });
});

// POST request, create a new project
router.post("/project-create", jwtAuth, (req, res) => {
    console.log(req.user);
    const requiredFields = ["companyName", "projectName"];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    ProjectsDB.create({
        companyName: req.body.companyName,
        projectName: req.body.projectName,
        projectStatus: req.body.projectStatus,
        dueDate: req.body.dueDate,
        startingDate: req.body.startingDate,
        endingDate: req.body.endingDate,
        totalHours: req.body.totalHours,
        created: req.body.created,
        user: req.user.id,
        tasks: req.body.tasks
    })
        .then(ProjectsDB => {
            res.status(201).json(ProjectsDB.serialize())
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'POST Error: Internal server error' });
        });
});


// PUT request, update project
router.put('/project-update/:id', jwtAuth, jsonParser, (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        const message = `Request path id \`${req.params.id}\` and request body id 
		\`${req.body.id}\` must match.`;
        console.error(message);
        return res.status(400).json({ message: message });
    }

    const toUpdate = {};
    // we only support a subset of fields being updateable.
    // if the user sent over any of the updatableFields, we udpate those values
    // in document
    const updateableFields = ['companyName', 'projectName', 'projectStatus', 
    'dueDate', 'startingDate', 'endingDate', 'totalHours', 'tasks'];

    updateableFields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    console.log(`Updating a project item: \`${req.params.id}\``);
    ProjectsDB
        .findByIdAndUpdate({ _id: req.params.id ,  user: req.user.id }, { $set: toUpdate }, { new: true })
        .then(project => res.status(201).json(project))
        .catch(error => res.status(500).json({ message: "Internal server error" }));
});

// DELETE request, delete a single project
router.delete("/project-delete/:id", jwtAuth, (req, res) => {
    ProjectsDB
        .findByIdAndRemove(req.params.id)
        .then(() => {
            console.log(`Deleted blog with id \`${req.params.id}\``);
            res.status(204).end();
        });
});

module.exports = { router };