'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require("../server");

// this makes the expect syntax available throughout
// this module
const expect = chai.expect;

chai.use(chaiHttp);

describe("Project Copilot", function () {
    /*before(function () {
        return runServer();
    });

    after(function () {
        return closeServer();
    });*/

    it("Should get 200 code on GET", function () {
        return chai
            .request(app)
            .get("/")
            .then(function (res) {
                expect(res).to.have.status(200);
            });
    });

    it("Should get 200 code on project-create", function () {
        return chai
            .request(app)
            .get("/project-create")
            .then(function (res) {
                expect(res).to.have.status(200);
            });
    });

    it("Should get 200 code on project-delete", function () {
        return chai
            .request(app)
            .get("/project-delete")
            .then(function (res) {
                expect(res).to.have.status(200);
            });
    });

    it("Should get 200 code on project-edit", function () {
        return chai
            .request(app)
            .get("/project-update")
            .then(function (res) {
                expect(res).to.have.status(200);
            });
    });

    it("Should get 200 code on project-view", function () {
        return chai
            .request(app)
            .get("/project-read")
            .then(function (res) {
                expect(res).to.have.status(200);
            });
    });

    it("Should get 200 code on projects-list", function () {
        return chai
            .request(app)
            .get("/projects-list")
            .then(function (res) {
                expect(res).to.have.status(200);
            });
    });
});