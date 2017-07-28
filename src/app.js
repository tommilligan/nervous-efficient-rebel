require('dotenv-safe').load();

var express = require('express')
var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(generalErrorHandler)

function generalErrorHandler (err, req, res, next) {
    res.status(500).json({error: 'general'});
}

var ner = require('ner');

var listenPort = process.env.NERVOUS_EFFICIENT_REBEL_PORT;

var extractEntities = (inputText) => {
    return new Promise((resolve, reject) => {
        console.log('Starting internal NER')
        try {
            ner.get({
                host: "localhost",
                port: process.env.STANFORD_NER_PORT
            }, inputText, (ex, results) => {
                if (ex) {
                    console.log(`Socket error in underlying NER service`)
                    console.log(ex)
                    ex.message = 'NER service failed; ' + ex.message;
                    reject(ex);
                } else {
                    console.log('NER returned internal results')
                    resolve(results.entities);
                }
            });
        } catch (ex) {
            console.log('Uncaught error in underlying NER service')
            console.log(ex)
            reject(ex)
        }
    });
};

app.post('/', (req, res) => {
    var inputText = req.body.payload;

    if ((typeof inputText === 'string' || inputText instanceof String) && inputText !== '') {
        extractEntities(inputText)
            .then(entities => {
                console.log('Extract entities resolved')
                res.json(entities);
            })
            .catch(ex => {
                console.error(ex)
                console.log('Extract entities caught error')
                res.status(503).json({});
            });
    } else {
        res.status(400).json({error: 'Payload is not string'});
    }
})

app.listen(listenPort, () => {
  console.log(`nervous-efficient-rebel listening on port ${listenPort}`);
})

module.exports = app;
