# nervous-efficient-rebel (NER) service

[![npm](https://img.shields.io/npm/v/nervous-efficient-rebel.svg)](https://www.npmjs.com/package/nervous-efficient-rebel)
[![license](https://img.shields.io/github/license/tommilligan/nervous-efficient-rebel.svg)]()

[![Travis branch](https://img.shields.io/travis/tommilligan/nervous-efficient-rebel/develop.svg)](https://travis-ci.org/tommilligan/nervous-efficient-rebel)
[![codecov](https://codecov.io/gh/tommilligan/nervous-efficient-rebel/branch/develop/graph/badge.svg)](https://codecov.io/gh/tommilligan/nervous-efficient-rebel)
[![David](https://img.shields.io/david/tommilligan/nervous-efficient-rebel.svg)](https://david-dm.org/tommilligan/nervous-efficient-rebel)

A modern RESTful service wrapper for the [Stanford NER project](https://nlp.stanford.edu/software/CRF-NER.shtml).

## Necessity

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
