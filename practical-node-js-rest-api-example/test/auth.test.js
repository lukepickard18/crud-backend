/**
 * This File auth.test.js includes all the needed tests for authorization and user creation.
 */

import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

//Setting the mongo enviroment too testing
process.env.NODE_ENV = "testing";

chai.use(chaiHttp);

const agent = chai.request.agent(app);

/**
 * Fake user data too test with
 * */
const user = {
  name: {
    first: "John",
    last: "Doe",
  },
  email: "john.doe@email.com",
  password: "P@ssw0rd123",
};

/**
 * This test is designed too check if users can register or not. It
 * is extremeley important as without authentication none of the other tests
 * can run.
 */

//This first one is testing for an error (An invalid input).
describe("auth", () => {
  it("should register user with invalid input", (done) => {
    agent
      .post("/api/register")
      .send({})
      .end((error, res) => {
        chai.expect(res.status).to.be.equal(500);
        done();
      });
  });
  //And this one is testing for success (A valid input)
  it("should register user with valid input", (done) => {
    agent
      .post("/api/register")
      .send(user)
      .end((error, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.msg).to.be.equal("User successfully registered");
        done();
      });
  });
  //Same goes here but these ones are for logging in the previously created user
  //Testing too check if the login was unsuccessfull.
  it("should login user with invalid input", (done) => {
    agent
      .post("/api/login")
      .send({})
      .end((error, res) => {
        chai.expect(res.status).to.be.equal(401);
        chai.expect(res.body.msg).to.be.equal("Invalid email");
        done();
      });
  });
  //Testing to check if the login was a success.
  it("should login user with valid input", (done) => {
    agent
      .post("/api/login")
      .send({
        email: user.email,
        password: user.password,
      })
      .end((error, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.msg).to.be.equal("User successfully logged in");
        done();
      });
  });
});
/**
 * This is the logout test and this is commented out as when it is functioning
 * the rest of the tests will not run because they will have no authorization.
 */
/*it('should logout user with valid input', (done) => {
  agent
    .post('/api/logout')
    .send({
      email: user.email,
      password: user.password
    })
    .end((error, res) => {
      chai.expect(res.status).to.be.equal(201)
      chai.expect(res.body).to.be.a('object')
      chai.expect(res.body.msg).to.be.equal('Logged out')
      done()
    })
})
*/
export { agent };
