// scraping function to read articles from "The onion"
// gets data using axios, saves to database, then returns
// parsing was very hard, as different parts of page are layed out very differently

// used in api routes

// scraper function returns a promise. axios returns promise

const axios = require("axios");
const cheerio = require("cheerio");
const { wError, wInfo, wDebug, wObj } = require("./debug.js")("scrape.js");

const scrapeUrl = "http://www.theonion.com/"
module.exports = function (db) {
  return new Promise ((resolve, reject) => {
    // First, we grab the body of the html with axios
    wInfo("Scraping data from %s", scrapeUrl);
    axios.get(scrapeUrl)
      .then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        let $ = cheerio.load(response.data);
        let newArticle = {};
        let newArticles = [];
        $(".curation-mountain .zone__item").each(function (i, element) {
          newArticle = {};
          // wDebug("Searching loop iteration %d", i);
          if( i===3) { // last iteration is set up differently
            wDebug("Iteration 3");
            $(this).find(".item.branded-item").each( function(j, elem) {
              newArticle = {};
              // wDebug("Searching last zone__item iteration %d",j);
              newArticle.title = $(this).find("section a section h5").text();
              newArticle.fullArticleUrl = $(this).find(".image-container section a").attr("href");
              newArticle.pictureUrl = $(this)
                .find(".image-container section a img")
                .attr("srcset")
                .split(" ")[0];
              // wObj(newArticle);
              wDebug("Title : %s", newArticle.title);
              newArticles.push(newArticle);
              wObj(newArticles);
            });
          }
          else {
            newArticle.title = $(this).find(".image-container a").attr("title");
            newArticle.fullArticleUrl = $(this).find(".image-container a").attr("href");
            newArticle.pictureUrl = $(this)
              .find(".image-container a img")
              .attr("srcset");
            newArticle.pictureUrl = newArticle.pictureUrl.split(" ")[0];
            newArticles.push(newArticle);
            wObj(newArticles);
            wDebug("Title : %s", newArticle.title);
            // wObj(newArticle);
          }
        });
        wObj(newArticles);
        return(newArticles);
      })
      .then(allArticles => {
        wDebug("allArticles has %d articles", allArticles.length);
        db.Article.create(allArticles)
      })
      .then( () => {
        resolve(true);
      })
      .catch( function( error) {
        wError("error in axios get to " + scrapeUrl + " or parsing data, or saving to mongoose");
        reject(error);
      });
  });
}