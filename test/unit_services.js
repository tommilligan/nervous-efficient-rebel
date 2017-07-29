var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var ner = require('ner');

var services = require('../src/services');

describe('unit_services', function(){
    describe('promisification of ner', function(){
        describe('stub success', function(){
            var entities = {
                DATE: [],
                LOCATION: ['Tesocs'],
                MONEY: [],
                ORGANIZATION: [],
                PERCENT: [],
                PERSON: ['John Smith'],
                TIME: []
            };
            beforeEach(function(){
                var stubReturn = {
                    entities: entities
                };
                sinon.stub(ner, 'get').yields(null, stubReturn);
            });
            it('extractEntities resolves simple entities', function(){
                return expect(services.extractEntities('John Smith went to Tescos'))
                    .to.eventually.deep.equal(entities);
            });
            afterEach(function() {
                ner.get.restore();
            });
        });
        describe('stub failure', function(){
            beforeEach(function(){
                sinon.stub(ner, 'get').yields(new Error('Generic error'), null);
            });
            it('extract entities rejects with the internal error', function(){
                return expect(services.extractEntities('John Smith went to Tescos'))
                    .to.eventually.be.rejectedWith('Generic error');
            });
            afterEach(function() {
                ner.get.restore();
            });
        });
    });
});
