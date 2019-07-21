const { wError, wInfo, wDebug, wObj } = require("./debug.js")("html-routes.js");

module.exports = function (app, db) {

  // Load index page
  app.get("/", function (req, res) {
    db.Article.find({}).sort({ created: -1 }).exec( function( err, allArticles) {
      if( err) {
        wError("db.Article.find() failed in html route /");
        throw new Error(err);
      }
      wDebug("Rendering index.html page, %d articles", allArticles.length);
      res.render("index", { allArticles: allArticles });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.status("404").render("404", { badUrl: req.url });
  });
};