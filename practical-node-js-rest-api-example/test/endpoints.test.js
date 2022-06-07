/**
 * This file endpoints.test.js is for the two tests I have created too make sure that all the endpoints exist
 * and are in the correct order.
 */

import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";

import { agent } from "./auth.test.js";

const BASE_URL = "/api/v1";

//This test is retrieving all of the end points.
describe("All endpoints", () => {
  it("endpoints", (done) => {
    agent.get("/api").end((error, res) => {
      chai.expect(res.body).to.have.lengthOf(7); //And expecting there too be seven.
      chai.expect(res.status).to.be.equal(200);
      done();
    });
  });

  it("First Endpoint", (done) => {
    agent.get("/api").end((error, res) => {
      chai
        .expect(res.body[0])
        .to.be.equal(`http://localhost:3000/api/register`); //expecting the first endpoint to be /register.
      chai.expect(res.status).to.be.equal(200);
      done();
    });
  });
});
