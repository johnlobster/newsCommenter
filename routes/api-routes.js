//const winston = require('winston');
const { wError, wInfo, wDebug } = require("./debug.js")("api-routes.js");


const scraper = require("./scrape"); 

module.exports = function (app) {
  wInfo("Setting up api routes");
  // using api to scrape the targeted web page
  app.get("/api/scrape", function (req, res) {
    res.json("");
  });

  // post an article
  app.post("/api/newArticle", function( req, res) {
    // save article in mongo db
    // return article
    res.json("");
  });

  // create a new user
  app.post("/api/newUser", function (req, res) {
    // save user info in mongo db
    // return user
    res.json("");
  });

  app.post("/api/login", function (req, res) {
    // check user info in mongo db
    // return user
    res.json("");
  });

  app.post("/api/logout", function (req, res) {
    // check user info in mongo db
    // return user
    res.json("");
  });
}