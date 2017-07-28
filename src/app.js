require('dotenv-safe').load();
var express = require('express')
var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(generalErrorHandler)

var services = require('./services');

function generalErrorHandler (err, req, res, next) {
    res.status(500).json({error: 'general'});
}

var listenPort = process.env.NERVOUS_EFFICIENT_REBEL_PORT;

app.post('/', (req, res) => {
    var inputText = req.body.payload;

    if ((typeof inputText === 'string' || inputText instanceof String) && inputText !== '') {
        services.extractEntities(inputText)
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
