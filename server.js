// main entry to newsCommenter - the server
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

// winston for debug/logging, morgan for http requests
const winston = require('winston');
const morgan = require('morgan');



// Load all models and initialize
const db = require("./models");
mongoose.connect("mongodb://localhost/newsCommenter", { useNewUrlParser: true });

// Initialize Express
var app = express();

// set up express middleware

// http logging
app.use(morgan("dev"));

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

const PORT = 8080;

// Start the server
app.listen(PORT, function () {
  console.log("\nnewsCommenter app running on port " + PORT + "\n");
});

// export so usable by test programs
module.exports = {
  app: app,
  db : db
};