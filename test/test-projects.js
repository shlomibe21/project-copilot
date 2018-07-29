'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
// this makes the expect syntax available throughout this module
const expect = chai.expect;
// this makes the should syntax available throughout this module
const should = chai.should();

const { ProjectsDB } = require('../projects/models');
const { closeServer, runServer, app } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

// this function deletes the entire database.
// we'll call it in an `afterEach` block below
// to ensure  ata from one test does not stick
// around for next one
function tearDownDb() {
    return new Promise((resolve, reject) => {
        console.warn('Deleting database');
        mongoose.connection.dropDatabase()
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}

// used to put randomish documents in db
// so we have data to work with and assert about.
// we use the Faker library to automatically
// generate placeholder values for author, title, content
// and then we insert that data into mongo
function seedProjectCopilotData() {
    console.info('seeding Project-Copilot data');
    const seedData = [];
    for (let i = 1; i <= 5; i++) {
        seedData.push({
            companyName: faker.company.companyName(),
            projectName: faker.name.findName(),
            dueDate: faker.date.future(),
            startingDate: "",
            endingDate: "",
            createdDate: faker.date.past(),
            tasks: [
                {
                    createdDate: faker.date.past(),
                    description: faker.lorem.text(),
                    hours: faker.random.number({ min: 1, max: 100 })
                },
                {
                    createdDate: faker.date.past(),
                    description: faker.lorem.text(),
                    hours: faker.random.number({ min: 5, max: 100 })
                }
            ]
        });
    }
    // this will return a promise
    return ProjectsDB.insertMany(seedData);
}

describe("Project Copilot resource", function () {
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function () {
        return seedProjectCopilotData();
    });

    afterEach(function () {
        // tear down database so we ensure no state from this test
        // effects any coming after.
        return tearDownDb();
    });

    after(function () {
        return closeServer();
    });

    describe('GET /api/projects/projects-list', function () {
        it("Should return all existing projects", function () {
            // strategy:
            //    1. get back all projects returned by GET request
            //    2. prove res has right status, data type
            //    3. prove the number of projects we got back is equal to number in db.
            //
            // need to have access to mutate and access `res` across
            // `.then()` calls below, so declare it here so can modify in place
            let res;
            return chai.request(app)
                .get("/api/projects/projects-list")
                .then(function (_res) {
                    res = _res;
                    expect(res).to.have.status(200);
                    expect(res.body.projects).to.have.lengthOf.at.least(1);
                    return ProjectsDB.count();
                })
                .then(function (count) {
                    expect(res.body.projects).to.have.lengthOf(count);
                });
        });
    });

    describe('POST /api/projects/project-create', function () {
        it("should add a new project on POST", function () {
            // strategy: 
            // make a POST request with data,
            // then prove that the project we get back has
            // right keys, and that `id` is there (which means
            // the data was inserted into db)
            const newProject = {
                companyName: faker.company.companyName(),
                projectName: faker.name.findName(),
                created: faker.date.past()
            };
            return chai.request(app)
                .post("/api/projects/project-create")
                .send(newProject)
                .then(function (res) {
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    expect(res.body).to.be.a("object");
                    expect(res.body).to.include.keys('id', 'companyName', 'projectName', 'tasks');
                    expect(res.body.id).to.not.equal(null);
                    expect(res.body.companyName).to.be.equal(newProject.companyName);
                    expect(res.body.projectName).to.be.equal(newProject.projectName);
                    return ProjectsDB.findById(res.body.id);
                })
                .then(project => {
                    project.companyName.should.equal(newProject.companyName);
                    project.projectName.should.equal(newProject.projectName);
                    project.created.toString().should.equal(newProject.created.toString());
                });
        });
    });

    describe('PUT /api/projects/project-update/', function () {

        // strategy:
        //  1. Get an existing project from db
        //  2. Make a PUT request to update that project
        //  3. Prove project returned by request contains data we sent
        //  4. Prove project in db is correctly updated
        it('should update fields you send over', function () {
            const updateData = {
                companyName: 'Goldenson123 LLC',
                projectName: 'Blue Wave',
                tasks: [
                    {
                        createdDate: faker.date.past(),
                        description: 'This is the firs task.',
                        hours: 13
                    },
                    {
                        createdDate: faker.date.past(),
                        description: 'This is a task too.',
                        hours: 5
                    }
                ]
            };

            return ProjectsDB
                .findOne()
                .then(project => {
                    updateData.id = project.id;

                    // make request then inspect it to make sure it reflects
                    // data we sent
                    return chai.request(app)
                        .put(`/api/projects/project-update/${project.id}`)
                        .send(updateData);
                })
                .then(function (res) {
                    expect(res).to.have.status(201);
                    return ProjectsDB.findById(updateData.id);
                })
                .then(project => {
                    project.companyName.should.equal(updateData.companyName);
                    project.projectName.should.equal(updateData.projectName);
                    project.tasks[0].description.should.equal(updateData.tasks[0].description);
                });
        });
    });

    describe('DELETE /api/projects/project-delete/', function () {
        // test strategy:
        // 1. GET projects items so we can get ID of one to delete.
        // 2. make a DELETE request for the post's id.
        // 3. assert that response has right status code
        // 4. prove that post with the id doesn't exist in db anymore
        it('should delete a single project by id', function () {
            let post;

            return ProjectsDB
                .findOne()
                .then(_post => {
                    post = _post;
                    return chai.request(app).delete(`/api/projects/project-delete/${post.id}`);
                })
                .then(res => {
                    res.should.have.status(204);
                    return ProjectsDB.findById(post.id);
                })
                .then(_post => {
                    // when a variable's value is null, chaining `should`
                    // doesn't work. so `_post.should.be.null` would raise
                    // an error. `should.be.null(_post)` is how we can
                    // make assertions about a null value.
                    should.not.exist(_post);
                });
        });
    });
});