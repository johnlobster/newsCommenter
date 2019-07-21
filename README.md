# newsCommenter

Fullstack app that scrapes a web page, saves results in a mongodb database, presents database to web page and
then allows users to make notes about individual articles

#### Technologies and node modules
* mongodb
* mongoose
* axios
* winston
* morgan 
* javascript
* jQuery
* GitHub
* node.js
* express
* handlebars
* html
* sass
* autoprefixer
* bootstrap
* Heroku
* mocha
* chai
* chai-http

#### Onion scraper

This app scrapes the site "The onion" - so I use the title "Onion scraper". "The onion" is a satirical online newspaper. The stories are not real

#### Deployed

<https://stormy-ravine-83945.herokuapp.com/>

Note - heroku apps are paused if not in use, will take 10-15 seconds for it to restart

#### Github repository

<https://github.com/johnlobster/newsCommenter.git>

#### Running locally

clone the master repo, cd to newsCommenter directory

`npm install` will install all the node modules

`mongod` must be running and have the `newsCommenter` database defined

`node server` will run the application, and the output can be accessed from `http://localhost:8080/`

##### css creation
If `sass`, `postcss-cli` and `autoprefixer` are all saved globally, the following bash command can be run in the `public/css` directory
```
sass index.scss temp.css && postcss temp.css --use autoprefixer --output index.css
```
sass, postcss and autoprefixer are all node modules

#### API

##### html routes

`/` or `index.html`. Fetches articles from the database and renders html on page

`*` renders a 404 page (page not found)

##### API routes

`/api/scrape` Gets data from the onion web page and puts it into the mongodb database. Returns 200 status to web page, which then redirects to `/`, causing the web page to reload with new data. The old data is not discarded.

`POST /api/newNote` Creates a new note. The request body contains the article id (unique id created by mongodb), and the content of the note. The article is looked up in mongodb and the note content added into the article (Schema defines an array of notes)

#### Design notes

##### Scraping

##### Styling

##### Modularity

##### Not included

* User registering, login, logout and session so that notes can be identified by a user name. 
* Note deletion
* Improved styling
