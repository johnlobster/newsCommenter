// main entry to newsCommenter - the server
const express = require("express");
const mongoose = require("mongoose");

// Load all models and initialize
const db = require("./models");
mongoose.connect("mongodb://localhost/newsCommenter", { useNewUrlParser: true });

// Initialize Express
var app = express();
// set up express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// public is a static folder
app.use(express.static("public"));

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