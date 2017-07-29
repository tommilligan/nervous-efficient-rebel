var logger = require('winston');

var ner = require('ner');

// External services

var connectionDefaults = {
    port: process.env.STANFORD_NER_PORT,
    host: process.env.STANFORD_NER_HOST
};

var extractEntities = (inputText, connection = connectionDefaults) => {
    return new Promise((resolve, reject) => {
        logger.debug('Connecting to Stanford NER service at %j', connection);
        ner.get(connection, inputText, (ex, results) => {
            if (ex) {
                logger.error('Error using Stanford NER service');
                logger.error('Failed resolving %j', inputText);
                reject(ex);
            } else {
                var entities = results.entities;
                logger.debug('Stanford NER service resolved entities successfully');
                logger.info('Resolved "%s..." to %j', inputText.substr(0, 20), entities);
                resolve(entities);
            }
        });
    });
};

module.exports = {extractEntities: extractEntities};
