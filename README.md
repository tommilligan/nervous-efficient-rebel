# nervous-efficient-rebel (NER) service

The Named Entity Recognition (NER) service is a fat service
providing NER. It aims to wrap a fat internal Java server
in a thin external Node server, which provides additional:

* authentication
* JSON syntax


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
node index.js
```

Broadly, this runs:
```bash
./ner-install.sh # installs NER and makes ./ner-server.sh

# Forks into
./ner-server.sh  # runs Java server
./app.js         # runs Node server
```

