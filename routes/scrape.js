// scraping function to read articles from "The onion"
// gets data using axios, saves to database, then returns
// used in api routes

// scraper function returns a promise. axios returns promise

axios = require("axios");
cheerio = require("cheerio");

module.exports = function (db) {
  return new Promise ((resolve, reject) => {
    // First, we grab the body of the html with axios
    axios.get("http://www.theonion.com/")
      .then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        let $ = cheerio.load(response.data);
        resolve();
      })
      .catch( function( error) {
        reject(error);
      });
  });
}