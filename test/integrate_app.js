var  app = require('../src/app');
var chai = require("chai");
chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
var sinon = require("sinon");

it('fails, as expected', function(done) { // <= Pass in done callback
    chai.request('http://localhost:44552')
        .post('/')
            .send({ payload: 'John Smith went to Tesocs' })
            .end(function(err, res) {
        expect(res).to.have.status(123);
        done();                               // <= Call done to signal callback end
    });
});

