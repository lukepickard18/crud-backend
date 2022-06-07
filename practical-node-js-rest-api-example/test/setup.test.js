import User from "../models/users.js";
import Institution from "../models/institutions.js";
import Department from "../models/departments.js";
import Course from "../models/courses.js";

/**
 * Delete all resources
 */
const deleteResources = () => {
  User.deleteMany({}, (error) => {});
  Institution.deleteMany({}, (error) => {});
  Department.deleteMany({}, (error) => {});
  Course.deleteMany({}, (error) => {});
};

/**
 * Delete all resources before the tests are run. This method is
 * commonly called setUp in other programming languages, i.e., Python
 */
before((done) => {
  deleteResources();
  done();
});

after((done) => {
  /**
   * Hint: Refer to this resource - https://www.chaijs.com/plugins/chai-http, specifically
   * the "Retaining cookies with each request" section. Call the agent's close function
   */
  done();
});
