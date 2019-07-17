module.exports = function (app) {

  // Load index page
  app.get("/", function (req, res) {
      res.render("index", {});
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    // console.log("Oh no 404 time again");
    res.status("404").render("404", { badUrl: req.url });
  });
};