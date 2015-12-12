'use strict';

var MiscApi = require('./misc_api');

describe('Misc API', function() {

  var transmitter;
  let receiver;
  var miscApi;

  beforeEach(function() {
    transmitter = {
      messageToEmarsys: this.sandbox.spy()
    };

    receiver = {
      addMessageHandler: this.sandbox.spy()
    };

    miscApi = new MiscApi(transmitter, receiver);

    this.sandbox.stub(miscApi, 'getRandomId').returns(1);
  });

  it('should handle navigate:response event', function() {
    expect(receiver.addMessageHandler).to.have.been.calledWithMatch('navigate:response');
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
      },
      {
        method: 'navigate',
        input: {},
        eventName: 'navigate',
        eventData: { eventId: 1 }
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
