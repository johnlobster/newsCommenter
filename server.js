// main entry to newsCommenter - the server

require("dotenv").config(); // add variables in .env file to process.env
// set up for different modes, reading .env
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 8080;

const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");


// winston for debug/logging, morgan for http requests
const morgan = require('morgan');

// creates logging functions with label server.js
let {wError, wInfo, wDebug} = require("./routes/debug.js")("server.js");

// test logging
wInfo("Cool logging, we got %s", "something good");
wError("An error");
wDebug("Debug info");

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
  wInfo("newsCommenter app listening on port %s \n", PORT);
});

// export so usable by test programs
module.exports = {
  app: app,
  db : db
};