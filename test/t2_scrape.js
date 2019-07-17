// unit testing for scrape function

const chai = require("chai");
const expect = require("chai").expect;

const scraper = require("../routes/scrape.js");

describe("scrape testing", () => {
  it("scrape testing", (done) => {
    scraper("")
      .then( (response) => {
        console.log("ok");
        console.log(response);
        done();
      })
      .catch( (error) => {
        console.log("Whoops");
        console.log("Error");
        done();
      })
    });
});
