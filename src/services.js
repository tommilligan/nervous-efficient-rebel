var ner = require('ner');

// External services

var connectionDefaults = {
    port: process.env.STANFORD_NER_PORT,
    host: process.env.STANFORD_NER_HOST
};

var extractEntities = (inputText, connection = connectionDefaults) => {
    return new Promise((resolve, reject) => {
        ner.get(connection, inputText, (ex, results) => {
            if (ex) {
                ex.message = 'Could not reach NER service; ' + ex.message;
                reject(ex);
            } else {
                resolve(results.entities);
            }
        });
    });
};

module.exports = {extractEntities: extractEntities};
