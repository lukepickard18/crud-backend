/**
 * This file is too hold the tests of the largest seciton which is institutions.
 */
import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";

import { agent } from "./auth.test.js";

const BASE_URL = "/api/v1/institutions";

const institutionOneId = new mongoose.mongo.ObjectId();
const institutionTwoId = new mongoose.mongo.ObjectId();

process.env.NODE_ENV = "testing";

chai.use(chaiHttp);
/**
 * These next tests create an institution and then read it too verify its creation.
 */
describe("institutions", () => {
  it("should create institution - otago polytechnic", (done) => {
    agent
      .post(BASE_URL)
      .send({
        _id: institutionOneId,
        name: "Otago Polytechnic",
        region: "Otago",
        country: "New Zealand",
      })
      .end((error, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai
          .expect(res.body.msg)
          .to.be.equal("Institution successfully created");
        done();
      });
  });
  //verifying the above test.
  it("should read institutions - otago polytechnic found", (done) => {
    agent.get(`${BASE_URL}/${institutionOneId}`).end((error, res) => {
      chai.expect(res.status).to.be.equal(200);
      chai.expect(res.body.data.name).to.be.equal("Otago Polytechnic");
      done();
    });
  });

  it("should create institution - waikato institute of technology", (done) => {
    agent
      .post(BASE_URL)
      .send({
        _id: institutionTwoId,
        name: "Waikato Institute of Technology",
        region: "Waikato",
        country: "New Zealand",
      })
      .end((error, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai
          .expect(res.body.msg)
          .to.be.equal("Institution successfully created");
        done();
      });
  });
  //verifying the above test.
  it("should read institutions - waikato institute of technology", (done) => {
    agent.get(`${BASE_URL}/${institutionTwoId}`).end((error, res) => {
      chai.expect(res.status).to.be.equal(200);
      chai
        .expect(res.body.data.name)
        .to.be.equal("Waikato Institute of Technology");
      done();
    });
  });
  //Updating a institution test.
  it("should update institution - waikato institute of technology", (done) => {
    agent
      .put(`${BASE_URL}/${institutionTwoId}`)
      .send({
        country: "Japan", //Changing the country too Japan.
      })
      .end((error, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai
          .expect(res.body.msg)
          .to.be.equal("Institution successfully updated"); //expected status message.
        done();
      });
  });
  //Finding institutions in waikato
  it("should read institutions in the Waikato region", (done) => {
    agent.get(`${BASE_URL}?region=Waikato`).end((error, res) => {
      chai.expect(res.status).to.be.equal(200);
      chai.expect(res.body.data).to.have.lengthOf(1); //There should only be one institution in waikato.
      done();
    });
  });
  it("should read institutions in asc order", (done) => {
    agent.get(`${BASE_URL}?sort_by=name&order_by=asc`).end((error, res) => {
      chai.expect(res.status).to.be.equal(200);
      chai
        .expect(res.body.data[0].name)
        .to.equal("Waikato Institute of Technology"); //Because its in asc order its testing that the first object in the array is "Waikato Institute of Technology".
      done();
    });
  });
  it("should read institutions - paging", (done) => {
    agent.get(`${BASE_URL}?page=1`).end((error, res) => {
      chai.expect(res.status).to.be.equal(200);
      chai.expect(res.body.page).to.be.equal(1); //Checking its page 1
      done();
    });
  });
  //Deletion
  it("should delete institution - otago polytechnic", (done) => {
    agent.delete(`${BASE_URL}/${institutionOneId}`).end((error, res) => {
      chai.expect(res.status).to.be.equal(200);
      chai.expect(res.body.msg).to.be.equal("Institution successfully deleted"); //Exptected status message.
      done();
    });
  });
});
export { institutionTwoId }; //exporting this as departments need an institution to belong too.
