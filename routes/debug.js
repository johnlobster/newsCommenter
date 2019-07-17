// set up loggers using winston

module.exports = function( winston, fileName) {
  let infoLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.splat(),
      winston.format.simple()
    ),
    transports: [
      new winston.transports.Console()
    ]
  });
  return infoLogger.info;
}