require('dotenv-safe').load();

var express = require('express')
var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var ner = require('ner');

var listenPort = process.env.NERVOUS_EFFICIENT_REBEL_PORT;

var extractEntities = (inputText) => {
    return new Promise((resolve, reject) => {
        console.log('Starting internal NER')
        ner.get({
            host: "localhost",
            port: process.env.STANFORD_NER_PORT
        }, inputText, (ex, results) => {
            if (ex) {
                console.log('NER errored')
                console.log(ex)
                ex.message = 'Could not reach NER service; ' + ex.message;
                reject(ex);
            } else {
                console.log('NER returned internal results')
                resolve(results.entities);
            }
        });
    });
};

app.post('/', (req, res) => {
    try {
        var inputText = req.body.payload;
    } catch (ex) {
        console.log('Bad request')
        res.status(400);
    }
    extractEntities(inputText)
        .then(entities => {
            console.log('Extract entities resolved')
            res.json(entities);
        })
        .catch(ex => {
            console.error(ex)
            console.log('Extract entities caught error')
            res.status(503).json({});
        })
})

app.listen(listenPort, () => {
  console.log(`nervous-efficient-rebel listening on port ${listenPort}`);
})

module.exports = app;
