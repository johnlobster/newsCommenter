// scraping function to read articles from "The onion"
// gets data using axios, saves to database, then returns
// used in api routes

// scraper function returns a promise. axios returns promise

axios = require("axios");
cheerio = require("cheerio");
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
        resolve(response);
      })
      .catch( function( error) {
        wError("error in axios get to " + scrapeUrl);
        reject(error);
      });
  });
}