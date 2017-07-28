var app = require('../src/app');
var chai = require('chai');
var chaiHttp = require('chai-http');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiHttp);
chai.use(chaiAsPromised);
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');



describe('root endpoint', function() {
    it('processes simple sentence', function() {
        var inputBody = {payload: 'John Smith went to Tesocs'};
        var expected = {
            DATE: [],
            LOCATION: ['Tesocs'],
            MONEY: [],
            ORGANIZATION: [],
            PERCENT: [],
            PERSON: ['John Smith'],
            TIME: []
        };
        var promisedResponse = expect(chai.request(app)
            .post('/')
            .send(inputBody))
        return Promise.all([
            promisedResponse.to.eventually.have.status(200),
            promisedResponse.then(res => expect(res.body).to.deep.equal(expected))
        ]);
    });
    it('throws 400 if empty string payload', function() {
        return expect(chai.request(app)
                .post('/')
                .send({payload: ''}))
            .to.eventually.be.rejectedWith("Bad Request")
    });
    it('throws 400 if numeric payload', function() {
        return expect(chai.request(app)
                .post('/')
                .send({payload: 42}))
            .to.eventually.be.rejectedWith("Bad Request")
    });
    it('throws 400 if nested payload', function() {
        return expect(chai.request(app)
                .post('/')
                .send({payload: {random: 'spam'}}))
            .to.eventually.be.rejectedWith("Bad Request")
    });
    it('throws 400 if no payload', function() {
        return expect(chai.request(app)
                .post('/')
                .send({}))
            .to.eventually.be.rejectedWith("Bad Request")
    });
});
