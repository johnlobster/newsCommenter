// set up loggers using winston

// this module returns 3 functions for error, info and debug, showing [fileName] and
// colored message
// use example: let {wError, wInfo, wDebug} = require("./routes/debug.js")("server.js");

const winston = require('winston');

// select level of logging according to NODE_ENV
const loggerLevel = (process.env.NODE_ENV === "development") ? "debug" : "info";

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
  
  return {
    wError: function (...logMessage) {
      newLogger.error(logMessage);
    },
    wInfo: function (...logMessage) {
      newLogger.info(...logMessage);
    },
    wDebug: function (...logMessage) {
      newLogger.debug(...logMessage);
    }
  }
}

