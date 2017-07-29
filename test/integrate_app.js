var chai = require('chai');
var chaiHttp = require('chai-http');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiHttp);
chai.use(chaiAsPromised);
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

var app = require('../src/app');

describe('integrate_app', function() {
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
});
