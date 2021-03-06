const { wError, wInfo, wDebug, wObj } = require("./debug.js")("api-routes.js");


const scraper = require("./scrape"); 

module.exports = function (app, db) {
  wInfo("Setting up api routes");
  // using api to scrape the targeted web page
  app.get("/api/scrape", function (req, res) {
    scraper(db)
      .then(scrape => {
        wDebug("Scraped ok");
        res.json("");
      })
      .catch((err) => {
        wError("scraper() failed");
        throw new Error(err);
      });
  });
  
  // post an article
  app.post("/api/newArticle", function( req, res) {
    // save article in mongo db
    // return article
    res.json("");
  });

  // create a new note
  app.post("/api/newNote", function (req, res) {
    // save note info in mongo db
    db.Article.findByIdAndUpdate(req.body.articleId, 
      { 
        $push: { 
          notes: { 
            $each: [{content:req.body.content}],
            $position: 0
          }
        }
      }
    , function(err, dbResult) {
      if (err) {
        wError("/api/newNote failed to update database");
        throw new Error(err);
      }
      else {
        wDebug("Added new note");
        // return success
        res.json("");
      }
    });
      
      
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