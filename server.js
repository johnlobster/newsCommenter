// main entry to newsCommenter - the server

require("dotenv").config(); // add variables in .env file to process.env
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");


// winston for debug/logging, morgan for http requests
const winston = require('winston');
const morgan = require('morgan');

const infLogger = require("./routes/debug.js")(winston, "server");
//console.log("debug");
//console.log(dbug);
// const inf = dbug(winston,"server.js");
//console.log("info");
//console.log(inf);
// inf.info("Hello this is a log");
infLogger("Cool logging");
// infme = function(msg) {
//   return inf.info(msg);
// };
// infme("Another log");

// set up for different modes
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 8080;

// Load all models and initialize
const db = require("./models");
mongoose.connect("mongodb://localhost/newsCommenter", { useNewUrlParser: true });

// Initialize Express
var app = express();

// set up express middleware

// http logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// public is a static folder
app.use(express.static("public"));

// set up express routes (order is important)
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// Start the server
app.listen(PORT, function () {
  console.log("\nnewsCommenter app running on port " + PORT + "\n");
});

// export so usable by test programs
module.exports = {
  app: app,
  db : db
};