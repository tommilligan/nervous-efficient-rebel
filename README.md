# nervous-efficient-rebel (NER) service

This is a thin service providing a modern server wrapper for the 
Stanfords Named Entity Recognition (NER) Java service.

It aims to wrap a plain Java HTTP service in a thin Node server
for external exposure to the internet.

It provides additional feature such as:

* HTTP status codes
* JSON syntax
* HTTP-signature authentication


## Structure

The service is set up as follows:

* a simple listen-and-respond on socket Java server (internal localhost)
    * data analysis
    * provides Stanford NER (Named Entity Recognition)
    * XML endpoints
* a simple Node Express RESTful server
    * data proxy
    * uses `ner` internally
    * JSON endpoints


## Run

Top level run:
```bash
node src/app.js
```

See `.env.example` for environment variables that should be set.
