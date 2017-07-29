var chai = require('chai');
var chaiHttp = require('chai-http');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiHttp);
chai.use(chaiAsPromised);
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var app = require('../src/app');
var services = require('../src/services');

describe('unit_app', function() {
    describe('stub extractEntites available', function() {
        var stubReturn = {
            DATE: [],
            LOCATION: ['Tesocs'],
            MONEY: [],
            ORGANIZATION: [],
            PERCENT: [],
            PERSON: ['John Smith'],
            TIME: []
        };
        beforeEach(function () {
            sinon.stub(services, 'extractEntities').returns(
                new Promise((resolve) => {
                    resolve(stubReturn);
                })
            );
        });
        afterEach(function () {
            services.extractEntities.restore();
        });
        it('processes simple sentence', function() {
            var promisedResponse = expect(chai.request(app)
                .post('/')
                .send({payload: 'John Smith went to Tesocs'}));
            return Promise.all([
                // could do with a spy assertion here
                promisedResponse.to.eventually.have.status(200),
                promisedResponse.then(res => expect(res.body).to.deep.equal(stubReturn))
            ]);
        });
        it('throws 400 if empty string payload', function() {
            return expect(chai.request(app)
                .post('/')
                .send({payload: ''}))
                .to.eventually.be.rejectedWith('Bad Request');
        });
        it('throws 400 if numeric payload', function() {
            return expect(chai.request(app)
                .post('/')
                .send({payload: 42}))
                .to.eventually.be.rejectedWith('Bad Request');
        });
        it('throws 400 if nested payload', function() {
            return expect(chai.request(app)
                .post('/')
                .send({payload: {random: 'spam'}}))
                .to.eventually.be.rejectedWith('Bad Request');
        });
        it('throws 400 if no payload', function() {
            return expect(chai.request(app)
                .post('/')
                .send({}))
                .to.eventually.be.rejectedWith('Bad Request');
        });
    });
    describe('stub extractEntites unavailable', function() {
        beforeEach(function () {
            sinon.stub(services, 'extractEntities').returns(
                new Promise((resolve, reject) => {
                    reject(new Error('Any error'));
                })
            );
        });
        afterEach(function () {
            services.extractEntities.restore();
        });
        it('returns 503 for internal service errors', function() {
            return expect(chai.request(app)
                .post('/')
                .send({payload: 'John Smith went to Tesocs'}))
                .to.eventually.be.rejectedWith('Service Unavailable');
        });
    });
});
