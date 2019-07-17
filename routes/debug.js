// set up loggers using winston

// this module returns 4 functions. Error, info and debug, and object pretty-print
// pretty-print of object is of level debug, so should not be used in production
// The message is colored according to level and labled with [fileName]
// use example: let {wError, wInfo, wDebug, wObj} = require("./routes/debug.js")("server.js");

const winston = require('winston');
const util = require('util');

// select level of logging according to NODE_ENV
//const loggerLevel = (process.env.NODE_ENV === "development") ? "debug" : "info";
const loggerLevel = "debug";

module.exports = function(fileName) {
  let newLogger = winston.createLogger({
    level: loggerLevel,
    format: winston.format.combine(
      winston.format.label({label: `${fileName}`, message:true}),
      winston.format.splat(),
      winston.format.colorize(
        { all: true, colors: { info: "white", error: "red", debug: "yellow" } }
      ),
      winston.format.printf( info => {
        return `${info.message}`;
      })      
    ),
    transports: [
      new winston.transports.Console()
    ]
  });
  let objLogger = winston.createLogger({
    level: loggerLevel,
    format: winston.format.printf(info => {
        return util.inspect(info.message, false, 4, true);
      }),
    transports: [
      new winston.transports.Console()
    ]
  });
  
  return {
    wError: function (...logMessage) {
      newLogger.error(logMessage);
    },
    wInfo: function (...logMessage) {
      newLogger.info(...logMessage);
    },
    wDebug: function (...logMessage) {
      newLogger.debug(...logMessage);
    },
    wObj: function (obj) { // note - should not be used in production as it is slow
      objLogger.debug(obj);
    }
  }
}

