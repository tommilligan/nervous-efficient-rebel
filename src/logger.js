var winston = require('winston');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { level: 'silly', colorize:true });
winston.add(winston.transports.File, {
    level: 'silly',
    filename: 'ner-server.log',
    name: 'custom-log',
    handleExceptions: true,
    humanReadableUnhandledException: true
});

module.exports = winston;