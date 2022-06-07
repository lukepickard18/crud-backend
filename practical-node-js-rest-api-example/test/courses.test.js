/**
 * This file courses.test.js is too hold the testing of courses - and additionally any data linked to them.
 */

import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";

import { agent } from "./auth.test.js";
//Importing "itID" as its the department course1 belongs too.
import { itId } from "./department.test.js";

const BASE_URL = "/api/v1/courses";

const courseOneId = new mongoose.mongo.ObjectId();
const courseTwoId = new mongoose.mongo.ObjectId();

process.env.NODE_ENV = "testing";

/**
 * Placeholder course data too test with.
 */
const course1 = {
  _id: courseOneId,
  title: "Introductory Application Development Concepts",
  code: "ID607001",
  additional_information: {
    efts: 0.15,
    points: 15,
    fees: 750.0,
  },
  department: itId,
};
const course2 = {
  _id: courseTwoId,
  title: "Application Development",
  code: "ID607002",
  additional_information: {
    efts: 0.15,
    points: 15,
    fees: 750.0,
  },
  department: itId,
};

chai.use(chaiHttp);
/**
 * These next set of tests are creating the two courses above and checking that it is successfull.
 */
describe("courses", () => {
  it("should create course - Introductory Application Development Concepts", (done) => {
    agent
      .post(BASE_URL)
      .send(course1) //sending the data above
      .end((error, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body.msg).to.be.equal("Course successfully created"); //expected output message
        done();
      });
  });
  it("should create course - Application Development", (done) => {
    agent
      .post(BASE_URL)
      .send(course2)
      .end((error, res) => {
        chai.expect(res.status).to.be.equal(201); //Status message is expected to be equal too 201
        chai.expect(res.body.msg).to.be.equal("Course successfully created");
        done();
      });
  });
  /**
   * This next set of tests are testing for the existence of the previously created courses.
   */
  it("should read courses - Introductory Application Development Concepts", (done) => {
    agent.get(`${BASE_URL}/${courseOneId}`).end((error, res) => {
      //Searching in /api/v1/courses/ The ID of the course created above.
      chai.expect(res.status).to.be.equal(200);
      chai
        .expect(res.body.data.title)
        .to.be.equal("Introductory Application Development Concepts"); //Expecting the title of the course created above to check for it.
      done();
    });
  });
  it("should read courses - Application Development", (done) => {
    agent.get(`${BASE_URL}/${courseTwoId}`).end((error, res) => {
      chai.expect(res.status).to.be.equal(200);
      chai.expect(res.body.data.title).to.be.equal("Application Development");
      done();
    });
  });
  /**
   * Here are the Filtering, Sorting and paging tests for courses.
   */
  it("should read courses with code ID607001", (done) => {
    agent.get(`${BASE_URL}?code=ID607001`).end((error, res) => {
      //Checking that there is a course with this paper code.
      chai.expect(res.status).to.be.equal(200);
      chai.expect(res.body.data).to.have.lengthOf(1); //Checking that there is only one as only one with that code should exist.
      done();
    });
  });

  it("should read courses - paging", (done) => {
    agent.get(`${BASE_URL}?page=1`).end((error, res) => {
      //Getting the first page of the database specifically courses.
      chai.expect(res.status).to.be.equal(200);
      chai.expect(res.body.page).to.be.equal(1); //Expecting page 1
      done();
    });
  });

  it("should read courses in asc order", (done) => {
    agent.get(`${BASE_URL}?sort_by=title&order_by=asc`).end((error, res) => {
      //Sorting in asc order
      chai.expect(res.status).to.be.equal(200);
      chai
        .expect(res.body.data[0].title) // The first object in the array should be equal too "Introductory Application Development Concepts".
        .to.equal("Introductory Application Development Concepts");
      done();
    });
  });
  /**
   * These next tests are for updating courses.
   */
  it("should update course - Application Development", (done) => {
    agent
      .put(`${BASE_URL}/${courseTwoId}`)
      .send({
        title: "Application Development For Experts only", //sending a new title
        code: "ID607002",
        additional_information: {
          efts: 0.15,
          points: 15,
          fees: 750.0,
        },
        department: itId,
      })
      .end((error, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body.msg).to.be.equal("Course successfully updated"); //checking it was successfull.
        done();
      });
  });
  it("should delete course - Introductory Application Development Concepts", (done) => {
    agent.delete(`${BASE_URL}/${courseOneId}`).end((error, res) => {
      chai.expect(res.status).to.be.equal(200);
      chai.expect(res.body.msg).to.be.equal("Course successfully deleted"); //Checking it was deleted.
      done();
    });
  });
});

export { courseOneId };
