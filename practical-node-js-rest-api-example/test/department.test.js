/**
 * This is the file holding tests for the departments in the database.
 */

import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";

import { agent } from "./auth.test.js";
//importing institutionTwoId as it is required for department data to have a institution it belongs too.
import { institutionTwoId } from "./institutions.test.js";

const BASE_URL = "/api/v1/departments";

const itId = new mongoose.mongo.ObjectId();
const nursingId = new mongoose.mongo.ObjectId();

process.env.NODE_ENV = "testing";

chai.use(chaiHttp);
/**
 * placeholder data for testing.
 */
const departmentOne = {
  _id: itId,
  name: "Information Technology",
  institution: institutionTwoId,
};

const departmentTwo = {
  _id: nursingId,
  name: "Nursing",
  institution: institutionTwoId,
};
/**
 * These next tests are creating and then reading too verify the creation.
 */
describe("departments", () => {
  it("should create department - Information Technology", (done) => {
    agent
      .post(BASE_URL)
      .send(departmentOne)
      .end((error, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai
          .expect(res.body.msg)
          .to.be.equal("Department successfully created");
        done();
      });
  });
  //verification of the above test.
  it("should read department - Information Technology found", (done) => {
    agent.get(`${BASE_URL}/${itId}`).end((error, res) => {
      chai.expect(res.status).to.be.equal(200);
      chai.expect(res.body.data.name).to.be.equal("Information Technology");
      done();
    });
  });

  it("should create department - Nursing", (done) => {
    agent
      .post(BASE_URL)
      .send(departmentTwo)
      .end((error, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai
          .expect(res.body.msg)
          .to.be.equal("Department successfully created");
        done();
      });
  });
  //verification of the above test.
  it("should read department - Nursing", (done) => {
    agent.get(`${BASE_URL}/${nursingId}`).end((error, res) => {
      chai.expect(res.status).to.be.equal(200);
      chai.expect(res.body.data.name).to.be.equal("Nursing");
      done();
    });
  });
  /**
   * Filtering, Sorting and Paging tests.
   */
  //Checking for departments named nursing.
  it("should read departments named Nursing", (done) => {
    agent.get(`${BASE_URL}?name=Nursing`).end((error, res) => {
      chai.expect(res.status).to.be.equal(200);
      chai.expect(res.body.data).to.have.lengthOf(1); //expected that there is only one department named nursing.
      done();
    });
  });
  //Reading the departments in order test.
  it("should read departments in asc order", (done) => {
    agent.get(`${BASE_URL}?sort_by=name&order_by=asc`).end((error, res) => {
      chai.expect(res.status).to.be.equal(200);
      chai.expect(res.body.data[0].name).to.equal("Nursing"); //expecting the first object in the array too be Nursing.
      done();
    });
  });
  it("should update department - Nursing", (done) => {
    agent
      .put(`${BASE_URL}/${nursingId}`)
      .send({
        _id: nursingId,
        name: "Doctoring", //Updating the name of nursing.
        institution: institutionTwoId,
      })
      .end((error, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai
          .expect(res.body.msg)
          .to.be.equal("Department successfully updated"); //expected output message and status code.
        done();
      });
  });
  //testing the paging.
  it("should read department - paging", (done) => {
    agent.get(`${BASE_URL}?page=1`).end((error, res) => {
      chai.expect(res.status).to.be.equal(200);
      chai.expect(res.body.page).to.be.equal(1); //Expecting only one page.
      done();
    });
  });
  //Deletion.
  it("should delete department - Nursing", (done) => {
    agent.delete(`${BASE_URL}/${nursingId}`).end((error, res) => {
      chai.expect(res.status).to.be.equal(200);
      chai.expect(res.body.msg).to.be.equal("Department successfully deleted"); //Expected output for deletion.
      done();
    });
  });
});

export { itId };
