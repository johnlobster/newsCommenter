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

<https://theonion.com/>

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

##### logging

I chose `winston` as the data logger. I decided that I wanted
* log to show file name
* Whole line in color appropriate to severity
* easy function calls that are the same in every file

This is done in the file `routes\debug.js`. It is called by passing in the filename when required, for example
``` js
const { wError, wInfo, wDebug, wObj } = require("./debug.js")("html-routes.js");

```
The 4 functions are then available for use in that file, for instance
``` js
wDebug("Rendering index.html page, %d articles", allArticles.length);
```
The w (for winston) in front of the name makes it easy to complete the name in vscode. The levels are
* Error - red text, always active
* Info - white text, active during debug and test
* Debug - only active when `NODE_ENV="development"`

The fourth function console.logs an object, to 4 levels, using the builtin color/formatting in node. It is only active in debug

I had a lot of difficulty figuring out how to report http transactions with winston. I gave up and used morgan as it is very easy to configure.

##### Scraping

I had a lot of difficulty working through the structure of the web page, and finding consistent selectors that
would identify the fields I needed (website is built with React). I discovered that three articles were promoted and had a different structure (i.e. different styling). So the first 3 items are processed differently from the others.

The function is defined in `routes/scrape.js`. db has to be passed in, called in `routes/api-routes.js`

I put control logic functions in `routes`, as this is where they are used.

##### Styling

Bootstrap styling is very basic. I've been reading on :material design" and how motion attracts the users eye. Most items in the web page grow and drop a shadow when hovered over. Doesn't work so well in mobile unfortunately. The page is reactive, using bootstrap `col-` classes. The title font size is set to `6vw`. This is 6% of the view window size and so the title text shrinks or grows according to view window size.

##### Modularity

This app could be used to scrape different web sites. To modify, only have to alter
* `scrape.js`. This can also be changed if the structure of the web page changes
* Title
* Help modal - pops up when help button pressed

##### Not included

* User registering, login, logout and session so that notes can be identified by a user name. 
* Note deletion
* Improved styling
* Article deletion after a certain period of time
* Limit to number of articles shown on web page
