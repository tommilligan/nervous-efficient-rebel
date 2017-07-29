var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

var services = require('../src/services');

var invalidHostname = 'not.a.valid.hostname';

describe('integrate_services', function(){
    describe('remote data functions', function(){
        it('extractEntities will fail if the NER service is unavailable', function(){
            this.timeout(5000);
            var text = 'John Smith went to Tesco and bought spam';
            var connection = {port: 80, host: invalidHostname};
            return expect(services.extractEntities(text, connection))
                .to.eventually.be.rejectedWith('Could not reach NER service');
        });
        it('extractEntities will pass if the NER service is available', function(){
            this.timeout(5000);
            var text = 'John Smith went to Tesco and bought spam';
            var expected = {
                DATE:[],
                LOCATION:[],
                MONEY: [],
                ORGANIZATION: ['Tesco'],
                PERCENT: [],
                PERSON: ['John Smith'],
                TIME: []
            };
            return expect(services.extractEntities(text)).to.eventually.deep.equal(expected);
        });
    });
});
