require('dotenv-safe').load();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressWinston = require('express-winston');
var winston = require('winston');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(generalErrorHandler);

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true,
            level: 'silly'
        }),
        new winston.transports.File({
            name: 'express-log',
            filename: 'ner-server-expwin.log',
            json: true,
            level: 'silly'
        })
    ]
}));

var logger = require('./logger'); 
var services = require('./services');

function generalErrorHandler (err, req, res, next) { // eslint-disable-line no-unused-vars
    res.status(500).json({error: 'general'});
}

var listenPort = process.env.NERVOUS_EFFICIENT_REBEL_PORT;

app.post('/', (req, res) => {
    var inputText = req.body.payload;

    if ((typeof inputText === 'string' || inputText instanceof String) && inputText !== '') {
        services.extractEntities(inputText)
            .then(entities => {
                res.json(entities);
            })
            .catch(ex => {
                logger.error(ex);
                res.status(503).json({});
            });
    } else {
        res.status(400).json({error: 'Invalid payload - must be string of length > 0'});
    }
});

app.listen(listenPort, () => {
    logger.info(`nervous-efficient-rebel listening on port ${listenPort}`);
});

module.exports = app;
