'use strict';

var MiscApi = require('./misc_api');

describe('Misc API', function() {

  var transmitter;
  var miscApi;

  beforeEach(function() {
    transmitter = {
      messageToEmarsys: this.sandbox.spy()
    };
    miscApi = MiscApi.create(transmitter);
  });

  describe('public methods', function() {
    var testCases = [
      {
        method: 'resize',
        input: 100,
        eventName: 'resize',
        eventData: {
          height: 100
        }
      },
      {
        method: 'refresh',
        input: null,
        eventName: 'refresh',
        eventData: {}
      },
      {
        method: 'enableButton',
        input: 'e-btn',
        eventName: 'enable_button',
        eventData: {
          selector: 'e-btn'
        }
      }
    ];

    testCases.forEach((test) => {
      it(`#${test.method} should send a proper message`, function() {
        miscApi[test.method](test.input);
        expect(transmitter.messageToEmarsys).to.have.been.calledWith(test.eventName, test.eventData);
      });
    });
  });

});
