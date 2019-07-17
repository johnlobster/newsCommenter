// test that server can be started
// basic regression test
// tests that models and routes can be built without issues

const chaiHttp = require("chai-http");
const chai = require("chai");
const expect = require("chai").expect;
chai.use(chaiHttp);
var {app,db} = require("../server"); // this calls the server (server.js)

// server should really have a call back, but using a delay instead

describe("t0 test server startup", () => {
  it("Server should start without issues", (done) => {
    // wait for server to start before doing anything
    setTimeout(() => {
      // app should have lots of data in it, just check that it isn't still a blank object
      expect(typeof app.settings).to.equal("object");
      done();
    }, 1500);
  });
});