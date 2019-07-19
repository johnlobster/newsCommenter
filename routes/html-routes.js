const { wError, wInfo, wDebug, wObj } = require("./debug.js")("html-routes.js");

module.exports = function (app, db) {

  // Load index page
  app.get("/", function (req, res) {
      db.Article.find({})
      .then((allArticles) => {
          wDebug("Rendering index.html page, %d articles", allArticles.length);
          res.render("index", {allArticles: allArticles});
      })
      .catch( err => {
        wError("mongoose access failed in / route");
        throw new Error(err);
      })
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.status("404").render("404", { badUrl: req.url });
  });
};