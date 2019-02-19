'use strict';

var UnloadApi = require('./unload_api');

describe('Unload API', function() {

  var transmitter;
  var unloadApi;

  beforeEach(function() {
    transmitter = {
      messageToEmarsys: sinon.spy()
    };
    unloadApi = UnloadApi.create(transmitter);
  });

  describe('public methods', function() {
    var testCases = [
      {
        method: 'init',
        input: {
          testKey: 'testValue'
        },
        eventName: 'unload:init',
        eventData: {
          testKey: 'testValue'
        }
      },
      {
        method: 'reset',
        input: '.testSelector',
        eventName: 'unload:reset',
        eventData: {
          selector: '.testSelector'
        }
      }
    ];

    testCases.forEach((test) => {
      it(`#${test.method} should send a proper message`, function() {
        unloadApi[test.method](test.input);
        expect(transmitter.messageToEmarsys).to.have.been.calledWith(test.eventName, test.eventData);
      });
    });
  });

});
